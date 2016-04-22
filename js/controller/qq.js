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
            document.querySelector('ul.movie_list')
            .addEventListener('mouseover', (ev) => {
                if (ev.target.nodeName.toLowerCase() === 'ul') {return;}

                let pNode = ev.target.parentNode;
                let pName = pNode.nodeName.toLowerCase();
                while (pNode !== null &&
                       pNode.nodeType !== 9 &&
                       pName !== 'li')
                {
                    pNode = pNode.parentNode;
                    pName = pNode.nodeName.toLowerCase();
                }

                new DoubanX({
                    name: pNode.querySelector('a').getAttribute('title'),
                    type: 'movie'
                }).getIntro();
            });
        }
    }
}

new QQ().main();
