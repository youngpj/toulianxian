<template>
    <div class="input-group flex-between flex-center" :class="{'dirty': selfDirty&&!allRight}">
        <div v-if='readonly' class='readonly'></div>
        <!-- <textarea v-resetInput type="text" ref='textarea' v-if='type=="address"' :readonly="readonly" :class="{'rey':readonly}" :value="value" @blur.prevent="handleInput" :placeholder="placeholder" @focus="onFocus" @blur="onBlur" :maxlength="maxlength"></textarea> -->
        <!-- <input v-resetInput type="text"  :readonly="readonly" :class="{'rey':readonly}" :value="value" @input="handleInput"  :placeholder="placeholder" @focus="onFocus" @blur="onBlur" :maxlength="maxlength"> -->
        <!-- <div class="ps-container" v-show="!isFocus">
                <p class="ps" v-if="value && type == 'mobile' && !comment.isPhoneNo(value)">*手机号格式有误</p>
                <p class="ps" v-else-if="value && type == 'idcard' && !comment.isCardNo(value)">*身份证号格式有误</p>
                <p class="ps" v-else-if="value && type == 'name' && !comment.isNameNo(value)">*姓名格式有误</p>
                <p class="ps" v-else-if="value && type == 'code' && !comment.isCodeNo(value)">*验证码格式有误</p>
                <p class="ps" v-else-if="value && type == 'email' && !comment.isEmailNo(value)">*邮箱格式有误</p>
                <p class="ps" v-else-if="value && type == 'address' && !comment.isAdressNo(value)">*地址格式有误</p>
                
            </div> -->
        <label for="">{{label}}</label>
        <input v-resetInput :type="[keyboard == 'Number'?'tel':'text']" :readonly="readonly" :class="{'rey':readonly}" :value="value" @input="handleInput" :placeholder="placeholder" @focus="onFocus" @blur="onBlur" :maxlength="maxlength">
        <!-- <p class='errMsg'>{{errMsg[type]}}</p> -->
    </div>
</template>
<script >
import * as comment from "@/util/js/common";
import { kMaxLength } from "buffer";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default {
    name: "inputGroup",
    props: {
        value: String,
        label: String,
        placeholder: String,
        dirty: String,
        placeholder: String,
        type: String,
        readonly: Boolean,
        maxlength: Number | String,
        keyboard: {
            // 键盘类型
            type: String,
            default: "Normal"
        }
    },
    data() {
        return {
            selfDirty: false,
            isFocus: false,
            errMsg: {
                mobile: "手机号格式有误",
                idcard: "身份证格式有误",
                name: "姓名格式有误"
            }
        };
    },

    computed: {
        allRight() {
            switch (this.type) {
                case "mobile":
                    return comment.isPhoneNo(this.value);

                case "idcard":
                    return comment.isCardNo(this.value);

                case "name":
                    return comment.isNameNo(this.value);

                case "code":
                    return comment.isCodeNo(this.value);

                case "email":
                    return comment.isEmailNo(this.value);

                case "address":
                    return comment.isAddressNo(this.value);
                case "bank":
                    return comment.isBankNo(this.value);
                default:
                    true;
            }
        }
    },
    mounted() {
        let parent = this.$parent;
        if (parent) {
            parent.$emit("on-form-item-add", this); //给form缓存实例
        }
    },
    methods: {
        handleInput(event) {
            var value = event.target.value;
            this.$emit("input", value);
        },
        onFocus(event) {
            if (isAndroid) {
                setTimeout(() => {
                     event.target.scrollIntoViewIfNeeded();
                }, 1000);
            }
            this.selfDirty = false;
            this.isFocus = true;
        },
        onBlur(e) {
            this.selfDirty = true;
            this.isFocus = false;
            this.$emit("blur",e);
        },
        onChecked() {
            this.selfDirty = true;
        }
    },
    watch: {
        dirty(value) {
            if (value) {
                this.selfDirty = true;
            }
        }
    }
};
</script>
<style scoped>
.input-group {
    position: relative;
    line-height: 0.586667rem;
    padding: 0.32rem 0;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.input-group:last-of-type {
    border: none;
}
.input-group.dirty label {
    color: rgba(236, 75, 75, 1);
}
.input-group.dirty {
    border-bottom: 1px solid rgba(236, 75, 75, 1);
}
.readonly {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
}
label {
    width: 40%;
    text-align: right;
    padding-right: 0.266667rem;
    color: rgba(102, 102, 102, 1);
    text-align: left;
}
input,
textarea {
    width: 100%;
    border: none;
    font-size: 0.373333rem;
    color: rgba(51, 51, 51, 1);
    outline: none;
    line-height: 0.586667rem;
    /* -webkit-user-select: auto; */
    text-align: right;
}
textarea {
    height: 0.586667rem;
}
input.rey,
textarea.rey {
    color: #ccc;
}
/* .dirty input,.dirty label{
   color: #ff0000;
} */
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
    color: #b2b2b2;
}
input.dirty::-webkit-input-placeholder {
    color: #ff0000;
}
</style>