'use strict';

class Amazon {
    constructor() {
        this.isAmazon = window.location.host === 'www.amazon.cn';
        this.page = {
            book: $.trim($('.a-list-item').eq(0).find('a').text()) === '图书'
        }
    }

    main() {
        if (this.isAmazon && this.page.book) {
            new DoubanX({
                name: $('#productTitle').text(),
                type: 'book'
            }).getRate();
        }

    }
}

new Amazon().main();
