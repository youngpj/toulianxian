<template>
    <div class="view">
        <div class="content" v-if='type=="success"'>
            <img src="~img/success.png" alt="">
            <div class="title">投保成功</div>
            <p>您可以微信公众号“
                <span>民生健康95596</span> ”中的“保单查询”里面查询您的保单详情</p>
            <div class="to_my" @click='toMy'>查看保单</div>
            <div class="back_ms"  @click='back'>返回公众号</div>
        </div>
         <div class="content" v-else>
            <img src="~img/fail.png" alt="">
            <div class="title">投保失败</div>
            <p>{{errOptions[errorid]}}</p>
            <div class="to_my"  @click='toHome'>重新投保</div>
            <div class="back_ms"  @click='back'>返回公众号</div>
        </div>
    </div>
</template>

<script>
import { proposalNumberToken } from "@/api.js";
import config from '@/config'
export default {
    data() {
        return {
            type: "",
            errOptions:{
              66668: "由于您的银行卡信息有误，您的保单投保失败",
              66669: "由于您的银行卡余额不足，您的保单投保失败",
              66670: "由于不知名的原因，您的保单投保失败"
            },
            errorid:'66670'
        };
    },
    created: function(data) {
        this.type = this.$route.name;
          this.errorid = this.$route.query.errorid;
        // proposalNumberToken(this.$route.query.proposalNumberToken).then(res => {
                    
        // });
    },
    methods: {
        toHome(){
            this.$router.push('/insureMoney')
        },
        toMy(){
            // window.location.href=config.myUrl
             this.$hmt.trackEvent2('done', 'to_policy')
            window.location.href=config.queryUrl+location.search+`#/HxbDetail?proposalNumber=${this.$route.query.proposalNumber}&proType=2&proposalNumberToken=${this.$route.query.proposalNumberToken}`
        },
        back(){
             this.$hmt.trackEvent2('done', 'to_wecaht')
             wx && wx.closeWindow();
        }
    },
    components: {},
    watch: {}
};
</script>

<style scoped>
.content {
    padding: 1.2rem .533333rem 0;
    text-align: center;
}
.content > img {
    width: 6.853333rem;
    margin: 0 auto;
}
.title {
    font-size: 0.64rem;
    font-weight: 600;
    color: rgba(102, 102, 102, 1);
    line-height: 0.88rem;
    padding: 0.773333rem 0 0.133333rem;
}
.content > p {
    font-size: 0.373333rem;
    color: rgba(102, 102, 102, 1);
    line-height: 0.533333rem;
    margin-bottom:1.013333rem;
}
.content > p > span {
    color: #ff7734ff;
    margin-bottom: 1.013333rem;
}
.to_my,
.back_ms {
    width: 5.6rem;
    height: 1.2rem;
   
    border-radius: 0.613333rem;
    line-height: 1.2rem;
    border: 1px solid rgba(224, 183, 118, 1);
    margin: 0 auto .48rem;
}
.to_my,.to_home {
    font-size: 0.453333rem;
    color: rgba(255, 255, 255, 1);
    line-height: 1.2rem;
     background: rgba(224, 183, 118, 1);
}
.back_ms{
    font-size: 0.453333rem;
    color: rgba(224, 183, 118, 1);
    line-height: 1.2rem;
     background:#fff;
}
</style>
