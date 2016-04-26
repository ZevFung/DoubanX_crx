class Common {
    constructor() {
    }
    static listHandle(reg, tag, type) {
        $('body').on('mouseover', tag, (ev) => {
            const $target = $(ev.currentTarget);
            const $link = $target.find('a').eq(0).length !== 0 ?
                          $target.find('a').eq(0) : $target;
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
                            name: $.trim($link.attr('title')) ||
                                  $.trim($link.find('img').attr('alt')) ||
                                  $.trim($link.find('.title').text()) ||
                                  $.trim($link.find('.info h2').text()) ||
                                  $.trim($target.find('.p_bt a').text()) ||
                                  $.trim($link.text()),
                            type: type
                        }).getIntro((data) => {
                            $target.data('allow', true);
                            $target.data('loading', false);
                            if (!$target.data('movein')) {
                                new Template(data).showTips($target, type);
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
            const $link = $target.find('a').eq(0).length !== 0 ?
                          $target.find('a').eq(0) : $target;
            const href = $.trim($link.attr('href'));

            if (reg.test(href)) {
                $target.data('allow', false);
                $target.data('movein', true);
                $('#subject-tip').remove();
            }
        });
    }
}
