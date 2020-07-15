<template>
    <div class="view">
        <div class="title">
            您的税收居民身份是？
        </div>
        <label class="item flex">
            <input type="radio" v-model='faxid' value=1>
            <p>本人仅为中国税收居民</p>
        </label>
        <label class="item flex">
            <input type="radio" v-model='faxid' value=2>
            <p>其他</p>
        </label>
        <div class="text">
            根据国家有关部门最新颁布的《非居民金融账户涉税信息尽职调查管理办法》监管要求，您在购买投资连结保险前需填写税收身份声明文件。
        </div>
        <div class="btn" @click='confirmCRS'>
            提交
        </div>
    </div>
</template>

<script>
import { confirmCRS } from "@/api";
import moment from "moment";
import { getDynamic } from "@/util/js/common";
export default {
    data() {
        return {
            faxid: 0
        };
    },
    created: function(data) {},
    methods: {
        confirmCRS() {
            if (this.faxid == "1") {
                this.$showLoading();
                confirmCRS()
                    .then(res => {
                        this.to_insure();
                        this.$hideLoading();
                    })
                    .catch(error => {
                        console.log(error);
                        this.$hideLoading();
                    });
            } else if (this.faxid == "0") {
                this.$toast("请选择税收居民身份");
            } else {
                this.$message.alert("抱歉， 您暂不符合投保要求。", "", () => {
                    this.$router.push("/");
                });
            }
        },
        to_insure() {
            let userInfo = this.$sessionStorage.getItem("userInfo");
            console.log(+moment(userInfo.idValidTime));
            if (userInfo && (getDynamic(userInfo.userExtensions, "frontFileId", "value") && +moment(userInfo.idValidTime) > +new Date())) {
                this.$router.push("/insureMoney");
            } else if (!getDynamic(userInfo.userExtensions, "frontFileId", "value")) {
                this.$message.alert(
                    "",
                    "购买本产品需要实名认证",
                    () => {
                        this.$router.push("/idnum");
                    },
                    "去实名认证"
                );
            } else if (!userInfo.idValidTime||+moment(userInfo.idValidTime) < +new Date()) {
                this.$message.alert(
                    "",
                    "您的身份证已过期",
                    () => {
                        this.$router.push("/idnum");
                    },
                    "前去更新"
                );
            } else {
                this.$message.alert(
                    "",
                    "购买本产品需要实名认证",
                    () => {
                        this.$router.push("/idnum");
                    },
                    "去实名认证"
                );
            }
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
    width: 100%;
}
.title {
    font-size: 0.533333rem;
    font-weight: 900;
    color: rgba(94, 116, 226, 1);
    line-height: 0.746667rem;
    padding: 0.64rem 0 0.453333rem;
}
.item {
    padding: 0.426667rem 0.346667rem;
    background: rgba(250, 250, 250, 1);
    width: 100%;
    margin-bottom: 0.4rem;
}
.item > p {
    font-size: 0.426667rem;
    color: rgba(35, 35, 35, 1);
    line-height: 0.586667rem;
    font-weight: 900;
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
.to_question {
    font-size: 0.346667rem;
    color: rgba(94, 116, 226, 1);
    line-height: 0.48rem;
    display: block;
    text-align: center;
}
.item > input {
    position: relative;
    top: 0.083333rem;
    width: 0.48rem;
    height: 0.48rem;
    border: none;
    outline: none;
    margin-right: 0.32rem;
    display: block;
}
.text {
    padding-top: 0.133333rem;
    font-size: 0.32rem;
    color: rgba(102, 102, 102, 1);
    line-height: 0.586667rem;
}
input::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background: #ffffff;
    border: 1px solid rgba(224, 183, 118, 1);
    border-radius: 100%;
    box-sizing: border-box;
}
/* input:checked::before{
    background-color: rgba(224, 183, 118, 1);
    background-clip: content-box;
    padding: .09rem;
} */
input::after {
    content: "";
    display: block;
    position: absolute;
    width: 60%;
    height: 60%;
    left: 50%;
    top: 50%;
    border-radius: 100%;
    transform: translate(-50%, -50%);
    background: rgba(224, 183, 118, 1);
    opacity: 0;
    border-radius: 100%;
}

input:checked::after {
    opacity: 1;
}
</style>
