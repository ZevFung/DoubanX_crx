class JD {
    constructor() {
        // 京图图书
        this.isJD = (window.location.host === 'item.jd.com') &&
                    ($.trim($('.breadcrumb strong a').text()) === '图书');
        // 京图热卖
        this.isRe = (window.location.host === 're.jd.com') &&
                    (window.location.pathname.indexOf('/cps/item/') === 0);
        // 京图电子书
        this.isE = (window.location.host === 'e.jd.com') &&
                    ($('#name h2').length > 0);
    }

    main() {
        if (this.isJD) {
            new DoubanX({
                name: $('#name h1').text(),
                type: 'book'
            }).getRate();
        }

        if (this.isRe) {
            new DoubanX({
                name: $('.shop_intro h2 a').text(),
                type: 'book'
            }).getRate();
        }

        if (this.isE) {
            new DoubanX({
                name: $('#name h2').text(),
                type: 'book'
            }).getRate();
        }

        Common.listHandle(
            /^\/\/(item|e)\.jd\.com\/\d*\.html/i,
            '.ui-switchable-panel li, .book-product li, #plist li, .m-list li, .book-items li, .tabcon li, .tabcon .item',
            'book'
        );
    }
}

new JD().main();
