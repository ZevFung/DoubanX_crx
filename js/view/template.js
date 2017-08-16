class Template {
    constructor(data) {
        this.data = data || {};
        this.events();
    }

    /**
     * 显示豆瓣评分
     */
    showRate() {
        const $body = $('body');
        $body.append(this.renderRate());
        const $rate = $('#doubanx_sectl');
        $body.on('click', '.doubanx_close', (ev) => {
            ev.preventDefault();
            $rate.toggleClass('animated fadeOutRightBig');
            setTimeout(() => {
                $rate.remove();
            }, 500);
        });

        setTimeout(() => {
            $rate.toggleClass('animated fadeInRightBig');
        }, 500);
    }

    /**
     * 显示豆瓣评论
     */
    showReview(data) {
        const $rate = $('#doubanx_sectl');
        $rate.append(this.renderReview());
        const windowH = $(window).height();
        const doubanH = $rate.height();
        // 上下至少各预留 100px
        if (windowH < doubanH + 100 &&
            windowH > 340
        ) {
            $rate.find('ul').css({
                maxHeight: (windowH - 340) + 'px'
            });
        }
    }



    /**
     * 渲染评分模板
     */
    renderRate() {
        const data = this.data;
        if (data.vote > 10) {
            return `<div id="doubanx_sectl" class="animated fadeInRightBig">
                        <a href="javascript:;" class="doubanx_close"></a>
                        <div class="rating_wrap clearbox">
                            <div class="doubanx-rating-logo">豆瓣评分</div>
                            <div class="rating_self clearfix">
                                <strong class="ll rating_num">${data.average}</strong>
                                <div class="rating_right">
                                    <div class="ll doubanx_star${data.star}"></div>
                                    <div class="rating_sum">
                                        <a href="https://${data.type}.douban.com/subject/${data.id}/collections" class="rating_people" target="_blank"><span>${data.vote}</span>人评价</a>
                                    </div>
                                </div>
                            </div>
                            <span class="doubanx_stars5 doubanx_starstop" title="力荐">5星</span>
                            <div class="power" style="width:${data.rate[0]*80/100}px"></div>
                            <span class="rating_per">${data.rate[0]}%</span>
                            <br>
                            <span class="doubanx_stars4 doubanx_starstop" title="推荐">4星</span>
                            <div class="power" style="width:${data.rate[1]*80/100}px"></div>
                            <span class="rating_per">${data.rate[1]}%</span>
                            <br>
                            <span class="doubanx_stars3 doubanx_starstop" title="还行">3星</span>
                            <div class="power" style="width:${data.rate[2]*80/100}px"></div>
                            <span class="rating_per">${data.rate[2]}%</span>
                            <br>
                            <span class="doubanx_stars2 doubanx_starstop" title="较差">2星</span>
                            <div class="power" style="width:${data.rate[3]*80/100}px"></div>
                            <span class="rating_per">${data.rate[3]}%</span>
                            <br>
                            <span class="doubanx_stars1 doubanx_starstop" title="很差">1星</span>
                            <div class="power" style="width:${data.rate[4]*80/100}px"></div>
                            <span class="rating_per">${data.rate[4]}%</span>
                            <br>
                        </div>
                    </div>`;
        } else {
            return `<div id="doubanx_sectl" class="animated fadeInRightBig">
                        <a href="javascript:;" class="doubanx_close"></a>
                        <div class="rating_wrap clearbox">
                            <div class="doubanx-rating-logo">豆瓣评分</div>
                            <div class="rating_self clearfix">
                                <strong class="ll rating_num"></strong>
                                <span content="10.0"></span>
                                <div class="rating_right not_showed">
                                    <div class="ll doubanx_star00"></div>
                                    <div class="rating_sum">
                                        <a href="https://${data.type}.douban.com/subject/${data.id}/collections" target="_blank">评价人数不足</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
    }

    /**
     * 渲染评论模板
     */
    renderReview() {
        const data = this.data;
        let list = '';
        data.review.forEach((review) => {
            list += `<li class="comment-item">
                        <p class="comment-content">
                            <a href="${review.link}" target="_blank">${review.title}</a>
                        </p>
                    </li>`;
        });
        return `<div id="doubanx-comment" class="indent animated fadeIn">
                    <div class="doubanx-rating-logo">豆瓣热评</div>
                    <div class="comment-list">
                        <ul>
                            ${list}
                        </ul>
                    </div>
                    <div class="comment-ft">
                        <a href="https://${data.rate.type}.douban.com/subject/${data.rate.id}/reviews" class="comment-more" target="_blank">查看更多评论&raquo;</a>
                    </div>
                </div>`;
    }

    /**
     * 自定义事件
     */
    events() {
        $('body')
            .on('doubanx:mouseout', () => {
            })
            .on('doubanx:showTips', () => {
            });
    }

    /**
     * 渲染图书简介
     */
    static renderBookIntro(data) {
        let author = '';
        let title = '';
        let translator = '';
        let publisher = '';
        let pubdate = '';
        let summary = '';

        title = data.title === data.subtitle ? data.title : `${data.title} ${data.subtitle}`;
        author = data.author.join(' / ');
        author = author !== '' ? `<li>
                                     <span class="douban-label">作者：</span>
                                     <span>${author}</span>
                                 </li>` : '';

        translator = data.translator.join(' / ');
        translator = translator !== '' ? `<li>
                                             <span class="douban-label">译者：</span>
                                             <span>${translator}</span>
                                         </li>` : '';
        publisher = data.publisher !== '' ? `<li>
                                                 <span class="douban-label">出版社：</span>
                                                 <span>${data.publisher}</span>
                                             </li>` : '';
        pubdate = data.pubdate !== '' ? `<li>
                                             <span class="douban-label">出版时间：</span>
                                             <span>${data.pubdate}</span>
                                         </li>` : '';
        summary = data.summary !== '' ? `<p>${data.summary}</p>` : '';


        return `<div id="doubanx-subject-tip" class="doubanx-subject-tip-book">
                    <div class="doubanx-rating-logo">豆瓣简介</div>
                    <div class="doubanx-subject-tip-hd">
                        <h3>${title}</h3>
                    </div>
                    <div class="doubanx-subject-tip-bd">
                        <ul>
                            ${author}
                            ${translator}
                            ${publisher}
                            ${pubdate}
                        </ul>
                        ${summary}
                    </div>
                </div>`;
     }

    /**
     * 渲染电影简介
     */
    static renderMovieIntro(data) {
        let title = '';
        let genres = '';
        let directors = '';
        let directorsArr = [];
        let casts = '';
        let castsArr = [];
        let average = '';

        title = data.title === data.original_title ? data.title : `${data.title}(${data.original_title})`;
        data.directors.forEach((director) => {
            directorsArr.push(director.name);
        });
        data.casts.forEach((cast) => {
            castsArr.push(cast.name);
        });
        genres = data.genres.join(' / ');
        directors = directorsArr.join(' / ');
        casts = castsArr.join(' / ');

        genres = genres !== '' ? `<li>
                                    <span class="douban-label">类型：</span>
                                    <span>${genres}</span>
                                </li>` : '';
        directors = directors !== '' ? `<li>
                                            <span class="douban-label">导演：</span>
                                            <span>${directors}</span>
                                        </li>` : '';
        casts = casts !== '' ? `<li>
                                    <span class="douban-label">主演：</span>
                                    <span>${casts}</span>
                                </li>` : '';
        average = data.rating.average === 0 ? '' : `<span class="subject-rating">${Number(data.rating.average).toFixed(1)}</span>`;


        return `<div id="doubanx-subject-tip" class="doubanx-subject-tip-movie">
                    <div class="doubanx-rating-logo">豆瓣简介</div>
                    <div class="doubanx-subject-tip-hd">
                        <h3>${title}<span class="doubanx-release-year">${data.year}</span></h3>
                        <p class="doubanx-douban-star">
                            <span class="doubanx-subject-star doubanx_star${data.rating.stars}"></span>
                            ${average}
                            <span class="doubanx-rater-num">(${data.collect_count}人评价)</span>
                        </p>
                    </div>
                    <div class="doubanx-subject-tip-bd">
                        <ul>
                            ${genres}
                            ${directors}
                            ${casts}
                        </ul>
                    </div>
                </div>`;
    }

    /**
     * 渲染错误
     */
    static renderErrorIntro() {
        return `<div id="doubanx-subject-tip">
                    <div class="doubanx-rating-logo">豆瓣简介</div>
                    <div class="doubanx-subject-tip-hd">
                        <h3>暂无数据 :(</h3>
                    </div>
                </div>`;
    }

    /**
     * 渲染简介前的Loading
     */
    static renderLoadIntro() {
        return `<div id="doubanx-subject-tip">
                    <div class="doubanx-rating-logo">
                        豆瓣影视图书小助手正努力搜索中...
                    </div>
                    <div class="loader-inner pacman">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>`;
    }

    static renderTips($target, content) {
        Template.hideTips();
        const $body = $('body');

        $body.append(content);
        const bodyW = $body.width();

        const listT = $target.offset().top;
        const listL = $target.offset().left;
        const listW = $target.width();
        const listH = $target.height();

        const $tips = $('#doubanx-subject-tip');
        const tipsW = $tips.width();
        const tipsH = $tips.height();

        if (bodyW - (listW + listL) > tipsW)
        // 优先在右侧展示
        {
            $tips.css({
                top: listT,
                left: listW + listL
            });
        }
        // 其次在左侧展示
        else if (listL > tipsW)
        {
            $tips.css({
                top: listT,
                left: listL - tipsW
            });
        }
    }

    static showLoadingTips($target) {
        const content = Template.renderLoadIntro();
        Template.renderTips($target, content);
    }

    static showErrorTips($target) {
        const content = Template.renderErrorIntro();
        Template.renderTips($target, content);
    }

    /**
     * 显示简介浮层
     */
    static showTips($target, type, data) {
        let content = '';

        if (type === 'movie') {
            content = Template.renderMovieIntro(data);
        } else if (type === 'book') {
            content = Template.renderBookIntro(data);
        }

        Template.renderTips($target, content);
    }

    /**
     * 隐藏简介浮层
     */
    static hideTips() {
        $('#doubanx-subject-tip').remove();
    }
}
