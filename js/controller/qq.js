'use strict';

class QQ {
    constructor() {
        this.isFilm = window.location.host === 'film.qq.com';
        this.isVideo = window.location.host === 'v.qq.com';
        this.page = {
            video: $('#mod_player').length > 0,     // 播放页
            tv: ($('#mod_player').length > 0) &&
                ($('.album_list li').length > 0),   // 电视剧
            movie: ($('#mod_player').length > 0) &&
                ($('.album_list li').length === 0)  // 电影
        };
    }

    main() {
        if (this.isFilm && this.page.movie) {
            new DoubanX({
                name: $('.player_title').text(),
                type: 'movie'
            }).getRate();
        }

        if (this.isFilm && this.page.tv) {
            new DoubanX({
                name: $('.album_title').text(),
                type: 'movie'
            }).getRate();
        }

        if (this.isVideo && this.page.tv) {
            new DoubanX({
                name: $('h3.title_inner').text(),
                type: 'movie'
            }).getRate();
        }

        if (this.isVideo && this.page.movie) {
            new DoubanX({
                name: $('.title_text').text(),
                type: 'movie'
            }).getRate();
        }
    }
}

new QQ().main();
