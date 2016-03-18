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
        return `<div class="x_film">
                   <a href="https://${data.type}.douban.com/subject/${data.id}/" target="_blank">
                       豆瓣评分：${data.average} /
                       评分人数：${Template.toThousands(data.vote)} /
                       豆瓣评星：<span class="bigstar${data.star}"></span>
                   </a>
               </div>`;
    }
}
