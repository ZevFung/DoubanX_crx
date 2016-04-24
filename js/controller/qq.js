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
        this.reg = {
            isFilm: /(^http:\/\/film\.qq\.com)*\/cover\/.*\.html/i,
            isVideo: /^http:\/\/v\.qq\.com\/(cover|prev)\/.*\.html/i
        };
    }

    main() {
        const that = this;
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
                name: $('.intro_title .title_inner').text(),
                type: 'movie'
            }).getRate();
        }

        if (this.isVideo && this.page.movie) {
            new DoubanX({
                name: $('#h1_title').text(),
                type: 'movie'
            }).getRate();
        }

        Common.listHandle(
            /(^http:\/\/(film|v)\.qq\.com)*\/(cover|prev)\/.*\.html/i,
            'li',
            'movie'
        );
    }
}

new QQ().main();
