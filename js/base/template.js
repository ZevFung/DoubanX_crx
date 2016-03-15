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

    typeA() {
        const data = this.data;
        return '<div class="x_film">' +
               '    <a href="https://movie.douban.com/subject/'+data.id+'/" target="_blank">' +
               '        豆瓣评分：' + data.average + ' / ' +
               '        评分人数：' + Template.toThousands(data.vote) + ' / ' +
               '        豆瓣评星：<span class="bigstar' + data.star + '"></span>' +
               '    </a>' +
               '</div>';
    }

    typeB() {
        const data = this.data;
        return '<span class="x_item">豆瓣评分<i>' + data.average + '</i></span>' +
               '<span class="x_item">评分人数<i>' + Template.toThousands(data.vote) + '</i></span>' +
               '<span class="x_item">豆瓣评星<i><span class="bigstar' + data.star + '"></span>' + '</i></span>';
    }

    typeC() {
        return '<div class="sort_douban">' +
               '    <strong>本页按豆瓣排序</strong>' +
               '    <ul class="sort_list">' +
               '        <li><a data-sort="average" href="javascript:;">评分</a></li>' +
               '        <li><a data-sort="vote" href="javascript:;">人数</a></li>' +
               '        <li><a data-sort="star" href="javascript:;">评星</a></li>' +
               '    </ul>' +
               '</div>';
    }
}
