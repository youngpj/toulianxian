<template>
    <div class="compoent">
        <div class="header" :class='type'>
            <div class="line flex-center">
                <p></p>
                <span></span>
                <p></p>
                <span></span>
                <p></p>
            </div>
            <div class="flex-between word">
                <p>投保金额</p>
                <p>投保信息</p>
                <p>投保确认</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: String
    },
    data() {
        return {};
    },
    created: function(data) {},

    methods: {},
    components: {},
    watch: {}
};
</script>

<style scoped>
.compoent {
    background: rgba(247, 248, 250, 1);
}
.header {
    padding: 0.506667rem 0.453333rem 0.24rem;
    background: rgba(94, 116, 226, 1);
}
.line {
    padding: 0 0.383333rem;
}
.line > p {
    width: 0.48rem;
    height: 0.48rem;
    border: 1px solid rgba(146, 160, 230, 1);
    border-radius: 100%;
    flex: none;
    position: relative;
}
.line > span {
    height: 1px;
    width: 100%;
    display: block;
    background: #94a1e8;
}
.word {
    padding-top: 0.133333rem;
}
.word > p {
    font-size: 0.32rem;
    color: rgba(146, 160, 230, 1);
    line-height: 0.453333rem;
}
.money > .line > p:first-of-type {
    border: 1px solid rgba(255, 255, 255, 1);
}
.money > .word > p:first-of-type {
    color: rgba(255, 255, 255, 1);
}

.info > .line > p:first-of-type {
    background: url("~img/rightwite.png") no-repeat;
    background-size: 100%;
    border: none;
}
.info > .word > p:first-of-type {
    color: rgba(255, 255, 255, 1);
}
.info > .line > p {
    border: 1px solid rgba(255, 255, 255, 1);
}
.info > .word > p {
    color: rgba(255, 255, 255, 1);
}
.info > .line > p:last-of-type {
    border: 1px solid rgba(146, 160, 230, 1);
}
.info > .word > p:last-of-type {
    color: rgba(146, 160, 230, 1);
}

.sure > .line > p {
    background: url("~img/rightwite.png") no-repeat;
    background-size: 100%;
    border: none;
}
.sure > .word > p {
    color: rgba(255, 255, 255, 1);
}
.sure > .line > p:last-of-type {
    background: none;
    border: 1px solid rgba(255, 255, 255, 1);
}
</style>
