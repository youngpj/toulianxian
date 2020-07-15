import axios from 'axios';
import Vue from "vue";

axios.interceptors.response.use(data => {
    return data;
}, err => {
    Vue.prototype.$hideLoading()
    if (err.response&&err.response.status == 504) {
        Vue.prototype.$message.toast('系统繁忙,请稍作等待')
    } else {
        return Promise.reject(err);
    }
})
class Http {
    constructor() {
        this.domain = '';
    }
    setDomain(value) {
        this.domain = value
    }
    setHeader(opt) {
        Object.keys(opt).forEach(key => {
            axios.defaults.headers.common[key] = opt[key];
        });
    }
    get(path, opt, domain) {
        let preUrl = domain ? domain : this.domain;
        return axios.get(`${preUrl + path}`,opt);
    }
    post(path, opt, domain) {
        let preUrl = (domain || domain == '') ? domain : this.domain
        return axios.post(`${preUrl + path}`, opt);
    }

}
var http = new Http();
var install = function (Vue, option) {
    Vue.prototype.$Http = http;
    if (option && option.domain) {
        http.setDomain(option.domain)
    }
};

export default {
    install: install,
    http: http
}; 
