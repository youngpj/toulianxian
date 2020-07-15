<template>
    <div class="view">
        <div class='scroll_view'>
            <Header type='money'></Header>
            <div class="content">
                <div class="content_header">
                    投保金额
                </div>
                <InputMoney ref='money' v-model='policy.money'></InputMoney>
            </div>
            <div class="content">
                <div class="content_header">
                    银行卡信息
                </div>
                <div class="user_info">
                    <Form ref='form'>
                        <InputGroup ref='name' label='持卡人姓名' placeholder="请输入" type='name' :readonly='!!userInfo.name' v-model='policy.name'></InputGroup>
                        <SelectGroup ref='bankCode' label='银行名称' placeholder="请选择" :options='bankOptions' v-model='policy.bankCode'></SelectGroup>
                        <InputGroup ref='bankNum' label='银行卡号' maxlength=40 type='bank' keyboard='Number' placeholder="仅支持储蓄卡" @change.native.once='preload' v-model='policy.bankNum'></InputGroup>
                        <div class="user_phone" v-if='!authentication'>
                            <InputGroup ref='mobile' label='银行预留手机' keyboard='Number' placeholder="请输入银行预留手机号" type='mobile' maxlength='11' v-model='policy.mobile'></InputGroup>
                            <smsNoGroup ref='smsCode' v-model="policy.smsCode" @sendCode='sendCode' keyboard='Number' placeholder="请输入验证码" :phone='policy.mobile' label="验证码:" />
                        </div>
                    </Form>
                    <div class="bank_remind">
                        *保费将自动从该银行卡扣除，请确保您的银行卡信息正确并且余额充足
                    </div>

                </div>
            </div>

            <div class="agree">
                <agreeGroup v-model='agree' ref='agree'>
                    我的
                    <router-link :to="ristOptions[userInfo.riskLevel] ? '/appraisal' : '/question/1'">风险测评结果为{{userInfo&&ristOptions[userInfo.riskLevel]}}</router-link>，我已阅读并同意
                    <a :href='koukuantiaokuan'>《委托扣款支付协议》</a>
                </agreeGroup>
            </div>
        </div>
        <div class="btn_box">
            <p @click='nextStep'>
                下一步
            </p>
        </div>
    </div>
</template>

<script>
import Header from "@/components/insure-header";
import InputGroup from "@/components/input-group";
import Form from "@/components/form";
import smsGroup from "@/components/sms-group/index";
import smsNoGroup from "./components/sms-notoast-group";
import agreeGroup from "@/components/agree-group";
import SelectGroup from "@/components/select-group/index";
import InputMoney from "./components/inputMoney";
import { bankOptions, jobOptions, ristOptions } from "@/assets/options";
import { idnumSearch, idnumApply, idnumConfirm, getUser, banklimit } from "@/api";
import { isNameNo, isPhoneNo, isCodeNo, isBankNo, getDynamic } from "@/util/js/common";
import koukuantiaokuan from "@/assets/pdf/weituokoukuan.pdf";
export default {
    data() {
        return {
            policy: {
                bankNum: "", //银行卡号
                name: "",
                bankCode: "", //银行code
                money: '',
                mobile: "",
                smsCode: "",
                idNum: "" //身份证
            },
            bankOptions,
            ristOptions,
            koukuantiaokuan,
            agree: false,
            authentication: true, //鉴权
            rdSeq: "", //鉴权凭证
            userInfo: ""
        };
    },
    created: function(data) {
        let sessionData = this.$sessionStorage.getItem("insureMoney");
        if (sessionData) {
            this.policy = sessionData.policy;
            this.agree = sessionData.agree;
            this.authentication = sessionData.authentication;
        }
        this.getUser();
        // const originalHeight = document.body.clientHeight || document.documentElement.clientHeight;
        // window.onresize = ()=>{
        //     var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //     if (resizeHeight < originalHeight) {
        //         alert(1)
        //         this.styleBtn=true;
        //     } else {
        //          this.styleBtn=false
        //     }
        // };
    },
    beforeDestroy() {
        this.$sessionStorage.setItem("insureMoney", this._data);
    },
    methods: {
        getUser() {
            return new Promise((resolve, reject) => {
                getUser()
                    .then(res => {
                        let { code, content } = res.data;
                        if (code == "0") {
                            this.userInfo = content;
                            this.userInfo.riskLevel = getDynamic(this.userInfo.userExtensions, "riskLevel", "value");
                            this.userInfo.frontFileId = getDynamic(this.userInfo.userExtensions, "frontFileId", "value");
                            this.userInfo.backFileId = getDynamic(this.userInfo.userExtensions, "backFileId", "value");
                            this.$sessionStorage.setItem("userInfo", this.userInfo);
                            this.policy.name = this.userInfo.name;
                            this.policy.idNum = this.userInfo.idnumber;
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        //防止'我的接口报错' 取本地储存的riskLevel
                        if (e.response && e.response.status != "200") {
                            this.userInfo = this.$sessionStorage.getItem("userInfo");
                        }
                    });
            });
        },
        validate() {
            return new Promise((resolve, reject) => {
                if (this.policy.money < 1000) {
                    this.prompt("1000 元起投", "money");
                    reject();
                    this.errMsg = "";
                } else if (this.policy.money % 1000 !== 0) {
                    this.prompt("请输入 1000 的整数倍", "money");
                    reject();
                } else if (this.policy.money > 199000) {
                    this.prompt("最多可投19.9万元", "money");
                    reject();
                } else if (!isNameNo(this.policy.name)) {
                    this.prompt("姓名格式错误", "name");
                    reject();
                } else if (this.policy.bankCode == "") {
                    this.prompt("请选择银行名称", "bankCode");
                    reject();
                } else if (!isBankNo(this.policy.bankNum)) {
                    this.prompt("请输入正确的银行卡号", "bankNum");
                    reject();
                } else if (!this.agree) {
                    this.prompt("请阅读条款", "agree");
                    reject();
                } else if (!this.authentication) {
                    if (!isPhoneNo(this.policy.mobile)) {
                        this.prompt("手机号格式错误", "mobile");
                        reject();
                    }
                }
                resolve();
            });
        },
        //提示错误并且滚动
        prompt(msg, type) {
            let ref = this.$refs[type].$el || this.$refs[type];
            ref.scrollIntoView({
                block: "center"
            });
            this.$toast(msg);
        },
        async nextStep(type) {
            try {
                await this.validate(); //验证信息
                if (this.authentication) {
                    await this.banklimit();
                    await this.idnumSearch();
                } else {
                    await this.idnumConfirm();
                }
            } catch (error) {
                console.log(error);
                this.$hideLoading();
            }
        },
        //渠道限额
        banklimit() {
            this.$showLoading();
            return new Promise((resolve, reject) => {
                this.$showLoading();
                banklimit()
                    .then(res => {
                        let bank = res.data.filter(item => {
                            return item.bankCode == this.bankOptions[this.policy.bankCode].authBankCode;
                        })[0];
                        if (!!bank) {
                            if (bank.limit * 10000 < this.policy.money) {
                                this.$message.alert("", `您当前银行卡的交易限额为 ${bank.limit} 万元，不足以支付您的投保金额，请变更投保金额或更换银行卡`, "确定");
                                reject();
                            } else {
                                resolve();
                            }
                        } else {
                            this.$toast("获取不到银行卡限额");
                            resolve();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.$hideLoading();
                        this.$message.toast("接口异常");
                        reject();
                    });
            });
        },
        idnumSearch() {
            let data = {
                domainName: "insurance.pa.model.bankTrusteeship.BankTrusteeshipSearchDto",
                corpEntity: "86",
                bankAccount: this.policy.bankNum,
                bankCode: this.bankOptions[this.policy.bankCode].authBankCode
            };

            return new Promise((resolve, reject) => {
                idnumSearch(data).then(res => {
                    let { code, message } = res.data;
                    this.$hideLoading();
                    if (code == "0") {
                        this.authentication = true;
                        this.$router.push("/insureInfo");
                        resolve();
                    } else if (code == "1") {
                        this.$message.alert(
                            "",
                            `请验证您银行预留手机号，</br>以便完成鉴权`,
                            res => {
                                this.authentication = false;
                                reject();
                            },
                            "确定"
                        );
                    } else {
                        this.$message.alert("银行卡鉴权失败", message);
                    }
                });
            });
        },
        //签约确认
        idnumConfirm() {
            let data = {
                domainName: "insurance.pa.model.bankTrusteeship.BankTrusteeshipConfirmDto",
                rdSeq: this.rdSeq,
                msgCode: this.policy.smsCode
            };
            this.$showLoading();
            return new Promise((resolve, reject) => {
                if (!isCodeNo(this.policy.smsCode)) {
                    this.prompt("验证码格式错误", "mobile");
                    reject();
                    return;
                } else if (!this.rdSeq) {
                    this.prompt("请先获取验证码", "mobile");
                    reject();
                    return;
                }
                idnumConfirm(data)
                    .then(res => {
                        this.$hideLoading();
                        let { code, message } = res.data;
                        if (code == 1) {
                            this.$router.push("/insureInfo");
                            resolve();
                        } else {
                            this.$message.toast(message);
                            reject();
                        }
                    })
                    .catch(error => {
                        this.$hideLoading();
                        this.$message.toast("银行卡鉴权查询失败，请稍后再试");
                        reject();
                    });
            });
        },
        async sendCode() {
            try {
                await this.validate(); //验证信息
                await this.idnumApply();
            } catch (error) {
                console.log(error);
                this.$hideLoading();
            }
        },
        //获取短信验证码和鉴权凭证
        idnumApply() {
            let data = {
                domainName: "insurance.pa.model.bankTrusteeship.BankTrusteeshipApplyDto",
                bankCode: this.bankOptions[this.policy.bankCode].authBankCode,
                accountNumber: this.policy.bankNum.replace(/\s+/g, ""),
                accountName: this.policy.name,
                corpEntity: 86, //地址先写死
                mobile: this.policy.mobile,
                idNumber: this.policy.idNum
            };
            return new Promise((resolve, reject) => {
                this.$showLoading();
                idnumApply(data).then(res => {
                    let { code, message } = res.data;
                    if (code == 1) {
                        this.rdSeq = res.data.RdSeq;
                        this.$refs.smsCode.countDown();
                    } else {
                        this.$message.toast(message || "鉴权申请失败");
                    }
                    this.$hideLoading();
                });
            });
        },
        resetInfo() {
            this.$set(this.policy, "mobile", "");
            this.$set(this.policy, "smsCode", "");
            this.authentication = true;
            this.rdSeq = "";
        },
        preload() {
            let load = resolve => {
                return import("../insureInfo");
            };
            load();
        }
    },
    components: {
        Header,
        Form,
        InputGroup,
        smsGroup,
        agreeGroup,
        SelectGroup,
        InputMoney,
        smsNoGroup
    },
    watch: {
        "policy.bankCode"() {
            this.resetInfo();
        },
        "policy.bankNum"() {
            this.resetInfo();
        }
    }
};
</script>

<style scoped>
.view {
    background: rgba(247, 248, 250, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.scroll_view{
    flex:1;
    overflow: scroll;
}
.content {
    background: #fff;
    margin-bottom: 0.266667rem;
}
.content_header {
    font-size: 0.426667rem;
    font-weight: 900;
    color: rgba(51, 51, 51, 1);
    line-height: 1.333333rem;
    padding: 0 0.4rem;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.user_info {
    padding: 0 0.533333rem;
    background: #fff;
}
.btn_box {
    flex:none;
    background: #fff;
    padding: 0.266667rem 0.533333rem;
    width: 100%;
    height:2rem;
}
.btn_box > p {
    height: 1.226667rem;
    background: rgba(224, 183, 118, 1);
    border-radius: 0.106667rem;
    font-size: 0.48rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 0.666667rem;
    padding: 0.293333rem;
    text-align: center;
}
.bank_remind {
    font-size: 0.346667rem;
    color: rgba(224, 183, 118, 1);
    line-height: 0.48rem;
    padding: 0.16rem 0;
    margin-bottom: 0.266667rem;
}
.agree {
    padding: 0.426667rem 0.506667rem;
    margin-bottom:.533333rem;
    background: #fff;
}
</style>
