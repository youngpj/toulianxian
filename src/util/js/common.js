import moment from 'moment'
function isPhoneNo(tel) {
    if (!tel) return false;
    var pattern = /^1[23456789]\d{9}$/;
    return pattern.test(tel);
}
function isNameNo(str) {
    let pattern1 = /^[\u4e00-\u9fa5][\u4e00-\u9fa5(\.|·)]{0,30}[\u4e00-\u9fa5]+$/;
    let pattern2 = /(\.|·){2}/;
    return pattern1.test(str) && !pattern2.test(str);
}
function isEmailNo(value) {
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return myreg.test(value);
}
function isAddressNo(value) {
    return value.length > 5 && value.length < 51
}
function isCardNoa() {
    // 身份证号码验证
    // 验证身份证
    var powers = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"];
    var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");

    return function (_id) {
        _id = _id.toUpperCase();
        if (_id.length != 18) {
            return false;
        }
        // var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        // return pattern.test(card);
        _id = _id + "";
        var _num = _id.substr(0, 17);
        var _parityBit = _id.substr(17);
        var _power = 0;
        for (var i = 0; i < 17; i++) {
            //校验每一位的合法性

            if (_num.charAt(i) < "0" || _num.charAt(i) > "9") {
                return false;
                break;
            } else {
                //加权

                _power +=
                    parseInt(_num.charAt(i)) * parseInt(powers[i]);
                // //设置性别
                // if (i == 16 && parseInt(_num.charAt(i)) % 2 == 0) {
                // sex = "female";
                // } else {
                // sex = "male";
                // }
            }
        }
        //取模
        var mod = _power % 11;
        console.log(_id, parityBit[mod], _parityBit);
        if (parityBit[mod] == _parityBit) {
            return true;
        }
        return false;
    };
};
function isBankNo(str) {
    var pattern = /^[1-9]\d{9,29}$/;
    return pattern.test(str);
}
function isCodeNo(str) {
    var pattern = /^\d{4,8}$/;
    return pattern.test(str);
}
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
var isCardNo = isCardNoa();
function getAge(date, one = false) {
    if(date.length>15){
        date=new Date(date.substr(6, 4) + '/' + date.substr(10, 2) + '/' + date.substr(12, 2));
    }
    var birthDate = moment(date);
    var birthTime = new Date(date).getTime();
    var now = new Date();
    var nowDate = one ? moment(Date.now() + (1000 * 60 * 60 * 24)) : moment(Date.now());
    var nowTime = new Date(nowDate).getTime();
    var age = 0;
    var ageDate = 0;

    if (birthDate.year() > nowDate.year()) {
        return null;
    } else if ((birthDate.month() < nowDate.month()) || (birthDate.month() === nowDate.month() && birthDate.date() <= nowDate.date())) {
        age = nowDate.year() - birthDate.year();
        ageDate = Math.floor((nowTime - new Date(`${nowDate.year()}/${birthDate.month() + 1}/${birthDate.date()}`).getTime()) / (1000 * 60 * 60 * 24));
    } else {
        age = nowDate.year() - birthDate.year() - 1;
        ageDate = Math.floor((nowTime - new Date(`${nowDate.year() - 1}/${birthDate.month() + 1}/${birthDate.date()}`).getTime()) / (1000 * 60 * 60 * 24));
    }
    return {
        age,
        ageDate
    };
}
//防抖
const debounce = (fn, ms) => {
    let timer;
    return function (...args) {
        console.log(fn);
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
            clearTimeout(timer)
        }, ms);
    }
}
function getDynamic(obj, code, key) {
    if(!obj)return null
    var arr = obj.filter(item => item.code == code)
    return arr.length > 0 ? arr[0][key] : ""
};
export {
    isCardNo, isAddressNo, isEmailNo, isNameNo, isPhoneNo, isCodeNo,isBankNo, setCookie, getCookie, delCookie, getAge, debounce,getDynamic
}