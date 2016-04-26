class Iqiyi {
    constructor() {
        this.isIqiyi = window.location.host === 'www.iqiyi.com';
        this.page = {
            video: (window.location.pathname.indexOf('/v_') === 0 ||
                   window.location.pathname.indexOf('/dianying/') === 0) &&
                   $('.videoArea').length !== 0
        };
    }

    main() {
        if (this.isIqiyi && this.page.video) {
            new DoubanX({
                name: $('#widget-videotitle').text(),
                type: 'movie'
            }).getRate();
        }

        Common.listHandle(
            /(^http:\/\/(www|vip|so)\.iqiyi\.com)*\/(v_|a_|dianying|so|\d+)/i,
            '.search_result_side li, .wrapper-piclist[data-widget-listviptip] li, .mod-topList li, #teleplayChannel li, .wrapper-cols[data-block-name] li, .site-main-outer li',
            'movie'
        );
    }
}

new Iqiyi().main();
