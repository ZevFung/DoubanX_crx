'use strict';

class DoubanX {
    constructor(options) {
        this.name = options.name || '';
        this.type = options.type || '';
        this.api = 'http://xdouban.wange.im/api/get_rate';
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
                    callback(data.data);
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
        const inCache = that.getRateOffline(callback);
        if (!inCache) {
            that.getRateOnline(callback);
        }
    }
}
