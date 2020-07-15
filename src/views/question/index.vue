<template>
    <transition name="forward">
        <div v-if='animation'>
            <div class="question" v-if='question.length>0'>
                <div class="num">
                    <span>{{num}}</span>/{{question.length}}</div>
                <div class="title">{{question[num-1].question}}</div>
                <p class='item' :class='{active:(userAns[num-1]&&userAns[num-1].no)==(item.no)}' v-for='(item,key) in question[num-1].answers' :key='item.grade+key' @click='choose(item.no,item.grade)'>
                    {{item.no+'.'+item.answer}}
                </p>
                <div class='back' @click='back' v-show='num!=1'>上一题</div>

            </div>
        </div>
    </transition>
</template>

<script>
import { getQuestion } from "@/api";
export default {
    name: "question",
    data() {
        return {
            num: "",
            // user: "",
            question: [],
            userAns: [],
            animation: true
        };
    },
    created: function(data) {
        this.$showLoading()
        getQuestion().then(res => {
             this.$hideLoading()
            this.question = res.data;
        });
        this.num = this.$route.params.id;
        if (this.num == 1) {
            this.$sessionStorage.setItem("answer", []);
        }
        this.userAns = this.$sessionStorage.getItem("answer") || [];
    },
    beforeRouteUpdate(to, from, next) {
        this.num = to.params.id;
        if(from.name=='question'){
            this.animation=false;
            this.$nextTick(()=>{
                this.animation=true
            })
        }
        next();
    },
    methods: {
        choose(index, grade) {
          this.userAns.splice([this.num - 1], 1, { no: index, grade });
           this.$sessionStorage.setItem("answer", this.userAns);
            if (this.num < this.question.length) {
                setTimeout(() => {
                    this.num++;               
                    this.$router.push(`/question/${this.num}`);
                }, 100);
            } else if(this.num == this.question.length) {
                let grade = 0,
                    level = 0;
                for (let key in this.userAns) {
                    grade += this.userAns[key].grade;
                }
                if (grade < 25) {
                    level = 1;
                } else if (grade < 50) {
                    level = 2;
                } else if (grade < 75) {
                    level = 3;
                } else if (grade < 101) {
                    level = 4;
                }
                this.$router.push({
                    path: "/appraisal",
                    query: { type: level }
                });
            }
        },
        back() {
            this.$router.go(-1);
        },
       
    },
    components: {},
    watch: {}
};
</script>

<style scoped>
.question {
    padding: 0.293333rem 0.613333rem;
    background: #fff;
    height: 100%;
    position: fixed;
}
.num {
    font-size: 0.533333rem;
    font-weight: 500;
    color: rgba(94, 116, 226, 1);
    line-height: 0.746667rem;
    margin-bottom: 0.213333rem;
}
.num > span {
    font-size: 0.8rem;
}
.title {
    font-size: 0.533333rem;
    font-weight: 600;
    color: rgba(94, 116, 226, 1);
    line-height: 0.746667rem;
    margin-bottom: 0.533333rem;
}
.item {
    width: 8.746667rem;
    min-height: 1.333333rem;
    background: rgba(250, 250, 250, 1);
    font-size: 0.426667rem;
    font-weight: 500;
    color: rgba(35, 35, 35, 1);
    line-height: 0.586667rem;
    padding: 0.373333rem 0.533333rem;
    margin-bottom: 0.4rem;
}
.item.active {
    background: #5e74e2ff;
    color: rgba(255, 255, 255, 1);
}
.back {
    width: 2.08rem;
    height: 0.746667rem;
    line-height: 0.746667rem;
    border-radius: 0.106667rem;
    border: 1px solid rgba(224, 183, 118, 1);
    font-size: 0.346667rem;
    color: #E0B776;
    margin: 1.333333rem auto 0;
    text-align: center; 
}
</style>
