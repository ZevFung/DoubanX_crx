class Dangdang {
    constructor() {
        this.isDangdang = window.location.host === 'product.dangdang.com';
        this.page = {
            book: document.querySelector('.breadcrumb a').innerText.trim() === '图书'
        };
    }

    main() {
        if (this.isDangdang && this.page.book) {
            new DoubanX({
                name: document.querySelector('.name_info h1').innerText,
                type: 'book'
            }).getRate();
        }

    }
}

new Dangdang().main();
