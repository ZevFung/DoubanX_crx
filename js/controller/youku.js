'use strict';

class YouKu {
    constructor() {
        this.isMovie = window.location.host === 'v.youku.com';
    }

    main() {
        if (this.isMovie) {
            new DoubanX({
                name: $('h1.title a').text(),
                type: 'movie'
            }).getRate();
        }

    }
}

new YouKu().main();
