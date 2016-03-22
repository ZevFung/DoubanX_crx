class Leshi {
    constructor() {
        this.isLeshi = window.location.host === 'www.le.com';
        this.page = {
            video: window.location.pathname.indexOf('/ptv/vplay/') === 0
        };
    }

    main() {
        if (this.isLeshi && this.page.video) {
            new DoubanX({
                name: $('h1.j-video-name').text(),
                type: 'movie'
            }).getRate();
        }

    }
}

new Leshi().main();
