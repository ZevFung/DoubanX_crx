class Filter {
    constructor() {
    }
    /**
     * 格式化标题
     */
    static formatName(name) {
        const num = ['一', '二', '三', '四', '五',
                     '六', '七', '八', '九', '十'];
        return name.trim()
                .replace(/《(.*)》(第.?季)/i, "$1 $2") // 美剧名格式化
                .replace(/(.*)?第(\d*)?季/i, ($1, $2, $3) => {
                    return $2 + ' 第' + num[$3-1] + '季';
                })                                   // 美剧名格式化
                .replace(/(.*)《(.*)》(.*)/i, "$2")   // 取书名号内容
                .replace(/(\(.*\))/i, "")            // 去掉英文括号
                // .replace(/(.*)：.*/i, "$1")
                .replace(/(.*)?(（.*）)$/i, "$1")     // 去掉中文括号里的内容
                .replace(/(.*)?(第.*?集)/i, "$1")     // 电视剧名格式化
                .replace(/<(.*)>(.*)/i, "$1")
                .replace(/【.*】(.*)/i, "$1")
                .replace(/(.*)\[.*\]/i, "$1")
                .replace(/(.*)(-.*卫视)/i, "$1");
    }

    /**
     * 格式化数据
     */
    static formatData(data) {
        data.rate = JSON.parse(data.rate);

        return data;
    }

    /**
     * 数字千分位格式化
     */
    static toThousands(num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    }

}
