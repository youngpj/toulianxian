<template>
    <div class='contentBox'>
        <div class='content'>
            <div class="title flex-jcenter">
                <p>适合长期持有</p>
            </div>
            <div class="item flex  banner1">
                <!-- <img src="~img/banner1.png" alt=""> -->
                <div class='item_text'>
                    <p class='item_title'>退保
                        <span>0</span>
                        费用</p>
                    <p class='item_content'>(第6保单年度及以后)</p>
                    <span>* 前5保单年度退保将收取一定费用</span>
                </div>
            </div>
            <div class="item flex banner2">
                <div class='item_text'>
                    <p class='item_title'>
                        <span>1‰</span>持续奖金</p>
                    <p class='item_content'>（在第5-14保单周年日发放，需未发生 部分领取）</p>
                    <span>* 趸交保险费部分的1‰（不含追加保费）</span>
                </div>
            </div>
            <div class="title flex-jcenter">
                <p>灵活取出</p>
            </div>
            <div class="item flex banner3">
                <div class='item_text'>
                    <p class='item_title'>
                        <span>20%</span>部分领取</p>
                    <p class='item_content'>（15天犹豫期后）</p>
                    <span>* 每个保单年度部分领取与年金之和不超过已交保费的20%</span>
                </div>
            </div>
            <div class="item flex banner4">
                <div class='item_text'>
                    <p class='item_title'>
                        <span>3%</span>年金领取</p>
                    <p class='item_content'>（保单生效满10年，且年满65周岁）</p>
                    <span>* 个人账户价值的3%给付年金</span>
                </div>
            </div>
        </div>
        <div class='to_clause'>
            <p>本产品为投资连结型保险，投资回报具有不确定性，产品投资风险由本人承担。</p>
            <p>更多详情请阅读
                <router-link to='xuzhi'> 《投保须知》</router-link>
                <a :href='shuomingshu'>《产品说明书》</a>和
                <a :href='`${httpsMsurl}/provision/index.html#/tiaokuan_toulianxian`'>《保险条款》</a>
            </p>
        </div>
    </div>
</template>
<style  scoped >
.contentBox {
    padding: 0 0.666667rem;
    background: #fff;
    overflow: hidden;
    margin-bottom: 0.266667rem;
}
.content {
    border-bottom: 1px solid #eee;
}
.title > p {
    font-size: 0.586667rem;
    font-weight: 600;
    color: rgba(224, 183, 118, 1);
    line-height: 0.8rem;
    padding: 0.64rem 0;
    position: relative;
}
.title > p:after {
    content: "";
    width: 0.8rem;
    height: 0.053333rem;
    background: rgba(224, 183, 118, 1);
    position: absolute;
    right: -0.133333rem;
    top: 50%;
    transform: translate(100%, -50%);
}
.title > p:before {
    content: "";
    width: 0.8rem;
    height: 0.053333rem;
    background: rgba(224, 183, 118, 1);
    position: absolute;
    left: -0.133333rem;
    top: 50%;
    transform: translate(-100%, -50%);
}
.item {
    height: 2.933333rem;
    font-size: 0;
    margin-bottom: 0.233333rem;
}
.banner1 {
    background: url(~img/banner1.png) no-repeat;
    background-size: 2.56rem;
    padding-left: 3rem;
}
.banner3 {
    background: url(~img/banner3.png) no-repeat;
    background-size: 2.56rem;
    padding-left: 3rem;
}
.banner2 {
    background: url(~img/banner2.png) no-repeat right top;
    background-size: 2.56rem;
    padding-right:30%;
}
.banner4 {
    background: url(~img/banner4.png) no-repeat right top;
    background-size: 2.56rem;
}
.item > img {
    width: 2.56rem;
}
.item_title {
    height: 0.666667rem;
    font-size: 0.48rem;
    color: rgba(22, 22, 22, 1);
    font-weight: 900;
    margin-bottom: 0.18rem;
}
.item_title > span {
    position: relative;
}
.item_title > span:after {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    content: "";
    width: 110%;
    height: 0.053333rem;
    background: rgba(227, 191, 142, 1);
}
.item_content {
    font-size: 0.346667rem;
    color: rgba(102, 102, 102, 1);
    line-height: 0.48rem;
    margin-bottom: 0.16rem;
}
.item_text > span {
    font-size: 0.32rem;
    color: rgba(179, 179, 179, 1);
    line-height: 0.453333rem;
}
.to_clause {
    padding: 0.373333rem 0 0.533333rem;
}
.to_clause > p {
    font-size: 0.346667rem;
    color: rgba(102, 102, 102, 1);
    line-height: 0.586667rem;
    margin-bottom: 0.266667rem;
    padding-left: 0.533333rem;
    position: relative;
}
.to_clause > p:after {
    position: absolute;
    top: 0.243333rem;
    left: 0;
    transform: translate(0%, -50%);
    content: "";
    width: 0.373333rem;
    height: 0.373333rem;
    background: url(~img/shapeicon.png) no-repeat;
    background-size: 100%;
}
.to_clause > p > a {
    color: #60a1ff;
}
</style>
<script>
import shuomingshu from '@/assets/pdf/shuomingshu.pdf'
import config from '@/config'
export default {
    name: "introduce",
    data() {
        return {
            shuomingshu,
            httpsMsurl:config.httpsMsurl
        };
    },
    created() {}
};
</script>
