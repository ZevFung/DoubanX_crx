class Douban {
    constructor() {
    }

    main() {
        Common.listHandle(
            /^https:\/\/movie\.douban\.com\/subject\/\d*/i,
            '.recommendations-bd dl, .list-s li, #billboard tr',
            'movie'
        );
        Common.listHandle(
            /(^https:\/\/(book|read)\.douban\.com)*\/(subject|ebook)\/\d*/i,
            '#db-rec-section dl, #rec-ebook-section dl, .article-recommends li, .list-ranking li, #book_rec dl, .slide-list li, .rankings ul.list li, .popular-works li',
            'book'
        );
    }
}

new Douban().main();
