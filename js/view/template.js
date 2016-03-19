'use strict';

class Template {
    constructor(data) {
        this.data = data || {};
    }

    /**
     * 数字千分位格式化
     */
    static toThousands(num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    };

    /**
     * 模板A
     */
    typeA() {
        const data = this.data;
        $("body").on("click", "#interest_sectl .interest_close", function(ev) {
            $("#interest_sectl").remove();
        });
        if (data.vote > 10) {
            return `<div id="interest_sectl">
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
            return `<div id="interest_sectl">
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
}
