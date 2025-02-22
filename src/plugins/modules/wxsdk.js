import axios from 'axios';
import config from '@/config.js';
import { isWechat, isIOS, isAndroid } from '@/util/js/utils.js'

var WxSdk = function (options) {
    var options = options || {};

    this.jsApiList = null;
    this.configOptions = null; // 微信初始化配置项
    this.configIsReady = false;
    this.authUrl = null;
    this.shareMenuVisiable = true;
    // this.defaultShareVisiable = options.defaultShareVisiable === false ? false : true;
    this.defaultShareOption = {
        title: '',
        desc: '',
        imgUrl: '',
        link: ''
    }
    this.readyFnList = [];
}

// 默认开启所有接口
WxSdk.prototype.defaultJsApiList = [
    "openEnterpriseChat",
    "openEnterpriseContact",
    "onMenuShareTimeline",    // 分享到朋友圈
    "onMenuShareAppMessage",  // 分享给好友
    "onMenuShareQQ",
    "onMenuShareWeibo",
    "onMenuShareQZone",
    "startRecord",
    "stopRecord",
    "onVoiceRecordEnd",
    "playVoice",
    "pauseVoice",
    "stopVoice",
    "onVoicePlayEnd",
    "uploadVoice",
    "downloadVoice",
    "chooseImage",
    "previewImage",
    "uploadImage",
    "downloadImage",
    "translateVoice",
    "getNetworkType",
    "openLocation",
    "getLocation",
    "hideOptionMenu",
    "showOptionMenu",
    "hideMenuItems",  // 隐藏菜单
    "showMenuItems",  // 打开菜单
    "hideAllNonBaseMenuItem", // 隐藏所有菜单
    "showAllNonBaseMenuItem", // 打开所有菜单
    "closeWindow",
    "scanQRCode"
]

// 签名接口 程序进入时调用 传入签名接口url
WxSdk.prototype.apiTicket = function (url, isOld) {
    var wxsdk = this;
    var data = isOld ? location.pathname + location.search : window.location.origin + location.pathname + location.search;
    this.ticketUrl = url;

    axios.post(url, { data: data }).then(res => {
        var data = res.data;

        if (data.appId) {
            wxsdk.configOptions = data;
            this.configOptions.debug = false;
            wxsdk.configWxApis();
        }
    });
}

// 配置微信api 签名后调用
WxSdk.prototype.configWxApis = function () {
    var wxsdk = this;
    var jsApiList = this.jsApiList || this.defaultJsApiList;
    this.configOptions.jsApiList = jsApiList;

    console.log('配置微信初始化');

    wx.config({
        debug: this.configOptions.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.configOptions.appId, // 必填，公众号的唯一标识
        timestamp: this.configOptions.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.configOptions.noncestr, // 必填，生成签名的随机串
        signature: this.configOptions.sign,// 必填，签名，见附录1
        jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(() => {
        wxsdk.ready();
    });
}

// 
WxSdk.prototype.ready = function () {

    while (this.readyFnList.length > 0) {
        var fn = this.readyFnList.shift();
        fn.apply(this);
    }

    this.configIsReady = true;
}

WxSdk.prototype.onReady = function (fn) {
    if (this.configIsReady) {
        fn.apply(this);
    } else {
        this.readyFnList.push(fn);
    }
}

// 配置默认分享
WxSdk.prototype.setDefaultShare = function (option) {
    this.defaultShareOption = option;
}

// 设置分享
WxSdk.prototype.configShare = function (option) {

    var wxsdk = this;
    var option = option || {};

    var title = option.title || this.defaultShareOption.title,
        desc = option.desc || this.defaultShareOption.desc,
        link = option.link || this.defaultShareOption.link,
        imgUrl = option.imgUrl || this.defaultShareOption.imgUrl;

    // console.log('配置分享');
    // console.log(title);
    setShare();
    wxsdk.onReady(() => {
        setShare();
    })

    function setShare() {
        console.log('set share');
        // 由于立即执行在回调中调用接口会报network error，回调加了300ms延迟执行
        wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: link,
            imgUrl: handleLocalImgUrl(imgUrl),
            success: function () {
                wxsdk.onShareSuccess && setTimeout(() => { wxsdk.onShareSuccess('appMessage') }, 300);
            },
            cancel: function () {
                wxsdk.onShareCancel && setTimeout(() => { wxsdk.onShareCancel('appMessage') }, 300);
            }
        });

        wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl: handleLocalImgUrl(imgUrl),
            success: function () {
                wxsdk.onShareSuccess && setTimeout(() => { wxsdk.onShareSuccess('timeline') }, 300);
            },
            cancel: function () {
                wxsdk.onShareCancel && setTimeout(() => { wxsdk.onShareCancel('timeline') }, 300);
            }
        });

    }

}

// 打开分享菜单 
WxSdk.prototype.openShareMenu = function () {
    this.onReady(function () {
        console.log('open share menu');
        this.shareMenuVisiable = true;
        wx.showMenuItems({
            // menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook', 'menuItem:share:QZone'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
    });
}

// 关闭分享菜单
WxSdk.prototype.hideShareMenu = function () {
    this.onReady(function () {
        console.log('hide share menu');
        this.shareMenuVisiable = false;
        wx.hideMenuItems({
            menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook', 'menuItem:share:QZone'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
    });
}

// 关闭别的浏览器打开
WxSdk.prototype.hideOuterBrowser = function () {
    this.onReady(function () {
        wx.hideMenuItems({
            menuList: ['menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:copyUrl']
        });
    });
}

// 打开在别的浏览器打开菜单
WxSdk.prototype.openOuterBrowser = function () {
    this.onReady(function () {
        wx.showMenuItems({
            menuList: ['menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:copyUrl']
        });
    });
}

WxSdk.prototype.getLocation = function () {

    return new Promise((resolve, reject) => {

        this.onReady(function () {
            if (isWechat() && window.wx) {
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        resolve({
                            latitude: latitude,
                            longitude: longitude
                        });
                    },
                    fail: function (err) {
                        reject(err);
                    },
                    cancel: function (err) {
                        reject(err);
                    }
                });
            } else {
                resolve({
                    latitude: "31.2402",
                    longitude: "121.49302",
                })
            }
        });
    })


}

// 授权登陆
WxSdk.prototype.authReload = function (url, params) {
    var wxsdk = this;
    var url = url || '';

    Object.keys(params).forEach(function (key, index) {
        var value = params[key];

        if (index === 0) {
            url += `?${key}=${value}`;
        } else {
            url += `&${key}=${value}`;
        };
    });
    // 配置授权链接
    var authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxsdk.configOptions.appId}&redirect_uri=${wxsdk.redirectUri}&response_type=code&scope=snsapi_userinfo&state=${url}#wechat_redirect`;

    // console.log(url, authUrl);
    window.location.href = authUrl;
}

var wxsdk = new WxSdk();
wxsdk.hideShareMenu();
wxsdk.hideOuterBrowser();

var install = function (Vue, options) {

    Vue.prototype.$wxsdk = wxsdk;
    setTimeout(() => {
        if (wxsdk.defaultShareOption) {
            wxsdk.configShare(wxsdk.defaultShareOption);
            wxsdk.openShareMenu();
        } else {
            wxsdk.hideShareMenu();
        } 
    }, 500);


    // Vue.mixin({
    //     beforeRouteEnter(to, from, next) {
    //         next();
    //     },
    //     beforeMount: function () {
    //         setTimeout(() => {
    //             if (('shareVisiable' in this.$options) && this.$options.shareVisiable === false) {  // 如果options中存在 shareVisiable 这个属性 并且是false
    //                 wxsdk.hideShareMenu();
    //             } else if (this.$options.shareOption) {
    //                 wxsdk.configShare(this.$options.shareOption);
    //                 wxsdk.openShareMenu();
    //             } else if (wxsdk.defaultShareOption) {
    //                 wxsdk.configShare(wxsdk.defaultShareOption);
    //                 wxsdk.openShareMenu();
    //             } else {
    //                 wxsdk.hideShareMenu();
    //             }
    //         }, 100);
    //     },
    //     mounted: function () {

    //     }
    // });
}

export default {
    install: install
};

// `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3d9f8ae1546fdea0&`
// `redirect_uri=http://healthtest.minshenglife.com/rest/v0/winxinoauth/lianjiaopenid&response_type=code&scope=snsapi_userinfo&`
// `state=http://activitytest.minshenglife.com/lottery/index.html?isShare=true&redirect_path=#wechat_redirect`

function parseUrl(queryKey) {
    var search = location.search;

    if (search.length > 0 && search.indexOf('?') > -1) {
        search = search.substring(1);
        var cArr = search.split('&');

        for (var i = 0, len = cArr.length; i < len; i++) {
            var item = cArr[i],
                key = cArr[i].split('=')[0],
                val = cArr[i].split('=')[1];

            if (key === queryKey) {
                return val;
            }
        }
    }

    return null;
}

function deleteUrlQuery(queryKey) {
    var search = location.search;
    var resSearch = '';
    var queryArr = [].concat(queryKey);

    if (search.length > 0 && search.indexOf('?') > -1) {
        search = search.substring(1);
        var cArr = search.split('&');

        for (var i = 0, len = cArr.length; i < len; i++) {
            var item = cArr[i],
                key = cArr[i].split('=')[0],
                val = cArr[i].split('=')[1];

            if (queryArr.indexOf(key) === -1) {
                if (resSearch.length == 0) {
                    resSearch += `?${key}=${val}`;
                } else {
                    resSearch += `&${key}=${val}`;
                }
            }
        }
    }

    return location.origin + location.pathname + resSearch;
}

function insertUrlQuery(params) {
    var search = location.search;

    Object.keys(params).forEach((key) => {
        var val = params[key];

        if (search.length == 0) {
            search += `?${key}=${val}`;
        } else {
            search += `&${key}=${val}`;
        }
    });

    return location.origin + location.pathname + search;
}

//处理微信分享页面的图片url问题
//webpack的url-loader里图片大小，小于10kB的是base64格式，大于10kB的是./static/格式
function handleLocalImgUrl(url) {
    url = url + '';
    //服务器绝对路径
    if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1) {
        return url;
    }
    //本地图片
    if (url.indexOf('data:image') !== -1) {
        // base64 图片操作
        return url;
    } else {
        //path 图片操作
        url = './' + url
        let u = location.origin + location.pathname;
        let lastIndex = u.lastIndexOf('/');
        let imgUrlOri = u.slice(0, lastIndex);

        if (url[0] == '.') {
            return imgUrlOri + url.slice(1);
        } else {
            return imgUrlOri + url;
        }

    }
}