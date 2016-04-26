class YouKu {
    constructor() {
        this.isYouku = window.location.host === 'v.youku.com';
        this.page = {
            video: window.location.pathname.indexOf('/v_show/') === 0 &&
                   (
                       ($('.crumbs a').eq(0).text().trim() === '电影') ||
                       ($('.crumbs a').eq(0).text().trim() === '电视剧')
                   )
        };
    }

    main() {
        if (this.isYouku && this.page.video) {
            new DoubanX({
                name: $('.title a').text(),
                type: 'movie'
            }).getRate();
        }

        Common.listHandle(
            /^http:\/\/(v|www|i|e)\.youku\.com\/(v_show|show_page|u|v)/i,
            '.v, #listofficial .item, .yk-rank .item, .yk-col3, .p.ishover, #showpagerelationlist li.p_link',
            'movie'
        );
    }
}

new YouKu().main();
