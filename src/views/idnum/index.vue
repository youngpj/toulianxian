<template>
    <div id="page" class="page view" ref='page'>
        <div>
            <!-- <hint v-if='state!=3'>
                为用户信息安全需实名认证<br/> 请确保上传信息为本人信息，并信息正确无误，认证通过后信息将无法修改
            </hint> -->
            <div>
                <div class="idCardBox">
                    <div class="idCardTitle">拍摄并上传您的身份证照</div>
                    <div class="idCardSubTitle">
                        *请确保上传信息为本人信息，且信息正确无误， 认证通过后信息将无法修改
                    </div>
                    <div class="idcardBox flex-between">
                        <div class="idPicFront idcard">
                            <div class="failed flex-center flex-jcenter" v-if='userIdImg.IDPICFRONT==2'>
                                上传失败！<br/> 身份证照片不清晰
                            </div>
                            <img :src="frontImg">
                            <input v-resetInput name="file1" id="idPicFront" accept="image/*" ref='idPicFront' type="file" @change="selectImgs('front')">
                            <p :class='{active:userIdImg.IDPICFRONT}'>{{userIdImg.IDPICFRONT?"点击重新上传":"点击拍摄人像面"}}</p>
                        </div>
                        <div class="idPicBack idcard">
                            <div class="failed flex-center flex-jcenter" v-if='userIdImg.IDPICBACK==2'>
                                上传失败！<br/> 身份证照片不清晰
                            </div>
                            <img :src="backImg">
                            <input v-resetInput name="file1" accept="image/*" id="idPicBack" ref='idPicBack' type="file" @change="selectImgs('back')">
                            <p :class='{active:userIdImg.IDPICBACK}'>{{userIdImg.IDPICBACK?"点击重新上传":"点击拍摄国徽面"}}</p>
                        </div>
                    </div>
                </div>
                <div class="itemTitle flex-between">
                    请确认以下信息，如有误请重新上传图片
                </div>
                <div class="item flex">
                    <div class="label">
                        姓名
                    </div>
                    <div class="value" :class='{active:userInfo.name}'>
                        {{userInfo.name||'请上传身份证照片'}}
                    </div>
                </div>
                <div class="item flex">
                    <div class="label">
                        证件号码
                    </div>
                    <div class="value" :class='{active:userInfo.idNum}'>
                        {{userInfo.idNum||'请上传身份证照片'}}
                    </div>
                </div>
                <div class="item flex">
                    <div class="label">
                        证件有效期
                    </div>
                    <div class="value" :class='{active:userInfo.idValidity}'>
                        {{userInfo.idValidity||'请上传身份证照片'}}
                    </div>
                </div>
                <div class='save-btn'>
                    <div class='btn' :class='{active:allright}' @click='submitData'>
                        确认
                    </div>
                </div>
            </div>
            <div class='modal' v-if='sucBox'>
                <div class="successBox">
                    <div class="close" @click='sucBox=false'></div>
                    <img src="~img/renzheng.png" alt="">
                    <p>认证成功！</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style> 
<style >
</style>