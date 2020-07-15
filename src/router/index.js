import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    name: 'home',
    meta:{
        title:'民生小目标',
        maidian:'landingpage'
    },
    component: () => import(/* webpackChunkName: "home" */ '../views/home')
  },
  {
    path: '/trajectory',
    name: 'trajectory',
    meta:{
        title:'业绩走势'
    },
    component: () => import(/* webpackChunkName: "trajectory" */ '../views/trajectory')
  },
  {
    path: '/question/:id',
    name: 'question',
    meta:{
        title:'风险测评'
    },
    component: () => import(/* webpackChunkName: "question" */ '../views/question')
  },
  {
    path: '/appraisal',
    name: 'appraisal',
    meta:{
        title:'风险测评',
        maidian:'evaluation'

    },
    component: () => import(/* webpackChunkName: "appraisal" */ '../views/appraisal')
  },
  {
    path: '/faxid',
    name: 'faxid',
    meta:{
        title:'风险测评'
    },
    component: () => import(/* webpackChunkName: "faxid" */ '../views/faxid')
  },
  {
    path: '/idnum',
    name: 'idnum',
    meta:{
        title:'实名认证',
        maidian:'authentication'

    },
    component: () => import(/* webpackChunkName: "idnum" */ '../views/idnum')
  },
  {
    path: '/insuremoney',
    name: 'insuremoney',
    meta:{
        title:'投保金额',
        maidian:'money'

    },
    component: () => import(/* webpackChunkName: "insureMoney"*/ '../views/insureMoney/index')
  },
  {
    path: '/insureinfo',
    name: 'insureinfo',
    meta:{
        title:'投保信息',
        maidian:'information'

    },
    component: () => import(/* webpackChunkName: "insureinfo" */ '../views/insureInfo') 
  }, 
  {
    path: '/confirm',
    name: 'confirm',
    meta:{
        title:'投保确认',
        maidian:'landingpage'

    },
    component: () => import(/* webpackChunkName: "confirm" */ '../views/confirm') 
  }, 
  {
    path: '/result/success',
    name: 'success',
    meta:{
        title:'民生小目标',
        maidian:'done'

    },
    component: () => import(/* webpackChunkName: "result" */ '../views/result') 
  }, 
  {
    path: '/result/fail',
    name: 'fail',
    meta:{
        title:'民生小目标',

    },
    component: () => import(/* webpackChunkName: "result" */ '../views/result') 
  }, 
  {
    path: '/shouquan',
    name: 'shouquan',
    meta:{
        title:'个人授权及声明'
    },
    component: () => import(/* webpackChunkName: "shouquan" */ '../views/shouquan') 
  }, 
  {
    path: '/xuzhi',
    name: 'xuzhi',
    meta:{
        title:'投保须知'
    },
    component: () => import(/* webpackChunkName: "xuzhi" */ '../views/xuzhi') 
  }, 
]

const router = new VueRouter({
  mode: 'hash',
//   base: process.env.BASE_URL,
  routes
})

export default router
