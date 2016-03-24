class Iqiyi {
    constructor() {
        this.isIqiyi = window.location.host === 'www.iqiyi.com';
        this.page = {
            video: (window.location.pathname.indexOf('/v_') === 0 ||
                   window.location.pathname.indexOf('/dianying/') === 0) &&
                   document.querySelectorAll('.videoArea').length !== 0
        };
    }

    main() {
        if (this.isIqiyi && this.page.video) {
            new DoubanX({
                name: document.querySelector('#widget-videotitle').innerText,
                type: 'movie'
            }).getRate();
        }

    }
}

new Iqiyi().main();
