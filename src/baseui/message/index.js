import Vue from "vue";
import alert from "./alert.vue";
import loading from "./loading.vue";
import toast from "./toast.vue";
const Alerts = Vue.extend(alert);
const Loading = Vue.extend(loading);
const Toast = Vue.extend(toast);
var instance, instanceLoading, instanceToast;
//初始化alert
const initInstance = () => {
    instance = new Alerts({
        el: document.createElement("div") 
    });
};

const message = function() {

}
message.alert = (title, content,callback,btn='确定') => {
    if (!instance) {
        initInstance();
        document.body.appendChild(instance.$el); 
    }
    instance.title = title;
    instance.content = content;
    instance.btn = btn;
    instance.callback = callback;
    instance.type = 'alert';
    Vue.nextTick(() => {
        instance.visible = true;
    });
}
message.confirm = (title, content, callback, leftBtn, rightBtn) => {
    if (!instance) {
        initInstance();
        document.body.appendChild(instance.$el);
    }
    instance.title = title;
    instance.content = content;
    instance.callback = callback;
    instance.type = 'confirm';
    leftBtn ? instance.leftBtn = leftBtn : '';
    rightBtn ? instance.rightBtn = rightBtn : '';
    Vue.nextTick(() => {
        instance.visible = true;
    });
}
//loading
message.$showLoading = (title) => {
    if (instanceLoading) {
        return instanceLoading
    }
    instanceLoading = new Loading({
        el: document.createElement("div")
    });
    document.body.appendChild(instanceLoading.$el);
    instanceLoading.title = title;
    Vue.nextTick(() => {
        instanceLoading.visible = true;
    });
}
message.$hideLoading = (title) => {
    if (!instanceLoading) return;
    setTimeout(() => {
        if (instanceLoading&&instanceLoading.$el) {
            instanceLoading.$el.parentNode.removeChild(instanceLoading.$el);
            instanceLoading.$destroy()
        }
        if (instanceLoading) {
            instanceLoading = undefined
        }
    }, 300);
    instanceLoading.visible = false;
   
}
//toast
message.toast = (title) => {
    if(!title)return;
    instanceToast = new Toast({
        el: document.createElement("div")
    });
    document.body.appendChild(instanceToast.$el);
    instanceToast.title = title;
    instanceToast.visible = true;
}

function install() {
    Vue.prototype.$message = message
    Vue.prototype.$toast = message.toast  
    Vue.prototype.$showLoading = message.$showLoading
    Vue.prototype.$hideLoading = message.$hideLoading
}
export default {
    install
}