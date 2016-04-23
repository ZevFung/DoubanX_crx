class QQ {
    constructor() {
        this.isFilm = window.location.host === 'film.qq.com';
        this.isVideo = window.location.host === 'v.qq.com';
        this.page = {
            video: $('#mod_player').length > 0,     // 播放页
            tv: ($('#mod_player').length > 0) &&
                ($('.album_list li').length > 0),   // 电视剧
            movie: ($('#mod_player').length > 0) &&
                ($('.album_list li').length === 0), // 电影
            list: $('ul.movie_list').length > 0     // 列表页
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

        if (this.isFilm && this.page.list) {
            $('body').on('mouseover', 'ul.movie_list li', (ev) => {
                const $target = $(ev.target);
                const $list = $target.parents('ul.movie_list li');
                if ($list.length !== 0) {
                    $list.data('allow', true);
                    setTimeout(() => {
                        if ($list.data('allow') && !$list.data('loading')) {
                            $list.data('allow', false);
                            $list.data('loading', true);
                            new Template().showTips($list, 'loading');
                            new DoubanX({
                                name: $list.find('h4.name a').text(),
                                type: 'movie'
                            }).getIntro((data) => {
                                $list.data('allow', true);
                                $list.data('loading', false);
                                new Template(data).showTips($list, 'movie');
                            }, () => {
                                $list.data('allow', true);
                                $list.data('loading', false);
                                new Template().showTips($list, 'error');
                            });
                        }
                    }, 300);
                }
            });

            $('body').on('mouseout', 'ul.movie_list li', (ev) => {
                const $target = $(ev.target);
                const $list = $target.parents('ul.movie_list li');
                if ($list.length !== 0) {
                    $list.data('allow', false);
                    $('#subject-tip').remove();
                }
            });
        }
    }
}

new QQ().main();
