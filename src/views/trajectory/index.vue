<template>
    <div style=''>
        <div class='earnings_box'>
            <p>{{timeData[selectValue].label}}年化收益率</p>
            <span>{{timeData[selectValue].yield}}%</span>
        </div>
        <div class="echart_box">
            <div class="echart_height">
                <MsEchart :echartsData='showData'></MsEchart>
            </div>

            <div class="select_time flex">
                <span v-for='(item) in timeData' :class='{active:item.value==selectValue}' :key='item.value' @click='selectTime(item.value)'>
                    {{item.label}}
                </span>
            </div>
            <p>*更多净值信息请前往民生保险官网(www.minshenglife.com)查询</p>
        </div>

    </div>
</template>

<script>
import MsEchart from "@/components/echart.vue";
import moment from "moment";
import { getNetWorth } from "@/api.js";
export default {
    name: "home",
    data() {
        return {
            echartsData: { x: [], y: [] },
            showData: { x: [], y: [] },
            timeData: {
                1: {
                    label: "近1月",
                    value: "1",
                    yield: ""
                },
                3: {
                    label: "近3月",
                    value: "3",
                    yield: ""
                }
                // 12: {
                //   label: "近1年",
                //   value: "12",
                //   yield: ""
                // }
                // {
                //     label: "成立以来",
                //     value: "0"
                // }
            },
            selectValue: "3"
        };
    },
    created() {
        this.$hmt.trackEvent2("landingpage", "lucre");
        this.getNetWorth();
    },
    mounted() {},
    components: {
        MsEchart
    },
    methods: {
        freeze(obj) {
            Object.freeze(obj)
            obj.forEach(item => {
                Object.freeze(item);
            });
        },
        getNetWorth() {
            this.$showLoading();
            getNetWorth()
                .then(res => {
                    this.$hideLoading();
                    let data = res.data;
                     this.freeze(data);
                    this.echartsData = data;
                    this.timeData[1].yield = data[0].yieldMonth;
                    this.timeData[3].yield = data[0].yieldQuarter;
                    //   this.timeData[12].yield = data[0].yieldYear;
                    this.selectTime(3);
                })
                .catch(e => {
                    console.log(e);
                    this.$hideLoading();
                });
        },
        selectTime(value) {
            let days = +moment().subtract(value, "month");
            let arr = this.echartsData.filter(item => {
                return +moment(item.netDate) >= days;
            });
            let x = [],
                y = [];
            arr.forEach(item => {
                x.unshift(item.netDate);
                y.unshift(item.unitNet);
            });
            this.selectValue = value;
            this.showData = {
                x: x,
                y: y
            };
        }
    }
};
</script>
<style  scoped >
.earnings_box {
    height: 3.36rem;
    background: url(~img/bluebg.jpg) no-repeat;
    background-size: over;
    padding: 0.533333rem 0.426667rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.earnings_box > p {
    font-size: 0.373333rem;
    color: rgba(255, 255, 255, 1);
}
.earnings_box > span {
    font-size: 1.146667rem;
    color: rgba(255, 255, 255, 1);
}
.echart_box {
    padding: 1.066667rem 0;
}
.echart_height {
    height: 3.666667rem;
    width: 100%;
    margin: 0 auto;
}
.select_time {
    margin: 0.96rem auto 0.453333rem;
    border: 2px solid rgba(94, 116, 226, 1);
    /* border-right: 1px solid rgba(94, 116, 226, 1); */
    width: 8.66rem;
}
.select_time > span {
    line-height: 0.64rem;
    font-size: 0.32rem;
    color: rgba(94, 116, 226, 1);
    border-right: 1px solid rgba(94, 116, 226, 1);
    /* width: 34%; */
    width: 50%;
    text-align: center;
}
.select_time > span:last-of-type {
    border-right: none;
}
.select_time > span.active {
    color: rgba(255, 255, 255, 1);
    background: rgba(94, 116, 226, 1);
}
.echart_box > p {
    font-size: 0.32rem;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 0.586667rem;
    width: 8.96rem;
    margin: 0 auto;
}
</style>
