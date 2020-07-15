<template>
    <div class="input-group flex-between flex-center" :class="{'readonly':readonly,'dirty': selfDirty}" >
        <label>{{ label }}</label>
        <p class='flex-between flex-center' @click="open" :class="{active:value}">{{ value?value.name:placeholder }} </p>
        <div class='cityList' :class='{active:visible}'>
            <mt-picker :slots="myAddressSlots" :showToolbar='true' ref="picker" valueKey='name' @change="onMyAddressChange" :visible="visible">
                <div class='flex-between closeBtn'>
                    <p @click='cancel'>取消</p>
                    <p @click='makesure'>确定</p>
                </div>
            </mt-picker>
        </div>
        <div class="v-modal" v-show='visible'></div>
    </div>
</template>
<script>
import Vue from "vue";
import citylist from "@/assets/address.js";
import { Picker } from "mint-ui";
Vue.component(Picker.name, Picker);
export default {
    name: "citySelector",
    data: function() {
        return {
            visible: false,
            lock: false,
             selfDirty: false,
            myAddressSlots: [
                {
                    flex: 1,
                    defaultIndex: 1,
                    values: Object.values(citylist), //省份数组
                    className: "slot1",
                    textAlign: "center"
                },
                {
                    divider: true,
                    content: "-",
                    className: "slot2"
                },
                {
                    flex: 1,
                    values: [],
                    className: "slot3",
                    textAlign: "center"
                },
                {
                    divider: true,
                    content: "-",
                    className: "slot4"
                },
                {
                    flex: 1,
                    values: [],
                    className: "slot5",
                    textAlign: "center"
                }
            ],
            myAddress: {
                name: "",
                code: ""
            }
        };
    },
    props: ["value", "label", "readonly", "placeholder"],
    mounted: function() {
        this.$refs.picker.$el.addEventListener("click", () => {
            if (!this.$refs.picker.visible) {
                this.stopScroll(false);
            }
        });
          let parent = this.$parent;
        if (parent) {
            parent.$emit("on-form-item-add", this); //给form缓存实例
        }
    },
    methods: {
          onChecked() {
            this.selfDirty = true;
        },
        open: function() {
            if (this.lock) return;
            this.stopScroll(true);

            //this.$refs.picker.open();
            this.myAddressSlots[0].defaultIndex = 0;
            this.visible = true;
            // setTimeout(() => {
            //     document
            //         .getElementsByClassName("v-modal")[0]
            //         .addEventListener("click", () => {
            //             if (!this.$refs.picker.visible) {
            //                 this.stopScroll(false);
            //             }
            //         });
            // }, 100);
        },
        handleConfirm: function(val) {
            this.lock = true;
            setTimeout(() => {
                this.lock = false;
            }, 400);
            this.$emit("input", val);
        },
        makesure() {
            this.visible = false;
            this.stopScroll(false);
            this.$emit("input", this.myAddress);
            console.log(this.myAddress);
        },
        cancel() {
            this.visible = false;
            this.stopScroll(false);
        },
        onMyAddressChange(picker, values) {
            values[0] && picker.setSlotValues(1, values[0].children);
            values[1] && picker.setSlotValues(2, values[1].children);
            if (values[1] && values[2]) {
                this.myAddress.code = `${values[0].code}-${values[1].code}-${
                    values[2].code
                }`;
                this.myAddress.name = `${values[0].name}-${values[1].name}-${
                    values[2].name
                }`;
            } else if (values[1]) {
                this.myAddress.code = `${values[0].code}-${values[1].code}`;
                this.myAddress.name = `${values[0].name}-${values[1].name}`;
            } else {
                this.myAddress.code = `${values[0].code}`;
                this.myAddress.name = `${values[0].name}`;
            }
        },
        stopScroll: (function() {
            var handleStopScroll = function(evt) {
                evt.preventDefault();
            };

            return function(tag) {
                if (tag) {
                    console.log("禁止滚动");
                    document
                        .getElementsByClassName("page")[0]
                        .addEventListener("touchmove", handleStopScroll);
                } else {
                    console.log("开启滚动");
                    document
                        .getElementsByClassName("page")[0]
                        .removeEventListener("touchmove", handleStopScroll);
                }
            };
        })(),
        handleClick(evt) {
            evt.stopPropagation();
        }
    }
};
</script>
<style scoped>
.input-group {
    position: relative;
    background-color: #fff;
    padding: 0.32rem 0;
    border-bottom: 1px solid #eee;
    clear: both;
    font-size: 0.373333rem;
    line-height: 0.64rem;
}
.input-group.dirty label {
    color: rgba(236, 75, 75, 1);
}
.input-group.dirty {
    border-bottom: 1px solid rgba(236, 75, 75, 1);
}
.input-group.readonly::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
}
.input-group.dirty {
    border-bottom: 1px solid #ff8787;
}
.input-group > p {
    color: #ccc;
    background: url("./jiantouxia.png") no-repeat right center;
    background-size: 0.346667rem;
    padding-right: 0.42rem;
}
.input-group > p.active {
    color: #333;
}

.cityList {
    position: fixed;
    bottom: 0;
    left: 0;
    transform: translateY(300%);
    transition: all 0.3s;
    z-index: 4;
    width: 100%;
    background: #fff;
    height:5rem;
    
}
.cityList.active {
    transform: translateY(0);
}
.v-modal {
    z-index: 1;
}
.closeBtn {
    border-bottom: solid 1px #eaeaea;
}

.closeBtn > p {
    width: 50%;
    line-height: 1.066667rem;
    font-size: 0.426667rem;
    color: #26a2ff;
    text-align: center;
}
input,
textarea {
    width: 100%;
    text-align: right;
    border: none;
    font-size: 0.373333rem;
    color: #333;
    outline: none;
    line-height: 0.586667rem;
    -webkit-user-select: auto;
    text-align: right;
}
textarea {
    height: 0.586667rem;
}
input.rey,
textarea.rey {
    color: #ccc;
}
label {
    float: left;
    font-size: 0.373333rem;
    color: #666;
    width: 2.575rem;
    /* margin-right: .266667rem; */
}

.input-container {
    position: relative;
    /* float: left; */
    height: 100%;
    flex: 1;
}

.ps-container {
    position: absolute;
    font-size: 0.32rem;
    color: #ff0000;
    right: 0;
    bottom: -0.4rem;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
    color: #ccc;
}
input.dirty::-webkit-input-placeholder {
    color: #ff0000;
}

.clearfix:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
}

.clearfix {
    zoom: 1;
}
</style>