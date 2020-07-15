<template>
    <div class="view page">
            <Header type='info'></Header>
            <div class="content">
                <div class="content_header">
                    投保人信息
                </div>
                <div class="user_info">
                    <Form ref='form'>
                        <InputGroup label='姓名' ref='name' placeholder="请输入" type='name' :readonly='!!userInfo.name' v-model='policy.name'></InputGroup>
                        <InputGroup label='身份证号码' ref='idNum' placeholder="请输入" type='idcard' :readonly='!!userInfo.idnumber' v-model='policy.idNum' maxlength=18></InputGroup>
                        <DatePickerGroup ref='idValidity' v-model="policy.idValidity" :option="dateOpt" label="身份证有效期" :readonly='!!userInfo.idValidTime' placeholder="去添加"></DatePickerGroup>
                        <SelectGroup label='职业类别' ref='jobCode' placeholder="请选择" :options='jobOptions' v-model='policy.jobCode'></SelectGroup>
                        <CityGroup v-model="policy.city" ref='city' label="所在城市" placeholder="请选择所在城市"></CityGroup>
                        <TextareaGroup v-model="policy.address" ref='address' type='address' maxlength="50" label="详细地址" placeholder="请输入详细地址"></TextareaGroup>
                        <InputGroup label='手机号码' ref='mobile' keyboard='Number' placeholder="请输入" type='mobile' maxlength='11' v-model='policy.mobile'></InputGroup>
                        <smsGroup v-model="policy.smsCode" ref='smsCode' keyboard='Number' placeholder="请输入验证码" :phone='policy.mobile' label="验证码:" />
                        <InputGroup label='电子邮箱' ref='email' placeholder="接收电子保单" type='email' @blur='deleteBlank' v-model='policy.email'></InputGroup>
                    </Form>
                </div>
            </div>
            <div class="content">
                <div class="content_header">
                    被保人信息
                </div>
                <div class="user_info">
                    <InputGroup label='为谁投保' value='本人' placeholder="请选择" readonly></InputGroup>
                </div>
            </div>
            <div class="content">
                <div class="content_header">
                    受益人信息
                </div>
                <div class="user_info">
                    <InputGroup label='受益人' type='name' value='法定受益人' readonly></InputGroup>
                </div>
            </div>

            <div class="agree">
                <agreeGroup v-model='agree' ref='agree'>
                    我已阅读
                    <a :href="shuomingshu">《产品说明书》</a>
                    <a :href='`${httpsMsurl}/provision/index.html#/tiaokuan_toulianxian`'>《保险条款》</a>
                    <span @click.prevent='toPrompt'> 《人身投保提示书》</span>
                    <router-link to='/xuzhi'>《投保须知》 </router-link>
                    <a :href='touzizhanghu'> 《投资账户介绍》</a>
                    <span @click.prevent="toshouquan"> 《授权及隐私声明》</span>，理解其内容并承担相关风险
                </agreeGroup>
            </div>
        <div class="btn_box">
            <p @click='checkInfo'>
                下一步
            </p>
        </div>
    </div>
</template>

<script>
import Header from "@/components/insure-header";
import InputGroup from "@/components/input-group";
import TextareaGroup from "@/components/textarea-group";
import Form from "@/components/form";
import smsGroup from "@/components/sms-group/index";
import agreeGroup from "@/components/agree-group";
import SelectGroup from "@/components/select-group/index";
import DatePickerGroup from "@/components/date-picker-group/index";
import CityGroup from "@/components/city-group/index";
import { jobOptions } from "@/assets/options";
import { isCardNo, isAddressNo, isEmailNo, isNameNo, isPhoneNo, isCodeNo, getAge } from "@/util/js/common";
import shuomingshu from "@/assets/pdf/shuomingshu.pdf";
import tiaokuan from "@/assets/pdf/tiaokuan.pdf";
import touzizhanghu from "@/assets/pdf/touzizhanghu.pdf";
import cityUrl from "@/assets/citypdf/index";
import { viladatePhone } from "@/api";
import config from "@/config";
export default {
    data() {
        return {
            httpsMsurl: config.httpsMsurl,
            policy: {
                idNum: "",
                name: "",
                jobCode: "",
                idValidity: "",
                city: "", //住址
                address: "", //详细地址
                mobile: "",
                smsCode: "",
                email: ""
            },
            jobOptions,
            dateOpt: {
                startDate: new Date(),
                endYear: 20
            },
            agree: false,
            shuomingshu,
            tiaokuan,
            touzizhanghu,
            show: true,
            userInfo: {}
        };
    },
    created: function(data) {
        let sessionData = this.$sessionStorage.getItem("insureInfo");
        if (sessionData) {
            this.policy = sessionData.policy;
            this.agree = sessionData.agree;
        }
        this.userInfo = this.$sessionStorage.getItem("userInfo");
        if (this.userInfo) {
            this.policy.name = this.userInfo.name;
            this.policy.idNum = this.userInfo.idnumber;
            // 身份证有效期 对于 有效期为长期 的一些修改
            this.policy.idValidity = this.userInfo.idValidTime === '9999-12-31' ? '长期' : this.userInfo.idValidTime;
        }
    },
    mounted() {},
    methods: {
        toPrompt() {
            // 《人身投保提示书》按所选城市显示不同内容，
            if (this.policy.city == "") {
                this.$message.alert("", "请先选择所在城市", () => {
                    this.$refs.city.$el.scrollIntoView({
                        block: "center"
                    });
                });
            } else {
                let code = this.policy.city.code.split("-")[0];
                    if (code == "210000" || code == "330000"||code=='350000') {
                    let city = this.policy.city.code.split("-")[1];
                    if (city == "210200" || city == "330200"||city=='350200') {
                    code = city;
                    }
                }
                window.location.href = cityUrl[code];
            }
        },
        toshouquan() {
            // 身份证有效期 对于 有效期为长期 的一些修改
            let obj = Object.assign({}, { policy: this.policy }, { agree: this.agree }, {
                idValidity: this.policy.idValidity === '长期' ? '9999-12-31' : this.policy.idValidity
            });
            this.$sessionStorage.setItem("insureInfo", obj);
            this.$router.push("/shouquan");
        },
        deleteBlank(e) {
            this.$set(this.policy, "email", e.target.value.replace(/\s+/g, ""));
        },
        validate() {
            let validateOptions = [
                {
                    fn: () => {
                        return isNameNo(this.policy.name);
                    },
                    errMsg: "姓名格式错误",
                    scrollRef: "name"
                },
                {
                    fn: () => {
                        return isCardNo(this.policy.idNum);
                    },
                    errMsg: "身份证格式错误",
                    scrollRef: "idNum"
                },

                {
                    fn: () => {
                        return this.policy.idValidity != "";
                    },
                    errMsg: "请选择身份证有效期",
                    scrollRef: "idValidity"
                },
                {
                    fn: () => {
                        return this.policy.jobCode != "";
                    },
                    errMsg: "请选择职业类别",
                    scrollRef: "jobCode"
                },
                {
                    fn: () => {
                        return this.policy.city != "";
                    },
                    errMsg: "请选择城市",
                    scrollRef: "city"
                },
                {
                    fn: () => {
                        let { age } = getAge(this.policy.idNum);
                        let oneAge = getAge(this.policy.idNum, true).age;
                        console.log(oneAge, age);
                        //内蒙和甘肃列外
                        if (this.policy.city.code.split("-")[0] == "610000" || this.policy.city.code.split("-")[0] == "150000") {
                            return age >= 18 && oneAge <= 60;
                        }
                        return age >= 18 && oneAge <= 65;
                    },
                    errMsg: "被保人年龄不适用",
                    scrollRef: "idNum"
                },
                {
                    fn: () => {
                        return isAddressNo(this.policy.address);
                    },
                    errMsg: "详细地址格式错误",
                    scrollRef: "address"
                },
                {
                    fn: () => {
                        return isPhoneNo(this.policy.mobile);
                    },
                    errMsg: "手机号格式错误",
                    scrollRef: "mobile"
                },
                {
                    fn: () => {
                        return isCodeNo(this.policy.smsCode);
                    },
                    errMsg: "验证码格式错误",
                    scrollRef: "smsCode"
                },
                {
                    fn: () => {
                        return isEmailNo(this.policy.email);
                    },
                    errMsg: "邮箱地址格式错误",
                    scrollRef: "email"
                },
                {
                    fn: () => {
                        return this.agree;
                    },
                    errMsg: "请阅读条款",
                    scrollRef: "agree"
                }
            ];
            //对options 循环,提示错误信息,滚动到相应的错误信息处
            return new Promise((resolve, reject) => {
                for (let item of validateOptions) {
                    if (!item.fn()) {
                        let ref = this.$refs[item.scrollRef].$el || this.$refs[item.scrollRef];
                        ref.scrollIntoView({
                            block: "center"
                        });
                        this.$toast(item.errMsg);
                        reject();
                        return;
                    }
                }
                resolve();
            });
        },
        checkSmsCode() {
            return new Promise((resolve, reject) => {
                viladatePhone(this.policy.mobile, this.policy.smsCode).then(res => {
                    if (res.data.returnCode === "SUCCESS") {
                        let obj = Object.assign({}, { policy: this.policy }, { agree: this.agree });
                        this.$sessionStorage.setItem("insureInfo", obj);
                        this.$router.push("/confirm");
                    } else {
                        let errMsg = res.data.errorMsg;
                        if (errMsg == "MOBILE_PHONE_NOT_EXIST") {
                            this.$toast("验证码有误");
                        } else if (errMsg == "WRONG_CAPTCHA") {
                            this.$toast("验证码有误");
                        } else {
                            this.$toast(errMsg);
                        }
                    }
                });
            });
        },
        async checkInfo() {
            try {
                await this.validate();
                await this.checkSmsCode();
            } catch (error) {
                console.log(error);
            }
        }
    },
    components: {
        Header,
        Form,
        InputGroup,
        smsGroup,
        agreeGroup,
        SelectGroup,
        DatePickerGroup,
        CityGroup,
        TextareaGroup
    },
    watch: {
        // policy: {
        //     handler: function() {
        //         this.checkInfo();
        //     },
        //     immediate: true,
        //     deep: true
        // },
        // agree() {
        //     this.checkInfo();
        // }
    }
};
</script>

<style scoped>
.view {
    background: rgba(247, 248, 250, 1);
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
    background: #fff;
    padding: 0.266667rem 0.533333rem;
    width: 100%;
   margin-top:.266667rem;
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
    background: #fff;
}
</style>
