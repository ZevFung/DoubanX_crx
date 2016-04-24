class Tudou {
    constructor() {
        this.isTudou = window.location.host === 'www.tudou.com';
        this.page = {
            video: window.location.pathname.indexOf('/albumplay/') === 0
        };
    }

    main() {
        if (this.isTudou && this.page.video) {
            new DoubanX({
                name: $('#videoKw a').text(),
                type: 'movie'
            }).getRate();
        }

        Common.listHandle(
            /^http:\/\/www\.tudou\.com\/albumplay\/.*\.html/i,
            'li',
            'movie'
        );
    }
}

new Tudou().main();
