import Vue from 'vue';
import Skeleton from './index.vue';

export default new Vue({
    created() {
        console.log(111);
    },
    components: {
        Skeleton,
    },
    template: `
        <div>
        <Skeleton></Skeleton>
        </div>
        `
});
