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
            isFilm: /^http:\/\/film\.qq\.com\/cover\/.*\.html/,
            isVideo: /^http:\/\/v\.qq\.com\/cover\/.*\.html/,
            isSearch: /^http:\/\//
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

        $('body').on('mouseover', 'li', (ev) => {
            const $target = $(ev.currentTarget);
            const $link = $target.find('a').eq(0);
            const href = $.trim($link.attr('href'));
            const isMovie = that.reg.isFilm.test(href) ||
                            that.reg.isVideo.test(href);

            if (isMovie) {
                $target.data('allow', true);
                $target.data('movein', false);
                setTimeout(() => {
                    if ($target.data('allow')) {
                        if ($target.data('loading')) {
                            new Template().showTips($target, 'loading');
                            return;
                        }
                        $target.data('allow', false);
                        $target.data('loading', true);
                        new Template().showTips($target, 'loading');
                        new DoubanX({
                            name: $link.attr('title') ||
                                  $link.find('img').attr('alt') ||
                                  $link.find('.title').text() ||
                                  $link.text(),
                            type: 'movie'
                        }).getIntro((data) => {
                            $target.data('allow', true);
                            $target.data('loading', false);
                            if (!$target.data('movein')) {
                                new Template(data).showTips($target, 'movie');
                            }
                        }, () => {
                            $target.data('allow', true);
                            $target.data('loading', false);
                            if (!$target.data('movein')) {
                                new Template().showTips($target, 'error');
                            }
                        });
                    }
                }, 300);
            }
        });

        $('body').on('mouseout', 'li', (ev) => {
            const $target = $(ev.currentTarget);
            const $link = $target.find('a').eq(0);
            const href = $.trim($link.attr('href'));
            const isMovie = that.reg.isFilm.test(href) ||
                            that.reg.isVideo.test(href);

            if (isMovie) {
                $target.data('allow', false);
                $target.data('movein', true);
                $('#subject-tip').remove();
            }
        });
    }
}

new QQ().main();
