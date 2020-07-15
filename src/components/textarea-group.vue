<template>
    <div class="input-group flex-between" :class="{'dirty': selfDirty&&!allRight}">
        <div v-if='readonly' class='readonly'></div>
        <label for="">{{label}}</label>
        <textarea v-resetInput style = "resize: none" rows='2' :readonly="readonly" :class="{'rey':readonly}" :value="value" @input="handleInput" :placeholder="placeholder" @focus="onFocus" @blur="onBlur" :maxlength="maxlength"></textarea>
    </div>
</template>
<script >
import {isAddressNo} from "@/util/js/common";
import { kMaxLength } from "buffer";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default {
    props: {
        value: String,
        label: String,
        placeholder: String,
        dirty: String,
        placeholder: String,
        readonly: Boolean,
        maxlength: Number|String,
        type:String
    },
    data() {
        return {
            selfDirty: false,
            isFocus: false,
        };
    },
    computed: {
        allRight() {
            console.log(this.type);
            switch (this.type) {
                case "address":
                    return isAddressNo(this.value);
                default:
                    true;
            }
        }
    },
    mounted() {
        console.log(this.allRight);
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
                    // (event.target as HTMLElement).scrollIntoViewIfNeeded();
                }, 1000);
            }
            this.selfDirty = false;
            this.isFocus = true;
        },
        onBlur() {
            this.selfDirty = true;
            this.isFocus = false;
            this.$emit("blur");
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
        },
    }
};
</script>
<style scoped>
.input-group {
    position: relative;
    line-height: 0.586667rem;
    padding: 0.32rem 0;
    border-radius: 4px;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.input-group:last-of-type{
    border:none;
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
   height:1.12rem;
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