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
        let qq = null;

        if (this.isFilm && this.page.movie) {
            qq = new DoubanX({
                name: $('.player_title').text(),
                type: 'movie'
            });
            qq.getRate((data) => {
                $('.douban').remove();
                $('.player_title').after(
                    new Template(data).typeA()
                );
            });
        }

        if (this.isFilm && this.page.tv) {
            qq = new DoubanX({
                name: $('.album_title').text(),
                type: 'movie'
            });
            qq.getRate((data) => {
                $('.douban').remove();
                $('.film_name').after(
                    new Template(data).typeA()
                );
            });
        }

        if (this.isVideo && this.page.tv) {
            qq = new DoubanX({
                name: $('h3.title_inner').text(),
                type: 'movie'
            });
            qq.getRate((data) => {
                $('.douban').remove();
                $('.mod_player_head').after(
                    new Template(data).typeA()
                );
            });
        }

        if (this.isVideo && this.page.movie) {
            qq = new DoubanX({
                name: $('.title_text').text(),
                type: 'movie'
            });
            qq.getRate((data) => {
                $('.mod_player_head').append(
                    new Template(data).typeA()
                );
            });
        }
    }
}

new QQ().main();
