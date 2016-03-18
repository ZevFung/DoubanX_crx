'use strict';

class YouKu {
    constructor() {
        this.isYouku = window.location.host === 'v.youku.com';
    }

    main() {
        if (this.isYouku) {
            new DoubanX({
                name: $('h1.title a').text(),
                type: 'movie'
            }).getRate();
        }

    }
}

new YouKu().main();
