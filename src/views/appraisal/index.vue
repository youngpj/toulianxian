<template>
    <div class="view">
        <div class="belong">
            根据风险承受能力评测，您属于
        </div>
        <div class="result">
            <p>{{option[this.type].title}}</p>
            <span>{{option[this.type].text}}</span>
        </div>
        <label class="item flex">
            <input type="checkbox" v-model="checked">
            <p>在投资风险测试过程中，本人提供的全部信息、资料是真实、准确和完整的，测试结果真实、准确地反映了本人的投资风险承受程度。</p>
        </label>
        <label class="item flex">
            <input type="checkbox" v-model='makeSure'>
            <p>{{option[this.type].checkedText}}</p>
        </label>
        <div class="btn" @click='to_insure' :class='{rey:!allRight}'>
            前去投保
        </div>
        <router-link to='/question/1' class="to_question">
            重测 >
        </router-link>
    </div>
</template>

<script>
import { answerQuestion } from "@/api";
export default {
    data() {
        return {
            checked: false,
            makeSure: false,
            type: "",
            option: {
                1: {
                    title: "保守型",
                    text: "风险承受能力较低。",
                    checkedText: "本人已进行民生人寿保险股份有限公司风险承受能力评估，并被明确告知本人投资风险承受程度不适宜购买投资连结型保险，但本人仍然申请购买，并愿意自行承担上述产品的所有投资风险。"
                },
                2: {
                    title: "稳健型",
                    text: "风险承受能力一般。",
                    checkedText: "本人已进行民生人寿保险股份有限公司风险承受能力评估，并被明确告知本人投资风险承受程度不适宜购买投资连结型保险，但本人仍然申请购买，并愿意自行承担上述产品的所有投资风险。"
                },
                3: {
                    title: "成长型",
                    text: "风险承受能力较高，适宜通过长期且持续的投资获得高于平均水平的回报。",
                    checkedText: "本人已进行民生人寿保险股份有限公司风险承受能力评估，本人确认申请购买此产品，并愿意自行承担产品的所有投资风险。"
                },
                4: {
                    title: "进取型",
                    text: "风险承受能力较高，适宜通过长期且持续的投资获得高于平均水平的回报。",
                    checkedText: "本人已进行民生人寿保险股份有限公司风险承受能力评估，本人确认申请购买此产品，并愿意自行承担产品的所有投资风险。"
                }
            }
        };
    },
    created: function(data) {
        //第一次做取url上的, 做过的取wx的
        let userInfo = this.$sessionStorage.getItem("userInfo");
        this.type = this.$route.query.type || userInfo.riskLevel;
    },
    methods: {
        to_insure(index) {
            if (this.allRight) {
                this.$showLoading();
                let userAns = this.$sessionStorage.getItem("answer") || [];
                if (userAns.length < 7 && this.type) {
                    // 如果没有答题 直接进入该页面,表示以前答过题目
                    this.$router.push("/faxid");
                    return;
                }
                let data = "";
                for (let key in userAns) {
                    data += userAns[key].no;
                }
                answerQuestion({ answer: data })
                    .then(res => {
                        if (res.data.code == "0") {
                            let userInfo = this.$sessionStorage.getItem("userInfo") || {};
                            userInfo.riskLevel = res.data.level;
                            console.log(userInfo);
                            this.$sessionStorage.setItem("userInfo", userInfo);
                            this.$router.push("/faxid");
                        } else {
                            this.$toast(res.data.msg);
                        }
                        this.$hideLoading();
                    })
                    .catch(err => {
                        this.$hideLoading();
                        if (err.response) {
                            this.$toast(err.response.data.msg);
                        }
                    });
            }
        },
        submit() {}
    },
    computed: {
        allRight() {
            return this.checked && this.makeSure;
        }
    },
    components: {},
    watch: {}
};
</script>

<style scoped>
.view {
    padding: 0.64rem 0.533333rem;
    background: #fff;
    position: fixed;
    height: 100%;
}
.belong {
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    margin-bottom: 0.373333rem;
}
.result > p {
    font-size: 0.933333rem;
    font-weight: 600;
    color: rgba(94, 116, 226, 1);
    line-height: 1.333333rem;
    margin-bottom: 0.053333rem;
}
.result > span {
    display: block;
    font-size: 0.426667rem;
    font-weight: 500;
    color: rgba(94, 116, 226, 1);
    line-height: 0.586667rem;
    margin-bottom: 1.28rem;
}
.item {
    font-size: 0.346667rem;
    color: rgba(102, 102, 102, 1);
    line-height: 0.533333rem;
    margin-bottom: 0.533333rem;
}
.item > p {
    flex: 1;
}
.btn {
    width: 100%;
    height: 1.226667rem;
    background: rgba(224, 183, 118, 1);
    border-radius: 0.106667rem;
    font-size: 0.48rem;
    color: rgba(255, 255, 255, 1);
    line-height: 1.226667rem;
    letter-spacing: 1px;
    overflow: hidden;
    margin: 0.8rem 0 0.533333rem;
}
.rey.btn {
    background: rgba(215, 215, 215, 1);
}
.to_question {
    font-size: 0.346667rem;
    color: rgba(94, 116, 226, 1);
    line-height: 0.48rem;
    display: block;
    text-align: center;
}
input {
    position: relative;
    top: 0.083333rem;
    width: 0.266667rem;
    height: 0.266667rem;
    vertical-align: middle;
    border: none;
    outline: none;
    margin-right: 0.346667rem;
}

input::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 120%;
    height: 120%;
    transform: translate(-10%, -5%);
    background-repeat: no-repeat;
    background: #ffffff;
    border: 1px solid rgba(224, 183, 118, 1);
    border-radius: 0.053333rem;
}
input::after {
    content: "";
    display: block;
    position: absolute;
    height: 0.4rem;
    width: 0.4rem;
    left: 0;
    top: 0;
    width: 140%;
    height: 140%;
    transform: translate(-10%, -5%);
    background: url(~img/rightyellow.jpg) no-repeat center, #fff;
    background-size: 100%;
    opacity: 0;
}

input:checked::after {
    opacity: 1;
}
</style>
