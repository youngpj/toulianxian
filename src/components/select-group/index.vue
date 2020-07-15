<template>
    <div class="select-group flex-between" :class="{'dirty': !value && selfDirty}">
        <label for="">{{label}}</label>
        <!-- <div class="value-container"> -->
        <div class='selectBox'>
            <select :value="value" @input="handleInput" v-resetInput :class="{'empty': !value}" @blur="onBlur">
                <option value="">{{placeholder}}</option>
                <option v-for="(item) in options" :key="item.value" :value="item.value" :selected="item.value == value ? 'selected' : ''">{{ item.label }}</option>
            </select>
        </div>

        <!-- <div class="ps-container" v-show="!value && selfDirty ">
            <p class="ps">*{{placeholder || '选项不能为空'}}</p>
        </div> -->
        <!-- </div> -->

        <!-- <img src="../assets/image/jiantouxia.png" alt="" class="arrow-xia"> -->
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            currentValue: this.value,
            selfDirty: false
        };
    },
    mounted() {
        let parent = this.$parent;
        if (parent) {
            parent.$emit("on-form-item-add", this); //给form缓存实例
        }
    },
    props: ["value", "label", "placeholder", "options", "dirty"],
    methods: {
        handleInput(evt) {
            var value = event.target.value;
            this.$emit("input", value);
        },
        onBlur() {
            this.selfDirty = true;
        },
        onChecked() {
            this.selfDirty = true;
        }
    },
    watch: {
        dirty: function(v) {
            if (v) this.selfDirty = true;
        }
    }
};
</script>
<style scoped>
.select-group {
    position: relative;
    background-color: #fff;
    padding: 0.32rem 0;
    border-bottom: 1px solid #eee;
    clear: both;
    font-size: 0.373333rem;
    line-height: 0.64rem;
}

.select-group.dirty {
    border-bottom: 1px solid rgba(236, 75, 75, 1);
}
.select-group.dirty > label {
    color: rgba(236, 75, 75, 1);
}
.selectBox {
    background: url(./jiantouxia.png) no-repeat right center;
    background-size: 0.346667rem;
    padding-right: 0.42rem;
}
select {
    /* float: left; */
    /* position: absolute; */
    border: none;
    font-size: 0.373333rem;
    color: #333;
    outline: none;
    line-height: 0.586667rem;
    background: transparent;
    width: 100%;
    appearance: none;
    direction: rtl;
}

label {
    float: left;
    font-size: 0.373333rem;
    color: #666;
    margin-right: 0.266667rem;
    min-width: 60px;
}

.arrow-xia {
    position: absolute;
    top: 50%;
    right: 0.426667rem;
    transform: translateY(-50%);
    width: 0.373333rem;
}

.empty {
    color: #ccc;
}

.value-container {
    position: relative;
    float: left;
}

.ps-container {
    position: absolute;
    font-size: 0.32rem;
    color: #ff0000;
    bottom: -0.026667rem;
    left: 1.466667rem;
    /* transform: scale(.9); */
}

option {
    color: #333;
}

select.dirty {
    color: #ff0000;
}
</style>