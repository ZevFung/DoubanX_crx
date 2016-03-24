class Amazon {
    constructor() {
        this.isAmazon = window.location.host === 'www.amazon.cn';
        this.page = {
            book: document.querySelectorAll('#sitbLogoImg').length > 0
        };
    }

    main() {
        if (this.isAmazon && this.page.book) {
            new DoubanX({
                name: document.querySelector('#productTitle, #ebooksProductTitle').innerText,
                type: 'book'
            }).getRate();
        }
    }
}

new Amazon().main();
