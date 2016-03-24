class YouKu {
    constructor() {
        this.isYouku = window.location.host === 'v.youku.com';
        this.page = {
            video: window.location.pathname.indexOf('/v_show/') === 0 &&
                   document.querySelector('.crumbs a').innerText.trim() === ('电影' || '电视剧')
        };
    }

    main() {
        if (this.isYouku && this.page.video) {
            new DoubanX({
                name: document.querySelector('.title a').innerText,
                type: 'movie'
            }).getRate();
        }

    }
}

new YouKu().main();
