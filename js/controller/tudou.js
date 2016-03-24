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
                name: document.querySelector('#videoKw a').innerText,
                type: 'movie'
            }).getRate();
        }

    }
}

new Tudou().main();
