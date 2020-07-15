<template>
    <div class='contentBox'>
        <div class="container claimInf floor" :class="{active:rule}">
            <div class="ques-btn " @click='rule=!rule'>
                <span>交易规则</span>
                <img src="~img/arrow.png" alt="" class="arrow">
            </div>
            <div class='rule_box'>
                <div class="rule_text">
                    <div>【投保规则】</div>
                    <p>投保金额：1000元起，1000元递增</p>
                    <p>单笔投保金额上限：19.9万元</p>
                    <p>总投保金额上限：500万元</p>
                    <p>初始费用：趸交保费或追加保费的1%</p>
                </div>
                <div class="rule_text">
                    <div>【退保规则】</div>
                    <p>退保费用(个人账户价值的一定比例)：第1保单年度 3%，第2保单年度 2%，第3保单年度 1%，第4保单年度 1%，第5保单年度 1%，第6保单年度及以后0%</p>
                    <p>到帐时间：1~3个工作日</p>
                </div>
            </div>
        </div>
        <div class="container claimInf floor" :class="{active:duty}">
            <div class="ques-btn " @click='duty=!duty'>
                <span>保障责任</span>
                <img src="~img/arrow.png" alt="" class="arrow">
            </div>
            <div class='rule_box'>
                <div class="rule_text">
                    <div>【身故保险金】</div>
                    <p>若被保人身故，给付个人账户价值（未建立个人账户的给付已交保费）。</p>
                </div>
                <div class="rule_text">
                    <div>【年金】</div>
                    <p>自本合同生效满十年且被保险人年满六十五周岁后的首个保单周年日起，若被保险人在每一个保单周年日仍生存，我们将按每个保单周年日的下一个资产评估日本合同个人账户价值的3%给付年金，但每个保单年度给付的年金金额以本合同累计已交保险费(不计利息)的20%为限。 年金给付后，您的个人账户价值按照我们给付的年金数额等额少。</p>
                </div>
            </div>
        </div>
        <div class="container claimInf floor" :class="{active:claimInf}">
            <div class="ques-btn " @click='claimInf=!claimInf'>
                <span>理赔说明</span>
                <img src="~img/arrow.png" alt="" class="arrow">
            </div>
            <div class='claimContent'>
                <div class="line"></div>
                <div class="inshort-container">
                    <div class="index-num">1</div>
                    <div class="inshort-header">第1步 理赔报案</div>
                    <div class="inshort-content">
                        请关注“民生保险”微信公众号 （微信号MSBX95596），并在“服务+”-“服务大厅”-“理赔管家”目录下发起理赔申请。
                    </div>
                </div>
                <div class="inshort-container">
                    <div class="index-num">2</div>
                    <div class="inshort-header">第2步 提交理赔资料</div>
                    <div class="inshort-content">
                        将相关影像材料上传（原件需提交至公司）。
                    </div>
                </div>
                <div class="inshort-container">
                    <div class="index-num">3</div>
                    <div class="inshort-header">第3步 完成理赔</div>
                    <div class="inshort-content">
                        我们会根据审核结果将理赔款项支付到受益人指定账户。
                    </div>
                </div>
            </div>
        </div>
        <div class="faqBox floor" :class="{active:faq}">
            <div class='ques-btn' @click='faq=!faq' click-tag="常见问题">
                <span>常见问题</span>
                <img src="~img/arrow.png" alt="" class="arrow">
            </div>
            <div class="QA-container ">
                <div class="QA-item">
                    <div class="ques"><img src="~img/questionicon.png" alt=""> 投保年龄范围是多少?</div>
                    <div class="answer">A：投保年龄范围为18周岁（含）至65周岁（含）（陕西、内蒙古地区投保年龄必须低于60周岁）。投保人只能为自己购买本保险。</div>
                </div>
                <div class="QA-item">
                    <div class="ques"><img src="~img/questionicon.png" alt=""> 哪些地区可以购买？</div>
                    <div class="answer">A：为方便向客户提供服务，仅限在如下地区具有固定居住地的中国公民投保：河北、山西、内蒙古、辽宁、黑龙江、上海、江苏、浙江、安徽、福建、江西、山东、河南、湖北、湖南、广东、广西、重庆、四川、陕西、宁波、大连、厦门、天津、北京。</div>
                </div>
                <div class="QA-item">
                    <div class="ques"><img src="~img/questionicon.png" alt=""> 本产品是否有犹豫期?</div>
                    <div class="answer">A：自您签收本合同次日起，有十五天的犹豫期。如果您在投保时选择在犹豫期内将保险费转入投资账户，并且在犹豫期内提出解除本合同，我们将在扣除十元工本费后向您退还我们接到解除合同申请书之日的下一个资产评估日的个人账户价值以及除资产管理费之外的其他已收取的各项费用。在个人账户建立日至解除这段期间的投资风险和投资费用均由您承担。如果您在投保时选择在犹豫期后将保险费转入投资账户，并且在犹豫期内提出解除本合同, 我们将在扣除十元工本费后无息退还您所交的全部保险费。您在犹豫期满后解除本合同或者部分领取本合同个人账户价值时，我们将收取退保费用。</div>
                </div>
                <div class="QA-item">
                    <div class="ques"><img src="~img/questionicon.png" alt=""> 本产品是否有资产管理费?</div>
                    <div class="answer">A：目前，稳健增利投资账户的资产管理费目前收取标准为 1%。由于客观原因我们保留调整资产管理费的权利，但是调整后的资产管理费年收取比例最高不超过 2%。</div>
                </div>
            </div>
        </div>
        <div class='info'>*本产品资料为理解条款所用，仅供客户参考，各项保险利益以条款内容为准。</div>
    </div>
</template>
<style  scoped >
.container {
    position: relative;
    overflow: hidden;
    margin-bottom: 0.266667rem;
    background-color: #fff;
}
.rule_box {
    padding: 0.4rem 0.56rem;
}
.rule_text {
    font-size: 0.373333rem;
    padding:.133333rem 0 .533333rem;
    line-height: 0.533333rem;
}
.rule_text > div {
    font-weight: 900;
    color: rgba(47, 51, 51, 1);
    margin-bottom: 0.133333rem;
}
.rule_text > p {
    color: rgba(102, 102, 102, 1);
}
.line {
    position: absolute;
    top: 1.986667rem;
    left: 0.678rem;
    width: 2px;
    height: 4.13333rem;
    border-right: 1px dashed rgba(232, 200, 143, 1);
    /* background: url(~img/line2.png) no-repeat; */
}

.block-head {
    overflow: hidden;
    /* background-color: #fff; */
    border-bottom: 1px solid #eee;
    padding: 0 0.426667rem;
    margin-bottom: 0.4rem;
}

.block-head h2 {
    font-size: 0.426667rem;
    color: #333;
    line-height: 1.066667rem;
    float: left;
}

.block-head p {
    float: right;
    color: #646464;
    font-size: 0.373333rem;
}

.inshort-header {
    font-size: 0.373333rem;
    line-height: 0.586667rem;
    color: #333333;
    margin-bottom: .213333rem;
    font-weight: 900;
}

.inshort-content {
    line-height: 0.533333rem;
    font-size: .373333rem;
    color: #666666;
}

.inshort-container {
    position: relative;
    margin-bottom: 0.666667rem;
    padding: 0 0.426667rem 0 1.333333rem;
}

.inshort-container .index-num {
    position: absolute;
    left: 0.426667rem;
    top: 0;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    width: 0.533333rem;
    height: 0.533333rem;
    background: linear-gradient(
        180deg,
        rgba(232, 200, 143, 1) 5%,
        rgba(224, 183, 118, 1) 100%
    );
    font-size: 0.373333rem;
    line-height: 0.533333rem;
}
.faqBox {
    height: 1.386667rem;
    overflow: hidden;
    transition: all 0.3s;
}

.faqBox.active {
    position: relative;
    height: auto;
}

.faqBox.active .ques-btn {
    border-bottom: 1px solid #eee;
}

.claimInf.active .ques-btn {
    border-bottom: 1px solid #eee;
}
.claimInf.active .ques-btn > img.arrow {
    transform: rotate(-90deg);
}
.claimInf.active .claimContent,
.claimInf.active .rule_box {
    display: block;
}
.claimContent {
    padding-top: 0.4rem;
    display: none;
}
.rule_box {
    display: none;
}
.ques-btn {
    position: relative;
    font-size: 0.426667rem;
    padding: 0.346667rem 0.56rem;
    color: #333333;
    background-color: #fff;
    height: 1.386667rem;
    overflow: hidden;
}

.ques-btn > span {
    font-weight: bold;
}

.ques > img {
    display: inline-block;
    width: 0.6rem;
    vertical-align: middle;
}

.ques-btn img.arrow {
    position: absolute;
    width: 0.213333rem;
    top: 0.426667rem;
    right: 0.56rem;
    transition: all 0.3s;
    transform: rotate(0deg);
}

.faqBox.active .ques-btn > img.arrow {
    transform: rotate(-90deg);
}

.QA-container {
    padding: 0.42rem 0.56rem;
    background: #fff;
}

.QA-item {
    margin-bottom: 0.666667rem;
    line-height: 0.533333rem;
}

.QA-item:last-child {
    margin-bottom: 0;
}

.ques {
    font-size: 0.373333rem;
    line-height: 0.533333rem;
    margin-bottom: 0.266667rem;
    color: #333;
    font-weight: bold;
}

.answer {
    font-size: 0.373333rem;
    color: #666;
}
.info {
    line-height: .48rem;
    font-size: 0.346667rem;
    color: rgba(188, 188, 188, 1);
    padding:.266667rem .426667rem .6rem;
    background:#fff;
}
</style>
<script>
export default {
    name: "showMore",
    data() {
        return {
            claimInf: false,
            faq: false,
            rule: false,
            duty: false
        };
    },
    created() {}
};
</script>
