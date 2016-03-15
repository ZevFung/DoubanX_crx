'use strict';

class QQ extends DoubanX {
    constructor(props) {
        super(props);
    }

}

QQ.isFilm = window.location.host === 'film.qq.com';
QQ.isVideo = window.location.host === 'v.qq.com';
QQ.page = {
    video: $('#mod_player').length > 0,     // 播放页
    tv: ($('#mod_player').length > 0) &&
    ($('.album_list li').length > 0),   // 电视剧
    movie: ($('#mod_player').length > 0) &&
    ($('.album_list li').length === 0)  // 电影
};

let qq = null;

if (QQ.isFilm && QQ.page.movie) {
    qq = new QQ({
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

if (QQ.isFilm && QQ.page.tv) {
    qq = new QQ({
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

if (QQ.isVideo && QQ.page.tv) {
    qq = new QQ({
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

if (QQ.isVideo && QQ.page.movie) {
    qq = new QQ({
            name: $('.title_text').text(),
            type: 'movie'
        });
    qq.getRate((data) => {
        $('.mod_player_head').append(
            new Template(data).typeA()
        );
    });
}
