class Dangdang extends Base {
    constructor(list) {
        super(list);
    }
}

new Dangdang([{
    match: $.trim($('.breadcrumb a').eq(0).text()) === '图书' && $('.name_info h1').length !== 0,
    tag: '#detail_describe',
    type: 'book',
    event: 'pageload'
}, {
    match: /\b2\d{7}\.html/i,
    tag: '.group_buy .over li, .mbox_another .over li, .product_content .aside li',
    type: 'book',
    event: 'mouseover'
}, {
    match: /product\.dangdang\.com\/2\d{7}.*\.html/i,
    tag: '.product_ul li, .list_aa li, .list_ab li, .content li, .shoplist .pic',
    type: 'book',
    event: 'mouseover'
}, {
    match: /a\.dangdang\.com\/jump\.php\?.*/i,
    tag: '.product_content .aside li',
    type: 'book',
    event: 'mouseover'
}, {
    match: /\/product\/\.\/\d+\.html/i,
    tag: '.limitCell, .bookCell, .bigCell, .topRightBookCell a, .list_content .book_content',
    type: 'book',
    event: 'mouseover'
}, {
    match: /e\.dangdang\.com\/products\/.*\.html/i,
    tag: '',
    type: 'book',
    event: 'mouseover'
}]);
