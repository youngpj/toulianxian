class Hmt {
    constructor(_hmt) {
        this._hmt = _hmt;
    }

    trackEvent(desc, targetType, eventType) {
        if (!this._hmt) return;

        var hmt = this._hmt;
        var targetType = targetType || 'button';
        var eventType = eventType || 'click';
        var desc = desc || '';

        !!desc && console.log('track event -->' + desc);
        !!desc && hmt.push(['_trackEvent', targetType, eventType, desc]);
    }
}
Hmt.prototype.trackEvent2 = function(page, event) {
    // _hmt.push(['_trackEvent', page, 'click', event])
    v.$acMonitor.trackEvent({
        page,
        event
    })
}
Hmt.prototype.trackPageview2 = function(page) {
    v.$acMonitor.trackEvent({
        page: page
    });
    // _hmt.push(['_trackPageview', page]);
}

let $hmt = new Hmt(window._hmt);

let install = function(Vue, options) {
    Vue.prototype.$hmt = $hmt;
    // 百度统计的pv，uv
    Vue.mixin({
        beforeRouteEnter(to, from, next) {
        //     var path = to.fullPath;
        //     if (to.fullPath == '/') {
        //         path += 'index';
        //     };

        //     !!window._hmt && _hmt.push(['_trackPageview', location.pathname + '/#' + path]);

        if (to.meta.maidian) {
            $hmt.trackPageview2('/'+to.meta.maidian);
        } 
    
        

            next();
        },
        methods: {
            trackEvent: function(desc, targetType, eventType) {
                return $hmt.trackEvent(desc, targetType, eventType);
            }
        }
    });
};

export default {
    install: install
};