class JD {
    constructor() {
        this.isJD = window.location.host === 'item.jd.com';
        this.page = {
            book: document.querySelector('.breadcrumb strong a').innerText.trim() === '图书'
        };
    }

    main() {
        if (this.isJD && this.page.book) {
            new DoubanX({
                name: document.querySelector('#name h1').innerText,
                type: 'book'
            }).getRate();
        }

    }
}

new JD().main();
