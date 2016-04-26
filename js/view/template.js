class Template {
    constructor(data) {
        this.data = data || {};
    }

    /**
     * 数字千分位格式化
     */
    static toThousands(num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    }

    /**
     * 显示豆瓣评分
     */
    showRate() {
        const $body = $('body');
        $body.append(this.renderRate());
        const $rate = $('#interest_sectl');
        $body.on('click', '.interest_close', (ev) => {
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
        const $rate = $('#interest_sectl');
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
     * 显示简介浮层
     */
    showTips($list, type) {
        let renderOutput = '';
        switch (type) {
            case 'loading':
                renderOutput = this.renderLoadIntro();
                break;

            case 'error':
                renderOutput = this.renderErrorIntro();
                break;

            case 'movie':
                renderOutput = this.renderMovieIntro();
                break;

            case 'book':
                renderOutput = this.renderBookIntro();
                break;

            default:
        }

        $('#subject-tip').remove();
        const $body = $('body');

        $body.append(renderOutput);
        const bodyW = $body.width();

        const listT = $list.offset().top;
        const listL = $list.offset().left;
        const listW = $list.width();
        const listH = $list.height();

        const $tips = $('#subject-tip');
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

    /**
     * 渲染评分模板
     */
    renderRate() {
        const data = this.data;
        if (data.vote > 10) {
            return `<div id="interest_sectl" class="animated fadeInRightBig">
                        <a href="javascript:;" class="interest_close"></a>
                        <div class="rating_wrap clearbox">
                            <div class="rating_logo">豆瓣评分</div>
                            <div class="rating_self clearfix">
                                <strong class="ll rating_num">${data.average}</strong>
                                <div class="rating_right">
                                    <div class="ll bigstar${data.star}"></div>
                                    <div class="rating_sum">
                                        <a href="https://${data.type}.douban.com/subject/${data.id}/collections" class="rating_people" target="_blank"><span>${data.vote}</span>人评价</a>
                                    </div>
                                </div>
                            </div>
                            <span class="stars5 starstop" title="力荐">5星</span>
                            <div class="power" style="width:${data.rate[0]*80/100}px"></div>
                            <span class="rating_per">${data.rate[0]}%</span>
                            <br>
                            <span class="stars4 starstop" title="推荐">4星</span>
                            <div class="power" style="width:${data.rate[1]*80/100}px"></div>
                            <span class="rating_per">${data.rate[1]}%</span>
                            <br>
                            <span class="stars3 starstop" title="还行">3星</span>
                            <div class="power" style="width:${data.rate[2]*80/100}px"></div>
                            <span class="rating_per">${data.rate[2]}%</span>
                            <br>
                            <span class="stars2 starstop" title="较差">2星</span>
                            <div class="power" style="width:${data.rate[3]*80/100}px"></div>
                            <span class="rating_per">${data.rate[3]}%</span>
                            <br>
                            <span class="stars1 starstop" title="很差">1星</span>
                            <div class="power" style="width:${data.rate[4]*80/100}px"></div>
                            <span class="rating_per">${data.rate[4]}%</span>
                            <br>
                        </div>
                    </div>`;
        } else {
            return `<div id="interest_sectl" class="animated fadeInRightBig">
                        <a href="javascript:;" class="interest_close"></a>
                        <div class="rating_wrap clearbox">
                            <div class="rating_logo">豆瓣评分</div>
                            <div class="rating_self clearfix">
                                <strong class="ll rating_num"></strong>
                                <span content="10.0"></span>
                                <div class="rating_right not_showed">
                                    <div class="ll bigstar00"></div>
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
        return `<div id="comment-list-wrapper" class="indent animated fadeIn">
                    <div class="rating_logo">豆瓣热评</div>
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
     * 渲染电影简介
     */
    renderMovieIntro() {
        const data = this.data;
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


        return `<div id="subject-tip">
                    <div class="rating_logo">豆瓣简介</div>
                    <div class="subject-tip-hd">
                        <h3>${title}<span class="release-year">${data.year}</span></h3>
                        <p class="douban-star">
                            <span class="subject-star bigstar${data.rating.stars}"></span>
                            ${average}
                            <span class="rater-num">(${data.collect_count}人评价)</span>
                        </p>
                    </div>
                    <div class="subject-tip-bd">
                        <ul>
                            ${genres}
                            ${directors}
                            ${casts}
                        </ul>
                    </div>
                </div>`;
    }

    /**
     * 渲染图书简介
     */
     renderBookIntro() {

     }

     /**
      * 渲染错误
      */
    renderErrorIntro() {
        return `<div id="subject-tip">
                    <div class="rating_logo">豆瓣简介</div>
                    <div class="subject-tip-hd">
                        <h3>暂无数据 :(</h3>
                    </div>
                </div>`;
    }

    /**
     * 渲染简介前的Loading
     */
    renderLoadIntro() {
        return `<div id="subject-tip">
                    <div class="rating_logo">
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
}
