'use strict';

class DoubanX {
    constructor(options) {
        this.name = options.name || '';
        this.type = options.type || '';
        this.api = 'http://doubanx.wange.im/get_rate';
        // localStorage.clear();
    }

    /**
     * 格式化标题
     */
    static formatName(name) {
        return $.trim(name)
                .replace('《', '').replace('》', '')
                .replace(/(.*)?(第.*?季)/i, "$1 $2");
    };

    /**
     * 格式化数据
     */
    static formatData(data) {
        data.rate = JSON.parse(data.rate);
        data.time = Date.parse(data.time);

        return data;
    }

    /**
     * 实时获取豆瓣信息
     */
    getRateOnline(callback) {
        const that = this;
        const name = that.name;
        const type = that.type;
        $.ajax({
            url: that.api,
            data: {
                name: DoubanX.formatName(name),
                type: type
            },
            type: 'post',
            dataType: 'json',
            success: (data) => {
                if (data.ret === 0) {
                    callback(DoubanX.formatData(data.data));
                    localStorage.setItem(name, JSON.stringify(data.data));
                }
            }
        });
    }

    /**
     * 从本地缓存中获取豆瓣信息
     */
    getRateOffline(callback) {
        let output = false;
        if (localStorage.getItem(this.name)) {
            callback(
                JSON.parse(localStorage.getItem(this.name))
            );
            output = true;
        }

        return output;
    }

    /**
     * 获取豆瓣信息
     */
    getRate(callback) {
        const that = this;
        const name = that.name;
        const inCache = that.getRateOffline(callback || that.defaultCallback);
        if (!inCache) {
            that.getRateOnline(callback || that.defaultCallback);
        }
    }

    /**
     * 默认回调方法
     */
    defaultCallback(data) {
        $('body').append(new Template(data).typeA());
    }
}
