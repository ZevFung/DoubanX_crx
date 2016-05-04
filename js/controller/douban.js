class Douban {
    constructor() {
    }

    main() {
        Common.listHandle(
            /^https:\/\/movie\.douban\.com\/subject\/\d*/i,
            '.recommendations-bd dl, .list-s li',
            'movie'
        );
        Common.listHandle(
            /(^https:\/\/(book|read)\.douban\.com)*\/(subject|ebook)\/\d*/i,
            '#db-rec-section dl, #rec-ebook-section dl, .article-recommends li',
            'book'
        );
    }
}

new Douban().main();
