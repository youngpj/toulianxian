<template>
    <div class="item flex">
        <input type="checkbox" :checked='value' @change='toEmit' >
        <p>
            <slot></slot>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        value: Boolean
    },
    data() {
        return {};
    },
    created: function(data) {},

    methods: {
        toEmit(e) {
            console.log(e.target.checked); 
            this.$emit('input',e.target.checked);
        }
    },
    components: {},
    watch: {}
};
</script>

<style scoped>
.item > p {
    font-size: 0.373333rem;
    color: rgba(102, 102, 102, 1);
    line-height: 0.533333rem;
}
.item > p > a,.item > p > span {
    color: #3a7bffff;
}
.item > input {
    position: relative;
    top: 0.083333rem;
    width: 0.4rem;
    height: 0.4rem;
    vertical-align: middle;
    border: none;
    outline: none;
    margin-right: 0.32rem;
    flex: none;
}

input::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 90%;
    height: 90%;
    transform: translate(-10%, -5%);
    background-repeat: no-repeat;
    background: #ffffff;
    border: 1px solid rgba(224, 183, 118, 1);
}
input::after {
    content: "";
    display: block;
    position: absolute;
    height: 0.3rem;
    width: 0.3rem;
    width: 110%;
    height: 110%;
    transform: translate(-10%, -5%);
    background: url(~img/rightyellow.jpg) no-repeat center, #fff;
    background-size: 100%;
    opacity: 0;
}

input:checked::after {
    opacity: 1;
}
</style>
