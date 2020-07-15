<template>
    <div class="input-group flex" :class="{'dirty': selfDirty&&!allRight}">
        <label for="">{{label}}</label>
        <input type="text" v-resetInput :placeholder='placeholder' :value="value" @input="handleInput" @focus="onFocus" @blur="onBlur" :class="{'dirty': selfDirty}" maxlength="8">

        <div class="send-btn" @click.stop="handleClick">{{ smsTxt }}</div>
    </div>
</template>
<script>
import { isPhoneNo } from "@/util/js/common";
import Vue from 'vue'
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
import * as comment from "@/util/js/common";
export default {
    data: function() {
        return {
            smsTxt: "发送验证码",
            lock: false,
            selfDirty: false,
            isFocus: false,
            errorValue: false
        };
    },
    props: ["value", "label", "placeholder", "dirty", "phone"],
    mounted() {
        let parent = this.$parent;
        if (parent) {
            parent.$emit("on-form-item-add", this); //给form缓存实例
        }
    },
    methods: {
        handleInput(evt) {
            var value = event.target.value;
            this.$emit("input", value);
        },
        handleClick() {
            if (!isPhoneNo(this.phone)) {
                this.$toast("手机号码格式错误");
                return;
            }
            if (this.lock) return;
            this.selfDirty = true;   
            this.$emit('sendCode')
                  
        },
        countDown: function(_callback) {
            var t = 60,
                _this = this;

            var run = function() {
                _this.currentValue = _this.value;
                _this.smsTxt = `${t}s`;

                if (t >= 0) {
                    t--;
                    setTimeout(() => {
                        run();
                    }, 1000);
                } else {
                    _this.lock = false;
                    _callback && _callback();
                    _this.smsTxt = "发送验证码";
                }
            };

            _this.lock = true;
            run();
        },
        onFocus(evt) {
            if (isAndroid) {
                setTimeout(() => {
                    evt.target.scrollIntoView();
                }, 1000);
            }

            this.isFocus = true;
            this.selfDirty = false;
        },
        onBlur() {
            this.isFocus = false;
            this.selfDirty = true;
        },
        isCodeNo(str) {
            var pattern = /^\d{4,8}$/;
            return pattern.test(str);
        },
        onChecked() {
            this.selfDirty = true;
        }
    },
    computed: {
        allRight() {
            return this.isCodeNo(this.value);
        }
    },
    watch: {
        dirty: function(v) {
            if (v) {
                this.selfDirty = true;
            }
        },
        value: function(value) {
            if (value && !this.isCodeNo(value)) {
                this.errorValue = true;
            } else {
                this.errorValue = false;
            }
        }
    }
};
</script>
<style scoped>
.input-group {
    position: relative;
    height: 1.173333rem;
    line-height: 0.586667rem;
    padding: 0.32rem 0;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.input-group.dirty label {
    color: rgba(236, 75, 75, 1);
}
.input-group.dirty {
    border-bottom: 1px solid rgba(236, 75, 75, 1);
}
label {
    width: 21%;
    text-align: left;
    color: rgba(102, 102, 102, 1);
}

input {
    display: block;
    border: none;
    width: 3.6rem;
    font-size: 0.373333rem;
    color: #333333;
    outline: none;
    line-height: 0.533333rem;
    text-align: right
}
/* .dirty input,.dirty label{
   color: #ff0000;
} */
input::-webkit-input-placeholder {
    color: #b2b2b2;
}

.send-btn {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    /* right: 0.46rem; */
    right: 0;
    line-height: 0.553333rem;
    text-align: center;
    font-size: 0.373333rem;
    color: #3A7BFF;
    width: 2.666667rem;
    height: 100%;
    line-height: 0.586667rem;
    padding: 0.32rem 0;
    border-left: 1px solid rgba(238, 238, 238, 1);
}
</style>