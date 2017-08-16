class DoubanX {
    constructor(options) {
        this.name = options.name || '';     // 名称
        this.type = options.type || '';     // 类型 movie/book
        this.origin = '//doubanx.wange.im';
        this.api = {
            getRate: `${this.origin}/get_rate`,
            getReview: `${this.origin}/get_review`,
            getIntro: `${this.origin}/get_intro`
        };
        // localStorage.clear();
    }


    /**
     * 实时获取
     */
    getOnline(key, url, params, callback, error) {
        const that = this;
        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', url, true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                const data = JSON.parse(xhttp.responseText);
                if (data.ret === 0) {
                    callback(data);
                    localStorage.setItem(key, JSON.stringify(data.data));
                } else {
                    if (typeof error === 'function') { error(); }
                }
            }
        };
        xhttp.send(params);
    }

    /**
     * 从本地缓存中获取
     */
    getOffline(key, callback) {
        let output = false;
        if (localStorage.getItem(key)) {
            const jsonObj = JSON.parse(localStorage.getItem(key));
            callback(jsonObj);
            output = true;
        }

        return output;
    }

    /**
     * 实时获取豆瓣信息
     */
    getRateOnline(callback) {
        const key = `${this.name}_${this.type}_rate`;
        const url = this.api.getRate;
        const params = `name=${Filter.formatName(this.name)}&type=${this.type}`;

        this.getOnline(key, url, params, (data) => {
            callback(Filter.formatData(data.data));
        });
    }

    /**
     * 从本地缓存中获取豆瓣信息
     */
    getRateOffline(callback) {
        const key = `${this.name}_${this.type}_rate`;
        return this.getOffline(key, (data) => {
            callback(data);
        });
    }

    /**
     * 获取豆瓣信息
     */
    getRate() {
        const that = this;
        const name = that.name;
        // 优先读取缓存
        const inCache = that.getRateOffline((data) => {
            new Template(data).showRate();
            that.getReview(data, (review) => {
                new Template(Object.assign(
                    {}, {rate: data}, {review: review}
                )).showReview();
            });
        });

        // 没有缓存则实时获取
        if (!inCache) {
            that.getRateOnline((data) => {
                new Template(data).showRate();
                that.getReview(data, (review) => {
                    new Template(Object.assign(
                        {}, {rate: data}, {review: review}
                    )).showReview();
                });
            });
        }
    }

    /**
     * 实时获取豆瓣评论
     */
    getReviewOnline(data, callback) {
        const key = `${this.name}_${this.type}_review`;
        const url = this.api.getReview;
        const params = `id=${data.id}`;

        this.getOnline(key, url, params, (data) => {
            callback(data.data);
        });
    }

    /**
     * 从本地缓存中获取豆瓣评论
     */
    getReviewOffline(callback) {
        const key = `${this.name}_${this.type}_review`;
        return this.getOffline(key, (data) => {
            callback(data);
        });
    }

    /**
     * 获取豆瓣评论
     */
    getReview(data, callback) {
        const that = this;
        // 优先读取缓存
        const inCache = that.getReviewOffline((review) => {
            callback(review);
        });

        // 没有缓存则实时获取
        if (!inCache) {
            that.getReviewOnline(data, (review) => {
                callback(review);
            });
        }
    }

    /**
     * 从本地缓存中获取豆瓣简介
     */
    getIntroOffline(callback) {
        const key = `${this.name}_${this.type}_intro`;
        return this.getOffline(key, (data) => {
            callback(data);
        });
    }

    /**
     * 实时获取豆瓣简介
     */
    getIntroOnline(callback, error) {
        const key = `${this.name}_${this.type}_intro`;
        const url = this.api.getIntro;
        const params = `name=${Filter.formatName(this.name)}&type=${this.type}`;

        this.getOnline(key, url, params, (data) => {
            callback(data.data);
        }, error);
    }

    /**
     * 获取豆瓣简介
     */
    getIntro(callback, error) {
        const that = this;
        // 优先读取缓存
        const inCache = that.getIntroOffline((intro) => {
            callback(intro);
        });

        // 没有缓存则实时获取
        if (!inCache) {
            that.getIntroOnline((intro) => {
                callback(intro);
            }, error);
        }
    }
}
