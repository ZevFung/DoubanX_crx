class Common {
    constructor() {
    }
    static listHandle(reg, tag, type) {
        $('body').on('mouseover', tag, (ev) => {
            const $target = $(ev.currentTarget);
            const $link = $target.find('a').eq(0);
            const href = $.trim($link.attr('href'));

            if (reg.test(href)) {
                $target.data('allow', true);
                $target.data('movein', false);
                setTimeout(() => {
                    if ($target.data('allow')) {
                        if ($target.data('loading')) {
                            new Template().showTips($target, 'loading');
                            return;
                        }
                        $target.data('allow', false);
                        $target.data('loading', true);
                        new Template().showTips($target, 'loading');
                        new DoubanX({
                            name: $link.attr('title') ||
                                  $link.find('img').attr('alt') ||
                                  $link.find('.title').text() ||
                                  $link.text(),
                            type: type
                        }).getIntro((data) => {
                            $target.data('allow', true);
                            $target.data('loading', false);
                            if (!$target.data('movein')) {
                                new Template(data).showTips($target, 'movie');
                            }
                        }, () => {
                            $target.data('allow', true);
                            $target.data('loading', false);
                            if (!$target.data('movein')) {
                                new Template().showTips($target, 'error');
                            }
                        });
                    }
                }, 300);
            }
        });

        $('body').on('mouseout', tag, (ev) => {
            const $target = $(ev.currentTarget);
            const $link = $target.find('a').eq(0);
            const href = $.trim($link.attr('href'));

            if (reg.test(href)) {
                $target.data('allow', false);
                $target.data('movein', true);
                $('#subject-tip').remove();
            }
        });
    }
}
