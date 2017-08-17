class Amazon extends Base {
    constructor(list) {
        super(list);
    }
}

new Amazon([{
    match: $('#productTitle').length !== 0,
    tag: '#productTitle',
    type: 'book',
    event: 'pageload'
}, {
    match: $('ebooksProductTitle').length !== 0,
    tag: '#ebooksProductTitle',
    type: 'book',
    event: 'pageload'
}, {
    match: /\/gp\/product\//i,
    tag: '.zg_item_compact, .a-spacing-medium.p13n-sc-list-item, .a-carousel-card, .rhf-RVIs, .floor-hotasin-item, .a-fixed-left-grid-col, .a-link-normal',
    type: 'book',
    event: 'mouseover'
}, {
    match: /\/dp\//i,
    tag: '.a-carousel-card, #recentlyViewed td.text, .ch-tabwidget-pc-contentAsin, .feed-carousel-card, .a-fixed-left-grid-col .a-link-normal, .a-unordered-list .a-link-normal, .acsUxWidget .bxc-grid__column',
    type: 'book',
    event: 'mouseover'
}]);
