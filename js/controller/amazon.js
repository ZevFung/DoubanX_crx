class Amazon {
    constructor() {
        this.isAmazon = window.location.host === 'www.amazon.cn';
        this.page = {
            book: $('#sitbLogoImg').length > 0
        };
    }

    main() {
        if (this.isAmazon && this.page.book) {
            new DoubanX({
                name: $('#productTitle, #ebooksProductTitle').text(),
                type: 'book'
            }).getRate();
        }
    }
}

new Amazon().main();
