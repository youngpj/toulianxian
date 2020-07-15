<template>
    <div class="input_content">
        <div class='flex-center'>￥<input type="tel" maxlength="6" @blur="checkMoney()" :value='value' @input='handleInput' v-resetInput placeholder="1000元起投"></div>
        <p :class="{err:errMsg}">{{errMsg||'请输入1000元的整数倍，上限19.9万元'}}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            errMsg: ""
        };
    },
    props:['value'],
    created: function(data) {},

    methods: {
        checkMoney() {
            if (this.value == "") {
                this.errMsg = "";
            } else if (this.value < 1000) {
                this.errMsg = "1000 元起投";
            } else if (this.value % 1000 !== 0) {
                this.errMsg = "请输入 1000 的整数倍";
            } else if (this.value > 199000) {
                this.errMsg = "最多可投19.9万元";
            }else{
                 this.errMsg = "";
            }
        },
        handleInput(e) {
            let num=e.target.value;
            this.$emit("input", +num);
        }
    },
    watch: {}
};
</script>

<style scoped>
.content_header {
    font-size: 0.426667rem;
    font-weight: 900;
    color: rgba(51, 51, 51, 1);
    line-height: 1.333333rem;
    padding: 0 0.4rem;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.input_content {
    padding: 0.666667rem 0.4rem 0.16rem;
}
.input_content > div {
    font-size: 0.8rem;
    font-weight: 900;
    color: rgba(22, 22, 22, 1);
    line-height: 1.12rem;
    margin-bottom: 0.8rem;
}
.input_content input {
    border: none;
    font-size: 0.8rem;
    outline: none;
}
.input_content > p {
    font-size: 0.346667rem;
    font-weight: 400;
    color: rgba(179, 179, 179, 1);
    line-height: 0.586667rem;
}
.input_content > p.err {
    color: rgba(236, 75, 75, 1);
}
</style>
