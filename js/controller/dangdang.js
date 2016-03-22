class Dangdang {
    constructor() {
        this.isDangdang = window.location.host === 'product.dangdang.com';
        this.page = {
            book: $.trim($('.breadcrumb a').eq(0).text()) === '图书'
        };
    }

    main() {
        if (this.isDangdang && this.page.book) {
            new DoubanX({
                name: $('.name_info h1').text(),
                type: 'book'
            }).getRate();
        }

    }
}

new Dangdang().main();
