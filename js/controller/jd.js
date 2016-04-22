class JD {
    constructor() {
        this.isJD = (window.location.host === 'item.jd.com') &&
                    (document.querySelector('.breadcrumb strong a').innerText.trim() === '图书');
        this.isRe = (window.location.host === 're.jd.com') &&
                    (window.location.pathname.indexOf('/cps/item/') === 0);
    }

    main() {
        if (this.isJD) {
            new DoubanX({
                name: document.querySelector('#name h1').innerText,
                type: 'book'
            }).getRate();
        }

        if (this.isRe) {
            new DoubanX({
                name: document.querySelector('.shop_intro h2 a').innerText,
                type: 'book'
            }).getRate();
        }
    }
}

new JD().main();
