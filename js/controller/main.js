'use strict';
class Handle {
    constructor(list) {
        this.init(list);
    }

    init(list = []) {
        list.forEach((val, key) => {
            const valMatch = eval(val.match);
            if (
                val.event === 'pageload' &&
                valMatch &&
                val.tagIsbn &&
                val.tagTitle &&
                val.type
            ) {
                this.handlePageload(val.tagIsbn, val.tagTitle, val.type);
            }

            if (
                val.event === 'mouseover' &&
                valMatch instanceof RegExp &&
                val.tags &&
                val.type
            ) {
                this.handleMouseover(valMatch, val.tags.join(', '), val.type);
            }
        });
    }

    handlePageload(tagIsbn, tagTitle, type) {
        const isbn = $(tagIsbn).html().match(/97[89]\d{9}[xX\d]/);
        const name = isbn ? isbn[0] : $.trim($(tagTitle).text());
        if (name) {
            new DoubanX({name, type}).getRate();
        }
    }

    handleMouseover(reg, tag, type) {
        $('body').on('mouseover', tag, (ev) => {
            const $target = $(ev.currentTarget);
            const $link = this.getLink($target);
            const href = this.getHref($link);
            // 正则验证不通过，返回
            if (!reg.test(href)) {return;}

            $target.data('allow', true);
            $target.data('movein', false);

            setTimeout(() => {
                if (!$target.data('allow')) {return;}
                const name = this.getName($link);
                if (name === '' && href === '') {return;}

                // 如果数据还在加载中，直接显示 loading
                if ($target.data('loading')) {
                    Template.showLoadingTips($target);
                    return;
                }
                $target.data('allow', false);
                $target.data('loading', true);
                // 显示 loading

                Template.showLoadingTips($target);
                // 请求数据
                new DoubanX({
                    name, type, href
                }).getIntro((data) => {
                    $target.data('allow', true);
                    $target.data('loading', false);
                    if (!$target.data('movein')) {
                        // 显示豆瓣信息
                        Template.showTips($target, type, data);
                    }
                }, () => {
                    $target.data('allow', true);
                    $target.data('loading', false);
                    if (!$target.data('movein')) {
                        // 显示出错信息
                        Template.showErrorTips($target);
                    }
                });
            }, 300);
        });

        $('body').on('mouseout', tag, (ev) => {
            const $target = $(ev.currentTarget);
            const $link = this.getLink($target);
            const href = this.getHref($link);

            if (reg.test(href)) {
                $target.data('allow', false);
                $target.data('movein', true);
                Template.hideTips();
            }
        });
    }

    getLink($target) {
        const $link = $target.find('a').eq(0).length !== 0 ?
                      $target.find('a').eq(0) : $target;
        return $link;
    }

    getHref($link) {
        let href = $.trim($link.attr('href'));
        if (href.indexOf('//') === 0) { // 如果以双斜杠开头，则补全协议
            href = `${location.protocol}${href}`;
        } else if (href.indexOf('/') === 0) { // 如果以单斜杠开头，则补全域
            href = `${location.origin}${href}`;
        } else if (href.indexOf('http') === 0) { // 如果以 http 开头，则什么都不用做
            href = href;
        } else { // 其他情况
            href = `${location.href}${href}`;
        }
        return href;
    }

    getName($target) {
        const $link = this.getLink($target);
        const name = $link.attr('title') ||
                     $link.find('img').attr('alt') ||
                     $link.find('img').attr('title') ||
                     $link.find('.title').text() ||
                     $link.find('.info h2').text() ||
                     $target.find('.p_bt a').text() ||
                     $target.find('.title a').text() ||
                     $target.find('.p-name a em').text() ||
                     $target.find('dt.p-name a').text() ||
                     $target.find('dd a').text() ||
                     $target.parents('li').find('.p-name a em').text() ||
                     $target.parents('li').find('.jDesc').text() ||
                     $target.parents('li').find('h3 a').text() ||
                     $link.text();
        return $.trim(name);
    }
}


if (typeof DoubanX !== 'undefined' && typeof Template !== 'undefined') {
    new DoubanX({}).getRules((data) => {
        new Handle(data.rules);
    });
}
