'use strict';

class Iqiyi {
    constructor() {
        this.isIqiyi = window.location.host === 'www.iqiyi.com';
        this.page = {
            video: window.location.pathname.indexOf('/v_') === 0
        }
    }

    main() {
        if (this.isIqiyi && this.page.video) {
            new DoubanX({
                name: $('#widget-videotitle').text(),
                type: 'movie'
            }).getRate();
        }

    }
}

new Iqiyi().main();
