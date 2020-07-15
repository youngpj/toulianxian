import axios from 'axios'
import Http from '@/plugins/modules/http'
import Vue from 'vue'
import config from '@/config'
import message from '@/baseui/message'
import resetInput from './modules/reset-display'
import url from './modules/url'
import hmt from './modules/hmt'
import storage from './modules/storage'
import wxsdk from './modules/wxsdk'
import actionMonitor from './modules/action-monitor.js'
import moment from 'moment'
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
var init = function () {
    Vue.prototype.axios = axios;
    Vue.prototype.$moment = moment;
    Vue.use(Http, { domain: config.domain })
    Vue.use(message)
     Vue.use(url)
    Vue.use(wxsdk, { defaultShareVisiable: true });
    Vue.use(resetInput)
    Vue.use(storage, {scope: config.storageScope});
    Vue.use(actionMonitor, { paramsArray: ['openid', 'source', 'oid','shareid'], reqUrl: '/rest/v0/action/track' });
    Vue.use(hmt);
}
export default init;  