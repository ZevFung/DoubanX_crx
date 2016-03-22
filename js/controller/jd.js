class JD {
    constructor() {
        this.isJD = window.location.host === 'item.jd.com';
        this.page = {
            book: $.trim($('.breadcrumb strong a').text()) === '图书'
        };
    }

    main() {
        if (this.isJD && this.page.book) {
            new DoubanX({
                name: $('#name h1').text(),
                type: 'book'
            }).getRate();
        }

    }
}

new JD().main();
