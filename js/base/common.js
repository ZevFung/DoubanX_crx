class Base {
    constructor(list) {
        if (typeof DoubanX === 'undefined' || typeof Template === 'undefined') {
            return;
        }
        this.init(list);
    }

    init(list) {
        list.forEach((val, key) => {
            if (
                val.event === 'pageload' &&
                val.match &&
                val.tag &&
                val.type
            ) {
                this.handlePageload(val.tag, val.type);
            }

            if (
                val.event === 'mouseover' &&
                val.match instanceof RegExp &&
                val.tag &&
                val.type
            ) {
                this.handleMouseover(val.match, val.tag, val.type);
            }
        });
    }

    handlePageload(tag, type) {
        const name = $(tag).html().match(/97[89]\d{9}[xX\d]/);
        if (name) {
            new DoubanX({
                name: name[0],
                type: type
            }).getRate();
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
                if (name === '') {return;}

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
                    name: name,
                    type: type
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
        const href = $.trim($link.attr('href'));
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
                     $link.text();
        return $.trim(name);
    }
}
