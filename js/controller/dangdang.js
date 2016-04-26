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
        Common.listHandle(
            /(^http:\/\/product\.dangdang\.com\/.*\.html|^http:\/\/a\.dangdang\.com\/jump\.php\?.*|^\/product\/\.\/\d*\.html|^\.\/product\/\d*\.html)/i,
            '.product_ul li, .list_aa li, .list_ab li, .index_smallcell_module, .list_content h3, .book_list a',
            'book'
        );
    }
}

new Dangdang().main();
