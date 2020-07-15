var install = function(Vue, options) {

    var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
    Vue.directive('resetInput', {
        inserted: function (el) {
            if(isAndroid){
                    return
            } 
            el.addEventListener('blur',function(){
               
                var currentPosition, timer;
                var speed = 1; //页面滚动距离
                timer = setInterval(function() {
                    currentPosition =
                        document.documentElement.scrollTop ||
                        document.body.scrollTop;
                    currentPosition -= speed;
                    window.scrollTo(0, currentPosition); //页面向上滚动
                    currentPosition += speed; //speed变量
                    window.scrollTo(0, currentPosition); //页面向下滚动
                    clearInterval(timer);
                }, 1);
            })
                  
            

        }
    })
}

export default {
    install: install
};