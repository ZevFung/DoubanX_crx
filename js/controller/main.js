'use strict';
new DoubanX({}).getRules((data) => {
    new Handle(data.rules);
});
