<template>
    <div class="home">
        <EchartsLine :options="echartsOptions" style='width:100%;margin:0 auto;height:100%;' ref="myCharts" />
    </div>
</template>
<style scoped>
.home {
    height: 100%;
}
</style>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";

export default {
    name: "echart",
    props: {
        echartsData: Object,
        theme: {
            type: String,
            default: "blue",
            validator: function(value) {
                return ["white", "blue"].includes(value);
            }
        }
    },
    data() {
        let themeType = {
            blue: {
                borderColor: "#7A8DEC", //横纵坐标
                backgroundLine: "#8C9CEC", //背景横线
                lineColor: "#5E74E2",
                backgroundColor: ["rgba(238,238,238,1)", "rgba(238,238,238,1)"],
                borderWidth: 2,
                inside: false,
                fontColor: "#8C9CEC"
            },
            white: {
                borderColor: "#7A8DECFF", //横纵坐标#7A8DECFF
                backgroundLine: "#8C9CEC", //背景横线
                lineColor: "#B5C1FF",
                backgroundColor: ["rgba(238,238,238,1)", "rgba(59,87,226,1)"],
                borderWidth: 2,
                inside: false,
                fontColor: "#fff"
            }
        };
        return {
            echartsOptions: {
                tooltip: {
                    trigger: "axis",
                    position: function(pt) {
                        return [pt[0], "20%"];
                    }
                },
                title: {
                    left: "center",
                    text: "大数据量面积图"
                },
                grid: {
                    left: 30,
                    right: 10,
                    bottom: 20,
                    width: "88%",
                    height: "94%"
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: "none"
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: "category",

                    // name:'时间',
                    // nameLocation:'end',
                    axisLabel: {
                        fontSize: 10,
                        textStyle: {
                            color: themeType[this.theme].fontColor
                        }
                    },
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: themeType[this.theme].borderColor
                        }
                    },

                    axisTick: {
                        show: false
                    },
                    data: this.echartsData.x
                },
                yAxis: {
                    type: "value",
                    axisLabel: {
                        fontSize: 10,
                        interval: 0,
                        margin: 1,
                        inside: themeType[this.theme].inside,
                        textStyle: {
                            color: themeType[this.theme].fontColor
                        }
                        //  color:themeType[this.theme].fontColor,
                    },
                    min: function(value) {
                        return value.min;
                    },
                    boundaryGap: [0, "10%"],
                    axisLine: {
                        lineStyle: {
                            color: themeType[this.theme].borderColor
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: [themeType[this.theme].backgroundLine]
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },

                dataZoom: [
                    {
                        type: "inside",
                        start: 0,
                        end: 10
                    },
                    {
                        start: 0,
                        end: 10,
                        handleIcon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
                        handleSize: "80%",
                        handleStyle: {
                            color: "#fff",
                            shadowBlur: 3,
                            shadowColor: "rgba(0, 0, 0, 0.6)",
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }
                ],
                series: [
                    {
                        name: "模拟数据",
                        type: "line",
                        smooth: true,
                        color: themeType[this.theme].lineColor,
                        backgroundColor: themeType[this.theme].lineColor,

                        symbol: "none",
                        sampling: "average",
                        itemStyle: {
                            color: themeType[this.theme].lineColor
                        },
                        lineStyle: {
                            color: themeType[this.theme].lineColor,
                            width: themeType[this.theme].borderWidth
                        },
                        areaStyle: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: themeType[this.theme].backgroundColor[0] // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: themeType[this.theme].backgroundColor[1] // 100% 处的颜色
                                    }
                                ]
                            }
                        },

                        data: this.echartsData.y
                    }
                ]
            }
        };
    },
    created() {},
    mounted() {},
    components: {
        EchartsLine: ECharts
    },
    watch: {
        echartsData(value) {
            this.echartsOptions.xAxis.data = value.x;
            this.echartsOptions.series[0].data = value.y;
            this.$refs.myCharts.mergeOptions(this.echartsOptions, true);
        }
    }
};
</script>
