class Amazon extends Base {
    constructor(list) {
        super(list);
    }
}

new DoubanX({}).getRules((data) => {
    new Amazon(data.rules);
});
