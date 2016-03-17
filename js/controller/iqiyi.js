'use strict';

class Iqiyi {
    constructor() {
        this.isMovie = window.location.host === 'www.iqiyi.com';
        this.page = {
            video: window.location.pathname.indexOf('/v_') === 0
        }
    }

    main() {
        if (this.isMovie && this.page.video) {
            let iqiyi = new DoubanX({
                name: $('#widget-videotitle').text(),
                type: 'movie'
            });
            iqiyi.getRate((data) => {
                $('body').addClass('doubanx_iqiyi');
                $('.mod-source').prepend(
                    new Template(data).typeA()
                );
            });
        }

    }
}

new Iqiyi().main();
