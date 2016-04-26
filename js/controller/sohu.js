class Sohu {
    constructor() {
        this.isVideo = (window.location.host === 'tv.sohu.com') &&
                       (document.querySelectorAll('#sohuplayer').length > 0);
        this.isMovie = (window.location.host === 'film.sohu.com') &&
                       (document.querySelectorAll('#playerWrap').length > 0);
    }

    main() {
        if (this.isVideo) {
            new DoubanX({
                name: document.querySelector('meta[name="album"]').getAttribute('content'),
                type: 'movie'
            }).getRate();
        }

        if (this.isMovie) {
            new DoubanX({
                name: document.querySelector('.player-top-info-name h2').innerText,
                type: 'movie'
            }).getRate();
        }
        Common.listHandle(
            /^http:\/\/(tv|film)\.sohu\.com\/.*/i,
            '.lisi, .plid, .No1, .itembox.tv li, .itembox.movie li, .itembox.yugao li, .ranklist li, .G_list1 li, .G_list3 li, .recommend li, ul.list li',
            'movie'
        );
    }
}

new Sohu().main();
