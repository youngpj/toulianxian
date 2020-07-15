import shareIcon from '@/assets/img/shareicon.jpg'
import {parseUrl,getShareSource} from './util/js/utils'
let isProduct=process.env.VUE_APP_BUILD_TYPE=='production';
var source =getShareSource('source');
let myUrl=isProduct?`http://www.msjk95596.com/act/wechat/base/access_token/?state=http://www.msjk95596.com/my/index.html`:
`http://test.msjk95596.com/act/wechat/base/access_token/?state=http://test.msjk95596.com/my/index.html`;
let queryUrl = isProduct?'http://activity.minshenglife.com/i/query/index.html':'http://activitytest.minshenglife.com/i/web1/index.html';
export default {
    // projectTitle: '',
     storageScope: 'toulianxian',
    defaultShareOption: {//分享内容
        title: '民生小目标', 
        desc: '为实现“小目标”助力，适合长期拥有',
        imgUrl: shareIcon,
        link: `${location.origin}${location.pathname}?source=${source}`
    },
    domain: isProduct?'':'', //url 前缀
    isProduct,//是否为生产
    productCode:'513404',//产品code
    project_name:'sh_recruit',//用于埋点的
    myUrl:myUrl,
    msurl:isProduct?'http://www.msjk95596.com':'http://test.msjk95596.com',
    httpsMsurl:isProduct?'https://www.msjk95596.com':'http://test.msjk95596.com',
    queryUrl:queryUrl
}


