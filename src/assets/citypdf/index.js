// import upperFirst from 'lodash/upperFirst'
// import camelCase from 'lodash/camelCase'
//  const requireComponent = require.context('./modules', false, /.(pdf)$/)
//  let obj={}
//  requireComponent.keys().forEach(fileName => {
//   // 获取组件配置
//   const componentConfig = requireComponent(fileName)
//   obj[fileName.match(/\.\/(\S*?)\.pdf/)[1]]=componentConfig

// })
import beijing from "./modules/beijing.pdf";
import tianjing from "./modules/tianjing.pdf";
import hebei from "./modules/hebei.pdf";
import shanxi from "./modules/shanxi.pdf";
import neimenggu from "./modules/neimenggu.pdf";
import liaoning from "./modules/liaoning.pdf";
// import jilin from "./modules/jilin.pdf";
 import heilongjing from "./modules/heilongjiang.pdf";
import shanghai from "./modules/shanghai.pdf";
import jiangsu from "./modules/jiangsu.pdf";
import zhejiang from "./modules/zhejiang.pdf";
import anhui from "./modules/anhui.pdf";
import fujian from "./modules/fujian.pdf";
import jiangxi from "./modules/jiangxi.pdf";
import shandong from "./modules/shandong.pdf";
import henan from "./modules/henan.pdf";
import hubei from "./modules/hubei.pdf";
import hunan from "./modules/hunan.pdf";
import guangdong from "./modules/guangdong.pdf";
import guangxi from "./modules/guangxi.pdf";
// import hainan from "./modules/hainan.pdf";
import chongqing from "./modules/chongqing.pdf";
import sichuan from "./modules/sichuan.pdf";
import dalian from "./modules/dalian.pdf";
import ningbo from "./modules/ningbo.pdf";
// import guizhou from "./modules/guizhou.pdf";
// import yunnan from "./modules/yunnan.pdf";
// import xizang from "./modules/xizang.pdf";
import shanxi3 from "./modules/shanxi3.pdf";
// import gansu from "./modules/gansu.pdf";
// import qinghai from "./modules/qinghai.pdf";
// import ningxia from "./modules/ningxia.pdf";
// import xinjiang from "./modules/xinjiang.pdf";
import xiamen from "./modules/xiamen.pdf";
let citysUrl = {
    110000: beijing, 120000: tianjing, 130000: hebei, 140000: shanxi, 150000: neimenggu, 210000: liaoning, 
    310000: shanghai, 320000: jiangsu, 330000: zhejiang, 340000: anhui, 350000: fujian, 360000: jiangxi, 370000: shandong, 410000: henan, 420000: hubei,
    430000: hunan, 440000: guangdong, 450000: guangxi,  500000: chongqing, 510000: sichuan, 
    610000: shanxi3,330200:ningbo,210200:dalian, 230000: heilongjing,350200:xiamen
    // 220000: jilin,460000: hainan,520000: guizhou, 530000: yunnan, 540000: xizang, 620000: gansu, 630000: qinghai, 640000: ningxia, 650000: xinjiang,
}
export default citysUrl


