<template>
    <div>
        <div class="captcha-modal" v-show="captchaVisiable">
            <div class="overlay"></div>
            <div class="captcha-container">
                <div class="captcha-title">请输入图形验证码</div>
                <div class="captcha-input-container">
                    <input v-resetInput type="text" placeholder="" v-model="captchaCode" id='captcha-input' />
                    <div class="pic-container">
                        <img :src="captchaImg" alt="">
                    </div>
                </div>
                <div class="captcha-btn" @click="sendSmsCode">确定</div>
                <img src="./close.png" alt="" class="captcha-close-btn" @click="captchaVisiable = false;">
                <img src="./refresh.png" alt="" class="captcha-refresh-btn" @click="createCaptcha">
            </div>
        </div>
    </div>
</template>
<script>
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
import config from "@/config";
import { getCaptchaImage,viladateCaptcha } from "@/api";
export default {
    data: function() {
        return {
            captchaVisiable: false,
            captchaImg: "",
            captchaCode: "",
            phone: "",
            callback: ""
        };
    },
    created() {
        this.createCaptcha();
    },
    mounted() {},
    props: [],
    methods: {
        createCaptcha() {
            getCaptchaImage({
                params: {},
                responseType: "arraybuffer"
            }).then(res => {
                    this.captchaImg = "data:image/png;base64," + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ""));
            }).catch(e=>{
                this.$toast('图形验证码获取失败')
            });
        },
        sendSmsCode: function() {
            if (!this.captchaCode) {
                this.$message.toast("请输入图形验证码");
                return;
            }
            this.$showLoading();
            viladateCaptcha(this.phone,this.captchaCode)
                .then(res => {
                    if (res.data.returnCode == "SUCCESS") {
                        this.captchaVisiable = false;
                        this.callback && this.callback();
                    } else {
                        this.$toast(res.data.errorMsg);
                        this.createCaptcha();
                    }
                    this.$hideLoading();
                })
                .catch(err => {
                    this.$hideLoading();
                    this.captchaVisiable = false;
                    this.$message.toast(err.response.data.ErrorMsg);
                });
        }
    }
};
</script>
<style scoped>
.captcha-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.captcha-modal .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
}

.captcha-container {
    position: absolute;
    width: 8.186667rem;
    border-radius: 0.106667rem;
    background-color: #fff;
    top: 50%;
    left: 50%;
    padding: 0.346667rem 0.266667rem 0.4rem 0.8rem;
    transform: translate(-50%, -50%);
    margin-bottom: 0.56rem;
}

.captcha-title {
    font-size: 0.48rem;
    line-height: 0.666667rem;
    color: #333333;
    text-align: center;
    margin: 0 auto 0.613333rem;
}

.captcha-input-container {
    position: relative;
    height: 1.066667rem;
    width: 6.3rem;
}

.captcha-input-container input {
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    outline: none;
    height: 100%;
    width: 3.466667rem;
    border: 1px solid #e6e6e7;
    padding: 0.346667rem 0.586667rem;
    font-size: 0.426667rem;
}

.captcha-input-container .pic-container {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 2.56rem;
    border-left: 1px solid #e5e5e5;
}

.captcha-input-container .pic-container img {
    width: 100%;
    height: 100%;
}

.captcha-btn {
    background: linear-gradient(180deg, rgba(255, 190, 81, 1) 0%, rgba(253, 137, 40, 1) 100%);
    border-radius: 0.493333rem;
    font-size: 0.373333rem;
    color: #ffffff;
    width: 3.733333rem;
    height: 1.013333rem;
    line-height: 1.013333rem;
    margin: 0.586667rem auto 0;
    letter-spacing: 0;
    text-align: center;
}

img.captcha-close-btn {
    position: absolute;
    top: 0.346667rem;
    width: 0.426667rem;
    right: 0.213333rem;
    top: 0.213333rem;
    z-index: 1;
    cursor: pointer;
}

img.captcha-refresh-btn {
    position: absolute;
    top: 1.893333rem;
    width: 0.533333rem;
    right: 0.346667rem;
}
</style>