# 豆瓣影视图书小助手（DoubanX - Chrome 扩展）

> 在视频播放页以及图书详情页显示当前视频或图书在豆瓣（[douban.com](https://www.douban.com)）对应的评分、评星、评论等信息。在视频和图书列表页显示对应的豆瓣评星和简介。（目前电影、电视剧支持腾讯、优酷、土豆、爱奇艺、乐视、搜狐以及豆瓣，图书支持亚马逊、京东、当当网、天猫以及豆瓣）

## 开发背景
不知道各位看官有没有这样的痛点，反正我有。就是当我在各大视频网站或者图书网站浏览的时候，我会想知道当前播放的视频或者图书的一个客观评分，比如说豆瓣评分，所以每次我会把当前视频和图书的标题复制到豆瓣上搜一下，看看评分、评星、评论等等再决定要不要继续看这个视频和图书。这是一个重复又费时的操作，为什么不把这个流程做成自动化呢？于是就有了这个 Chrome 扩展。

## 扩展预览
![DoubanX](http://wange.im/wp-content/uploads/2016/05/1.png)
![DoubanX](http://wange.im/wp-content/uploads/2016/05/2.png)
![DoubanX](http://wange.im/wp-content/uploads/2016/05/3.png)
![DoubanX](http://wange.im/wp-content/uploads/2016/05/4.png)

## 如何使用

1. 前往 Chrome 网上应用店[下载 DoubanX](https://chrome.google.com/webstore/detail/%E8%B1%86%E7%93%A3%E5%BD%B1%E8%A7%86%E5%9B%BE%E4%B9%A6%E5%B0%8F%E5%8A%A9%E6%89%8B/ioacifoopoldngldmbknimhhophmfbgh?hl=zh-CN)（请自备梯子）。
2. 点击“`+添加至 CHROME`”按钮完成安装，无需任何配置。
3. 前往国内各主流视频或图书网站，进入任意播放页或图书详情页。
4. 浏览器右侧浮层随即显示当前视频或图书的豆瓣信息。

## 常见问题

* Q: 为什么第一次打开视频和图书显示的豆瓣评分有点慢？  
  A: 第一次访问该页面的用户会去豆瓣实时抓取数据，可能会有2-3秒延时。  

* Q: 为什么当前页面显示的豆瓣评分和自己去豆瓣网站上查到的有误差？  
  A: 为了保证查询速度，做了缓存机制，数据更新会有延后。  

* Q: 为什么我打开的视频或图书右侧没有显示豆瓣评分？  
  A: 首先，请确认安装了最新版本的 [DoubanX 扩展](https://chrome.google.com/webstore/detail/%E8%B1%86%E7%93%A3%E5%BD%B1%E8%A7%86%E5%9B%BE%E4%B9%A6%E5%B0%8F%E5%8A%A9%E6%89%8B/ioacifoopoldngldmbknimhhophmfbgh?hl=zh-CN)并启用；另外，某些花絮、预告片、集锦等视频不在豆瓣信息内，所以不予显示；除此之后，很遗憾，那就是我的 bug 了 :-P

* Q: 为什么当前页面显示的豆瓣评分的链接指向的不是我看的视频和图书？  
  A: 不用怀疑，[给我提bug](https://github.com/wange1228/DoubanX_crx/issues)，我会在第一时间修复。

## License
Released under [MIT](http://rem.mit-license.org/)  LICENSE
