import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import init from '@/plugins'

Vue.config.productionTip = false
import 'amfe-flexible'
import '@/util/css/common.css'
import '@/util/css/transition.css'
import config from './config'
import 'mint-ui/lib/style.css'
import {
    parseUrl,
} from './util/js/utils.js'


window.v = Vue.prototype;
init()
var oauthURL = config.isProduct ? 'http://www.msjk95596.com/act/wechat/base/access_token/?state=' : 'http://test.msjk95596.com/act/wechat/base/access_token/?state=';
if (!parseUrl('oid')) { // 如果是微信，并且在config中idLogin为true，同时是非登陆状态就重新登陆
    location.href = oauthURL + location.origin + location.pathname + encodeURIComponent(location.search);
} else {
    // 由于分享后的地址在ios上Hash会丢失，因此通过redirect_path来跳转页面
    var redirectPath = parseUrl('redirect_path');
    if (redirectPath) {
        var url = deleteUrlQuery('redirect_path');
        window.location.href = url + '#/' + redirectPath;
    }
    initApp()

}


var token = v.$url.parseUrl('token');
var oid = v.$url.parseUrl('oid');
sessionStorage.setItem('openid',oid)
v.$Http.setHeader({
    'accesskey': '15EOvS2ePZ',
    'signature': 'test',
    'token': token,
    'CHANNELTYPE': 'WEIXINMS',
});

v.$wxsdk.apiTicket('/hc/v0/shares/sign'); // 微信签名
v.$wxsdk.setDefaultShare(config.defaultShareOption); // 配置默认的分享
v.$wxsdk.onShareSuccess = function (type) {
    if (type === 'appMessage') {
        this.$trackEvent('globe', 'friend')
    } else {
        this.$trackEvent('globe', 'friendgroup')
    }
}
function initApp() {
    router.beforeEach((to, from, next) => {
        if (to.meta.title) {
            document.title = to.meta.title
        }
        window.scrollTo(0,0)
        next()
    })
    router.afterEach((to, from, next) => {
        v.$hideLoading()
    })
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
}


document.addEventListener('focusout',(e)=>{
 
})


// let app = new Vue({
//     router,
//     components: { App },
//     render: h => h(App), 
//   })

//   window.mountApp = () => {
//     app.$mount('#app')
//   }
//   if (process.env.NODE_ENV === 'production') {
//     if (window.STYLE_READY) {
//       window.mountApp()
//     }
//   } else {
//     window.mountApp()
//   }