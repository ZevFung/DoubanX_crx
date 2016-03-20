'use strict';

class YouKu {
    constructor() {
        this.isYouku = window.location.host === 'v.youku.com';
        this.page = {
            video: window.location.pathname.indexOf('/v_show/') === 0 &&
                   $.trim($('.crumbs a').eq(0).text()) === ('电影' || '电视剧')
        }
    }

    main() {
        if (this.isYouku && this.page.video) {
            new DoubanX({
                name: $('h1.title a').text(),
                type: 'movie'
            }).getRate();
        }

    }
}

new YouKu().main();
