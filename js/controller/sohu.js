'use strict';

class Sohu {
    constructor() {
        this.isVideo = (window.location.host === 'tv.sohu.com') &&
                       ($('#sohuplayer').length > 0);
        this.isMovie = (window.location.host === 'film.sohu.com') &&
                       ($('#playerWrap').length > 0);
    }

    main() {
        if (this.isVideo) {
            new DoubanX({
                name: $('meta[name="album"]').attr('content'),
                type: 'movie'
            }).getRate();
        }

        if (this.isMovie) {
            new DoubanX({
                name: $('.player-top-info-name h2').text(),
                type: 'movie'
            }).getRate();
        }
    }
}

new Sohu().main();
