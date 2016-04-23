class QQ {
    constructor() {
        this.isFilm = window.location.host === 'film.qq.com';
        this.isVideo = window.location.host === 'v.qq.com';
        this.page = {
            video: document.querySelectorAll('#mod_player').length > 0,     // 播放页
            tv: (document.querySelectorAll('#mod_player').length > 0) &&
                (document.querySelectorAll('.album_list li').length > 0),   // 电视剧
            movie: (document.querySelectorAll('#mod_player').length > 0) &&
                (document.querySelectorAll('.album_list li').length === 0), // 电影
            list: document.querySelectorAll('ul.movie_list').length > 0     // 列表页
        };
    }

    main() {
        if (this.isFilm && this.page.movie) {
            new DoubanX({
                name: document.querySelector('.player_title').innerText,
                type: 'movie'
            }).getRate();
        }

        if (this.isFilm && this.page.tv) {
            new DoubanX({
                name: document.querySelector('.album_title').innerText,
                type: 'movie'
            }).getRate();
        }

        if (this.isVideo && this.page.tv) {
            new DoubanX({
                name: document.querySelector('.intro_title .title_inner').innerText,
                type: 'movie'
            }).getRate();
        }

        if (this.isVideo && this.page.movie) {
            new DoubanX({
                name: document.querySelector('#h1_title').innerText,
                type: 'movie'
            }).getRate();
        }

        if (this.isFilm && this.page.list) {
            document.addEventListener('mouseover', (ev) => {
                const $target = $(ev.target);
                const $list = $target.parents('ul.movie_list li');
                if ($list.length !== 0) {
                    $list.data('allow', true);
                    setTimeout(() => {
                        if ($list.data('allow') && !$list.data('loading')) {
                            $list.data('allow', false);
                            $list.data('loading', true);
                            new DoubanX({
                                name: $list.find('h4.name a').text(),
                                type: 'movie'
                            }).getIntro(() => {
                                $list.data('allow', true);
                                $list.data('loading', false);
                            });
                        }
                    }, 300);
                }
            });

            document.addEventListener('mouseout', (ev) => {
                const $target = $(ev.target);
                const $list = $target.parents('ul.movie_list li');
                if ($list.length !== 0) {
                    $list.data('allow', false);
                }
            });
        }
    }
}

new QQ().main();
