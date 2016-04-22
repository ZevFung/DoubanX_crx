class JD {
    constructor() {
        // 京图图书
        this.isJD = (window.location.host === 'item.jd.com') &&
                    (document.querySelector('.breadcrumb strong a').innerText.trim() === '图书');
        // 京图热卖
        this.isRe = (window.location.host === 're.jd.com') &&
                    (window.location.pathname.indexOf('/cps/item/') === 0);
        // 京图电子书
        this.isE = (window.location.host === 'e.jd.com') &&
                    (document.querySelectorAll('#name h2').length > 0)
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

        if (this.isE) {
            new DoubanX({
                name: document.querySelector('#name h2').innerText,
                type: 'book'
            }).getRate();
        }
    }
}

new JD().main();
