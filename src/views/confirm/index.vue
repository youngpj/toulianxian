<template>
    <div class="view">
        <Header type='sure'></Header>
        <div class="title">
            请确认以下信息正确，以免影响您的保障权益
        </div>
        <div class="content">

            <div class="item">
                <p class='item_title'>投保金额：{{insureMoney.money}}元</p>
                <p>银行名称：{{bankOptions[insureMoney.bankCode].label}}</p>
                <p>银行卡号：{{insureMoney.bankNum}}</p>
            </div>
            <div class="item">
                <p class='item_title'>投保人：{{insureInfo.name}}</p>
                <p>身份证：{{insureInfo.idNum}}</p>
                <p>身份证有效期：{{insureInfo.idValidity === '9999-12-31' ? '长期' : insureInfo.idValidity}}</p>
                <p>职业类别：{{jobOptions[insureInfo.jobCode].label}}</p>
                <p>手机号码：{{insureInfo.mobile}}</p>
                <p>所在城市：{{insureInfo.CITYNAME}}</p>
                <p class='flex'>
                    <span>详细地址：</span>
                    <span>{{insureInfo.address}}</span>
                </p>

            </div>
            <p class='item_title'>被保人：{{insureInfo.name}}</p>
            <p class='item_title'>受益人：法定受益人</p>
            <router-link to='/insureMoney' class='to_changeinfo'>修改信息</router-link>
        </div>
        <div class="invist_box">
            <SelectGroup ref='invist' label='投资时点' placeholder="请选择" :options='invistOptions' v-model='invist'></SelectGroup>
            <p class="hint" v-show='invist=="02"'>*犹豫期内没有收益</p>
        </div>

        <div class="btn_box">
            <p @click='toInsure'>
                确认投保
            </p>
        </div>
    </div>
</template>

<script>
import Header from "@/components/insure-header";
import SelectGroup from "@/components/select-group/index";
import { jobOptions, bankOptions } from "@/assets/options";
import { uuid } from "@/util/js/utils.js";
import { proposal } from "@/api.js";
import config from "@/config";
export default {
    data() {
        return {
            invistOptions: {
                "01": { label: "立即投资", value: "01" },
                "02": { label: "犹豫期后投资", value: "02" }
            },
            uuid: "",
            invist: "", //投资时点
            jobOptions,
            bankOptions,
            insureInfo: {}, //填金额的页面
            insureMoney: {}, //填写数据的页面
            userInfo: {} //个人中心的数据
        };
    },
    created: function() {
        this.uuid = uuid();
        this.insureInfo = this.$sessionStorage.getItem("insureInfo").policy;
        this.insureInfo.CITYNAME = this.insureInfo.city.name.replace(/-/g, "");
        this.insureMoney = this.$sessionStorage.getItem("insureMoney").policy;
        this.userInfo = this.$sessionStorage.getItem("userInfo");
    },

    methods: {
        toInsure() {
            if (!this.invist) {
                this.$toast("请选择投资时点");
                let ref = this.$refs.invist.$el || this.$refs.invist;
                ref.scrollIntoView({
                    block: "center"
                });
                return;
            }
            let data = {
                domainName: "insurance.pa.model.Quotation",
                productCode: config.productCode,
                policyHolder: {
                    domainName: "insurance.pa.model.PersonCustomer",
                    idType: "ID",
                    idNumber: this.insureInfo.idNum,
                    mail: this.insureInfo.email,
                    mobile: this.insureInfo.mobile,
                    name: this.insureInfo.name,
                    jobType: jobOptions[this.insureInfo.jobCode].label,
                    jobTypeCode: this.insureInfo.jobCode,
                    address: `${this.insureInfo.city.name}-${this.insureInfo.address}`,
                    addressCode: this.insureInfo.city.code,
                    idEndDate: this.insureInfo.idValidity,
                    dynamicFields: {
                        ADDRESS: `${this.insureInfo.city.name}-${this.insureInfo.address}`,
                        FRONTFILEID: this.userInfo.frontFileId,
                        BACKFILEID: this.userInfo.backFileId,
                        RISK_EVENTUATE: this.userInfo.riskLevel
                    }
                },
                insureds: [
                    {
                        domainName: "insurance.pa.model.PersonCustomer",
                        idType: "ID",
                        idNumber: this.insureInfo.idNum,
                        mail: this.insureInfo.email,
                        mobile: this.insureInfo.mobile,
                        name: this.insureInfo.name,
                        jobType: jobOptions[this.insureInfo.jobCode].label,
                        jobTypeCode: this.insureInfo.jobCode,
                        address: `${this.insureInfo.city.name}-${this.insureInfo.address}`,
                        addressCode: this.insureInfo.city.code,
                        relationWithPH: "SELF",
                        idEndDate: this.insureInfo.idValidity,
                        dynamicFields: {
                            ADDRESS: `${this.insureInfo.city.name}-${this.insureInfo.address}`
                        }
                    }
                ],
                payInfo: {
                    domainName: "insurance.pa.model.PayInfo",
                    payAmount: this.insureMoney.money,
                    bankCode: this.insureMoney.bankCode,
                    bankName: bankOptions[this.insureMoney.bankCode].label,
                    bankAccount: this.insureMoney.bankNum
                },
                dynamicFields: {
                    uuid: this.uuid,
                    RENEWAL: "0",
                    CRSFLAG: 1,
                    INVEST_LINKED_PAY_AMOUNT: this.insureMoney.money,
                    DIRECT_INVESTMENT: this.invist
                }
            };
            return new Promise((resolve, reject) => {
                this.$showLoading();
                proposal(data)
                    .then(res => {
                        let { proposalNumber, proposalNumberToken } = res.data;
                        // this.$router.push("/result/success");
                        this.$router.push({
                            path: "result/success",
                            query: {
                                proposalNumber: proposalNumber,
                                proposalNumberToken: proposalNumberToken
                            }
                        });
                        this.$hideLoading();
                    })
                    .catch(error => {
                        let toastMsg = {
                            66668: "由于您的银行卡信息有误，您的保单投保失败",
                            66669: "由于您的银行卡余额不足，您的保单投保失败",
                            66670: "由于不知名的原因，您的保单投保失败"
                        };
                        if (error.response) {
                            let { ErrorMsg, ErrorCode } = error.response.data;
                            if (ErrorCode == "66666") {
                                this.$message.alert("", "正在收费处理中", () => {
                                    window.location.href = config.queryUrl + location.search;
                                });
                                return;
                            } else if (ErrorCode == "66667") {
                                this.$message.alert("", "抱歉，您暂不符合投保要求。", () => {
                                    this.$router.push("/");
                                });
                                return;
                            } else if (!!toastMsg[ErrorCode]) {
                                this.$router.push(`/result/fail?errorid=${ErrorCode}`);
                            } else {
                                this.$message.toast(ErrorMsg || "投保失败");
                            }
                        } else if (error.request) {
                            this.$message.alert("", error.request, () => {
                                this.$router.push("/result/fail");
                            });
                        } else {
                             this.$message.alert("未知错误", error, () => {
                                this.$router.push("/result/fail");
                            });
                        }
                        this.$hideLoading();
                    });
            });
        }
    },
    components: {
        Header,
        SelectGroup
    },
    watch: {}
};
</script>

<style scoped>
.view {
    background: rgba(255, 255, 255, 1);
    padding-bottom: 4rem;
}
.title {
    font-size: 0.426667rem;
    color: rgba(51, 51, 51, 1);
    line-height: 0.586667rem;
    padding: 0.56rem 0.4rem 0.346667rem;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.content {
    padding: 0.466667rem 0.4rem 0;
}
.item {
    margin-bottom: 0.453333rem;
}
.item > p {
    font-size: 0.373333rem;
    color: rgba(22, 22, 22, 1);
    line-height: 0.613333rem;
}
.item > p > span:first-of-type {
    flex: none;
}
.item > .item_title,
.item_title {
    font-size: 0.426667rem;
    color: rgba(51, 51, 51, 1);
    line-height: 0.686667rem;
    font-weight: 900;
}
.to_changeinfo {
    width: 2.026667rem;
    height: 0.693333rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.053333rem;
    border: 1px solid rgba(58, 123, 255, 1);
    font-size: 0.373333rem;
    font-weight: 400;
    color: rgba(58, 123, 255, 1);
    line-height: 0.693333rem;
    display: block;
    text-align: center;
    margin: 0.453333rem 0 0.426667rem;
    overflow: hidden;
}
.invist_box {
    border-top: 1px solid rgba(238, 238, 238, 1);
    width: 9.2rem;
    margin: 0 auto;
}
.hint {
    font-size: 0.32rem;
    color: rgba(188, 188, 188, 1);
    line-height: 0.68rem;
}
.btn_box {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    padding: 0.266667rem 0.533333rem;
    width: 100%;
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
</style>
