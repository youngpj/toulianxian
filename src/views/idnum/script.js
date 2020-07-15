import config from '@/config.js';
// import datePickerGroup from '@/components/date-picker-group.vue';
import frontImg1 from "../../assets/img/idcard1.png";
import frontImg2 from "../../assets/img/idcard2.png";
import {
    isCardNo,
    isNameNo
} from "@/util/js/common.js";
import { fileOcr, ocredUpdate, ocredUpdateTermOfvalidity } from '@/api'
export default {
    data() {
        return {
            pageShow: false,
            frontClose: false,
            backClose: false,
            ocrData: "",
            frontImg: frontImg1,
            backImg: frontImg2,
            userIdImg: { //设置的图片识别状态 1成功 2 失败
                IDPICFRONT: '',
                IDPICBACK: ''
            },
            headImgUrl: '',
            userData: {
                name: '',
                idNum: '',
                idValidity: '',
            },
            userInfo: {
                name: '',
                idNum: '',
                idValidity: '',
                frontFileId: '',
                backFileId: '',
            },
            dateOpt: {
                startDate: new Date(),
                endYear: 20
            },
            userid: '',
            state: 0, //页面状态 
            allDirty: false,
            allright: false,//上传身份证信息完整
            idRight: false,// 直接修改信息 正确
            sucBox: false,
            userInfoSession: {},
        }


    },
    created: function (data) {
        this.userInfoSession = this.$sessionStorage.getItem("userInfo");
        this.userid = this.userInfoSession && this.userInfoSession.id;
    },
    methods: {
        getValue(obj, code, key) {
            var arr = obj.filter(item => item.code == code)
            return arr.length > 0 ? arr[0][key] : ""
        },
        canvasDataURL(path, obj, callback) {

            let img = new Image();
            img.src = path;
            img.onload = function () {
                let that = this; //指到img
                // 默认按比例压缩
                let w = that.width,
                    h = that.height,
                    scale = w / h;
                w = obj.width || w;
                h = obj.height || (w / scale);
                let quality = 0.7; // 默认图片质量为0.7
                //生成canvas
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                // 创建属性节点
                let anw = document.createAttribute("width");
                anw.nodeValue = w;
                let anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
                // 图像质量
                if (obj.quality) {
                    quality = obj.quality;
                }
                // quality值越小，所绘制出的图像越模糊
                let base64 = canvas.toDataURL('image/jpeg', quality);
                // 回调函数返回base64的值
                callback(base64);

            }
        },
        base64UrlToBlob(urlData, fileName) {
            let arr = urlData.split(','),
                mime = arr[0].match(/:(.*?);/)[1], // 去掉url的头，并转化为byte
                bstr = atob(arr[1]), // 处理异常,将ascii码小于0的转换为大于0
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], fileName, {
                type: mime
            });
            //转file
            //return new File([u8arr], filename, {type:mime});
        },
        selectImgs(type) {
            let fileObj = event.target.files[0]  //获取file
            if (!fileObj) return;
            var form = new FormData();  // 创建FormData 对象
            var size = fileObj.size / 1024 / 1024;
            if (size > 3) { //文件大于1M（根据需求更改），进行压缩上传
                this.canvasDataURL(this.getObjectURL(event.target.files[0]), {
                    quality: (3 / size)
                }, (urlData) => {
                    var bl = this.base64UrlToBlob(urlData, "file_" + Date.parse(new Date()) + ".jpg")
                    console.log(bl, 'bl');
                    form.append("file", bl);
                    this.subIdCard(type, form)
                })
            } else { //小于等于1M 原图上传
                form.append("file", fileObj); // 文件对象
                this.subIdCard(type, form);   //请求图片上传接口
            }
        },
        subIdCard(type, form) {
            let eventTg = event.target
            this.$showLoading('上传中,请耐心等待');
            fileOcr(type, form)
                .then(res => {
                    let data = res.data;
                    if (data.code == '0000') {
                        var ocrData = JSON.parse(data.attachment.ocrData);
                        if (type == 'front' && data.attachment.ocrIdNum) {
                            this.frontImg = eventTg.src || this.getObjectURL(eventTg.files[0]);
                            this.frontClose = true;
                            this.userIdImg.IDPICFRONT = 1;
                            this.userInfo.name = ocrData.words_result.姓名.words
                            this.userInfo.idNum = data.attachment.ocrIdNum
                            this.userInfo.frontFileId = data.attachment.fileId
                        } else if (type == 'front') {
                            this.frontImg = eventTg.src || this.getObjectURL(eventTg.files[0]);
                            this.userInfo.name = ''
                            this.userInfo.idNum = ''
                            this.userIdImg.IDPICFRONT = 2;
                        }
                        if (type == 'back' && ocrData.words_result.失效日期.words) {
                            this.backImg = eventTg.src || this.getObjectURL(eventTg.files[0]);
                            this.backClose = true;
                            this.userIdImg.IDPICBACK = 1;
                            this.userInfo.idValidity = ocrData.words_result.失效日期.words === '长期' ? '长期' :this.$moment(ocrData.words_result.失效日期.words).format('YYYY-MM-DD')
                            this.userInfo.backFileId = data.attachment.fileId
                        } else if (type == 'back') {
                            this.backImg = eventTg.src || this.getObjectURL(eventTg.files[0]);
                            this.userInfo.idValidity = ''
                            this.userIdImg.IDPICBACK = 2;
                        }
                    } else {
                        console.log(type)
                        if (type == 'back'){ 
                            this.$message.alert('', '无法识别或身份证有效期过期了')
                         }else{
                            this.$message.alert('', '无法识别');
                        }
                    }
                    this.$hideLoading();
                })
                .catch(err => {
                    console.log(err);
                    this.$message.alert('', err.message);
                    this.$hideLoading();
                })
        },

        //判断两个都提交 state 是页面状态
        checkInfo() {
            var flag = false
            Object.values(this.userInfo).forEach((item, index) => {
                if (item == '') {
                    flag = true;
                }
            });
            this.state = flag ? '1' : '2';
        },

        //清空照片
        clearId(type) {
            if (type == 'front') {
                this.frontImg = frontImg1;
                this.userIdImg.IDPICFRONT = '';
                this.userInfo.name = ''
                this.userInfo.idNum = ''
                this.$refs.idPicFront.value = ''
            } else {
                this.backImg = frontImg2;
                this.userIdImg.IDPICBACK = '';
                this.userInfo.idValidity = ''
                this.$refs.idPicFront.idPicBack = ''
            }
        },
        getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        submitData() {
            if (!this.allright) {
                return;
            }
            if (this.userInfo.idValidity == '') {
                this.$toast('请上传身份证反面')
                return;
            } else if (this.userInfo.idNum == '') {
                this.$toast('请上传身份证正面')
                return;
            } else if (+this.$moment(this.userInfo.idValidity) < +new Date()) {
                this.$toast('您的身份证已过期')
                return;
            }
            var reqOpt = {
                "idValidTime": this.userInfo.idValidity === '长期' ? '9999-12-31' : this.userInfo.idValidity,
                "idnumber": this.userInfo.idNum,
                "name": this.userInfo.name,
                "id": this.userid,
                'bindIdNumber': 1,
                'userExtensions': [{
                    "code": "backFileId",
                    "value": this.userInfo.backFileId
                },
                {
                    "code": "frontFileId",
                    "value": this.userInfo.frontFileId
                }]
            }
            this.$showLoading();
            let upOcr = ocredUpdate;
            if (this.userInfoSession.frontFileId && (+this.$moment(this.userInfoSession.idValidTime) < +new Date()||!this.userInfoSession.idValidTime)) {//已认证但是已过期
                upOcr = ocredUpdateTermOfvalidity
            }
            upOcr(reqOpt).then(res => {
                if (res.data.code == '0') {
                    this.sucBox = true;
                    this.state = 3;
                    setTimeout(() => {
                        this.$router.push("/insureMoney");
                        this.sucBox = false
                    }, 2000)
                } else if (res.data.code == '-110') {
                    this.$message.alert('', '请上传本人身份证', () => {
                        window.location.reload()
                    })
                } else if (res.data.code == '-102') {
                    this.$message.alert('','与全部保单/理赔服务</br>已验证身份证号不符') 
                } else {                    
                    this.$toast(res.data.errorMsg)
                };
                this.$hideLoading()
            }).catch(e => {
                this.$hideLoading();
                //如果my 的接口报错 就存fildid ,直接到下个页面(my里面的接口不影响下单)
                if (e.response && e.response.status != '200') {
                    this.userInfoSession.frontFileId = this.userInfo.frontFileId;
                    this.userInfoSession.backFileId = this.userInfo.backFileId;
                    this.$sessionStorage.setItem("userInfo", this.userInfoSession);
                    this.$router.push("/insureMoney");
                }

            });
        },
        resetAll() {

        },
        checkAllRight() {
            if (this.userInfo.idNum == '' || this.userInfo.idValidity == '') {
                this.allright = false
            } else {
                this.allright = true
            }
        },
    },
    components: {
        // inputGroup,
        // datePickerGroup
    },
    watch: {
        'userInfo.idValidity'() {
            this.checkAllRight()
        },
        'userInfo.idNum'() {
            this.checkAllRight()
        },

    }
}