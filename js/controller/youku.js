'use strict';

class YouKu {
    constructor() {
        this.isMovie = window.location.host === 'v.youku.com';
    }

    main() {
        if (this.isMovie) {
            let youku = new DoubanX({
                name: $('h1.title a').text(),
                type: 'movie'
            });
            youku.getRate((data) => {
                $('body').addClass('doubanx_youku');
                $('h1.title').after(
                    new Template(data).typeA()
                );
            });
        }

    }
}

new YouKu().main();
