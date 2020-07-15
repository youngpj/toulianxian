import Http from '@/plugins/modules/http'
let http=Http.http
// 注意 个人中心的接口 业务逻辑错误返回的是200 ,staget业务逻辑错误不是200
//题目 和提交答案
export const getQuestion=(params={})=>{
    return http.get('/rest/v0/riskassessment/getAllQuestion')
}
export const answerQuestion=(params={})=>{
    return http.post('/rest/v0/riskassessment/answerQuestion',params)
}
//中国税收居民

export const confirmCRS=(params={})=>{
    return http.post('/rest/v0/invest/confirmCRS/1',params)
}
// 渠道限额
export const banklimit=(params={})=>{
    return http.get('/rest/v0//banklimit/getAll')
}
//银行卡鉴权 .签约申请.签约确认
export const idnumSearch=(params={})=>{
    return http.post('/rest/v0/bankTrusteeship/search',params)
}
export const idnumApply=(params={})=>{
    return http.post('/rest/v0/bankTrusteeship/apply',params)
}
export const idnumConfirm=(params={})=>{
    return http.post('/rest/v0/bankTrusteeship/confirm',params)
}
//下单
export const proposal=(params={})=>{
    return http.post('/rest/v0/policies/proposalForInvest',params)
}
//验证码图片

export const getCaptchaImage=(params={})=>{
    return http.get('/rest/v0/sms/getCaptchaImage',params)
}
//发短信
export const viladateCaptcha=(phone,captchaCode,params={})=>{
    return http.get(`/rest/v0/sms/captcha/${phone}/${captchaCode}`,params)
}
//验证验证码正确
export const viladatePhone=(phone,captchaCode,params={})=>{
    return http.get(`/rest/v0/sms/verify/${phone}/${captchaCode}`,params)
}
// 固定token查询保单详情
export const proposalNumberToken=(proposalNumberToken,params={})=>{
    return http.get(`/cms/api/policy/PolicyDetail/v2/${proposalNumberToken}`,params)
}
//查询my
export const getUser=(params={})=>{
    return http.get('/cms/api/user/my/WX',params)
}
//上传图片
export const fileOcr=(type,params={})=>{
    return http.post(`/ins/api/facade/file/ocr?ocrType=${type}&materialType=ID`,params)
}
//上传身份证orc，fileid
export const ocredUpdate=(params={})=>{
    return http.post('/cms/api/user/ocredUpdate',params)
}
//身份证过期  上传接口
export const ocredUpdateTermOfvalidity=(params={})=>{
    return http.post('/cms/api/user/ocredUpdateTermOfvalidity',params)
}
//查询净值
export const getNetWorth =(params={})=>{
    return http.get('/rest/v0/invest/investNetTrend',{params})  
}
export const checkJoined =(idnum,params={})=>{
    return http.get(`/rest/v0/policies/queryExistInvestPolicy/${idnum}`,params)
}

