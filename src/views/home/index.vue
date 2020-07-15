<template>
    <div class='view'>
        <div class='banner'>
            <div class="banner_title">
                近1个月净值趋势
            </div>
            <router-link to='trajectory'>
                <MsEchart :echartsData='showData' theme='white' class='echart'></MsEchart>
                <div class="to_getmoney">
                    近3月收益率{{yields}}%
                </div>
            </router-link>
            <p>*以上图表为
                <span>稳健增利投资账户</span>历史收益，历史收益不代表实际收益情况，您本次投保民生小目标的资金将存入
                <span>稳健增利投资账户</span>运作</p>
        </div>
        <Content></Content>
        <ShowMore></ShowMore>
        <div class='to_insure' @click='to_insure'>立即投保</div>
    </div>
</template>

<script>
import MsEchart from "@/components/echart.vue";
import Content from "./components/content.vue";
import ShowMore from "./components/showMore.vue";
import moment from "moment";
import { getUser, getNetWorth, checkJoined } from "@/api";
import { getDynamic } from "@/util/js/common";
import config from "@/config";

export default {
    name: "home",
    data() {
        return {
            echartsData: { x: [], y: [] },
            showData: { x: [], y: [] },
            userInfo: {},
            yields: "",
            joined: false
        };
    },
    created() {
        this.getNetWorth();
        this.getUser();
    },
    mounted() {},
    components: {
        MsEchart,
        Content,
        ShowMore
    },
    methods: {
        getNetWorth() {
            getNetWorth({ queryType: "month" }).then(res => {
                let data = res.data,
                    x = [],
                    y = [];
                this.yields = res.data[0].yieldQuarter;
                data.forEach((item, index) => {
                    x.unshift(item.netDate);
                    y.unshift(item.unitNet);
                });
                this.showData = {
                    x: x,
                    y: y
                };
            });
        },
        getUser() {
            return new Promise((resolve, reject) => {
                this.$showLoading();
                getUser()
                    .then(res => {
                        this.$hideLoading();
                        let { code, content } = res.data;
                        if (code == "0") {
                            this.userInfo = content;
                            this.userInfo.riskLevel = getDynamic(this.userInfo.userExtensions, "riskLevel", "value");
                            this.userInfo.frontFileId = getDynamic(this.userInfo.userExtensions, "frontFileId", "value");
                            this.userInfo.backFileId = getDynamic(this.userInfo.userExtensions, "backFileId", "value");
                            this.userInfo.crs = getDynamic(this.userInfo.userExtensions, "crs", "value") || 2;
                            this.userInfo.idnumber && this.checkJoined(this.userInfo.idnumber); //判断参加过保险没有  1琪不加
                            this.$sessionStorage.setItem("userInfo", this.userInfo);
                        } else {
                        }
                    })
                    .catch(e => {
                        this.$hideLoading();
                    });
            });
        },
        checkJoined(idnum) {
            checkJoined(idnum)
                .then(res => {
                    this.joined = res.data.policyNumber ? true : false;
                })
                .catch(e => {
                    this.$hideLoading();
                });
        },
        to_insure() {
            if (this.joined) {
                this.$message.alert(
                    "",
                    "您已经购买过本产品，<br/>请前去追加保费",
                    () => {
                        window.location.href = config.queryUrl;
                    },
                    "去追加保费"
                );
                return;
            }
            this.$hmt.trackEvent2("landingpage", "to_order");
            //没答题先答题
            if (!this.userInfo.riskLevel) {
                //没风险评测过
                this.$message.alert(
                    "请进行风险测评后购买",
                    "根据监管规定，购买理财产品前</br>需进行风险测评。",
                    () => {
                        this.$hmt.trackEvent2("landingpage", "to_evaluation");
                        this.$router.push("/question/1");
                    },
                    "去测评"
                );
            } else if (this.userInfo.crs != "1") {
                //crs  点过faxid页面的确定按钮
                this.$router.push("/appraisal");
            } else if (!getDynamic(this.userInfo.userExtensions, "frontFileId", "value")) {
                this.$message.alert(
                    "",
                    "购买本产品需要实名认证",
                    () => {
                        this.$router.push("/idnum");
                    },
                    "去实名认证"
                );
            } else if (!this.userInfo.idValidTime || +moment(this.userInfo.idValidTime) < +new Date()) {
                this.$message.alert(
                    "",
                    "您的身份证已过期",
                    () => {
                        this.$router.push("/idnum");
                    },
                    "前去更新"
                );
            } else {
                this.$router.push("/insuremoney");
            }
        }
    }
};
</script>
<style  scoped>
.view {
    padding-bottom: 1.546667rem;
}
.banner {
    background: url(~img/indexbanner.jpg) no-repeat, #3f57d1;
    background-size: 100%;
    padding-top: 4.6rem;
    overflow: hidden;
    text-align: center;
}
.banner_title {
    font-size: 0.346667rem;
    color: #fff;
    padding: 0.266667rem 0 0.133333rem;
}
.to_getmoney {
    display: block;
    width: 6.88rem;
    height: 1.066667rem;
    background: url(~img/moreicon.png) no-repeat 94% center, linear-gradient(180deg, rgba(232, 200, 143, 1) 5%, rgba(224, 183, 118, 1) 100%);
    background-size: 0.373333rem;
    border-radius: 0.533333rem;
    font-size: 0.48rem;
    line-height: 1.066667rem;
    margin: 0.426667rem auto 0;
    color: #fff;
}
.banner > p {
    font-size: 0.32rem;
    color: rgba(129, 145, 222, 1);
    line-height: 0.426667rem;
    margin: 0 auto;
    padding: 0.266667rem 0 0.413333rem;
    width: 94%;
    line-height: 1.4;
}
.banner > p > span {
    color: #e0b776;
}
.echart {
    width: 96%;
    height: 3.466667rem;
    margin: 0 auto;
}
.to_insure {
    position: fixed;
    bottom: 0;
    text-align: center;
    width: 100%;
    height: 1.546667rem;
    font-size: 0.533333rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 1.546667rem;
    letter-spacing: 0.053333rem;
    background: linear-gradient(180deg, rgba(232, 200, 143, 1) 5%, rgba(224, 183, 118, 1) 100%);
}
</style>
