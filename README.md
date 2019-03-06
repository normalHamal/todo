# TODO

一个简单的**todo**应用，[gh-pages](https://github.com/normalHamal/todo/tree/gh-pages)分支是打包后的静态文件并且部署在**GitPages**上，你可以[点此](https://normalhamal.github.io/todo/)访问。

# 项目简介

1.  使用**vue-cli**`3.4.1`构建

2.  原型设计[by figma](https://www.figma.com/file/MQjuEFbzBtU25g9BlANznqfS/main?node-id=0%3A1)

   ![](http://static.qvjunping.me/20190306173435.png)

3.  mock数据来自于[NEI 接口管理平台](https://nei.netease.com/)

   ![](http://static.qvjunping.me/20190306173335.png)

4.  页面加载前的动画是用的[lottie](https://github.com/airbnb/lottie-web)解析**AE**动画打包出来的**json**数据，最后生成**svg**渲染到页面上。

5.  前端与后台数据交互的逻辑是，如果用户与页面的交互一旦停止了，**4000ms**后，自动更新用户已经在页面上所进行的所有数据变动。这里用的函数防抖直接用的**lodash**的，大致逻辑如下：

   ```javascript
   import _ from "lodash";
   ...
   /**
    * todos列表变化时触发的事件
   */
   onchange(tasks) {
       this.diff();
       this.tasks = tasks;
   },
   /**
    * 与原todos列表对比，将所有变动同步至远程数据库
   */
   diff: _.debounce(function() {
       // ...
   }, 4000)
   ...
   ```

6.  前端主要由`vue+postcss+axios`构建，其中**css**的命名依照了**BEM**规范，编写由插件`postcss-bem-fix`所支持的语法来简便**css**。具体语法可参考文档[postcss-bem-fix](https://www.npmjs.com/package/postcss-bem-fix)。
7.  后台的**curd**由`koa2+mongoose`构建。

# 项目启动

首先安装依赖

```bash
$ npm install
// or
$ yarn install
```

如果你想对编写的代码进行代码检查，你可以

```bash
$ npm run lint
```

由于我**eslint**集成了**prettier**，所以运行完上述命令后，除了语法检查同时还会修改你的代码风格。

## 开发环境

```bash
$ npm run serve
```

这个时候所有请求就会发送到**NEI**提供的**mock**数据服务接口上，然后打开浏览器输入[http://localhost:8080/](http://localhost:8080/)就可以访问页面了。

## 生产环境

```bash
$ npm run start
```

这个**script**的本质是`npm run build && node server/app.js`，也就是会先打包并压缩静态资源然后启动**node**服务。这里我在`package.json`里设置了

```j&#39;son
"vue": {
  "outputDir": "server/dist"
}
```

所以**build**之后的代码会复制到`server/dist`文件夹下，然后由node来对dist文件夹开启静态文件服务，所以start后你只需要打开浏览器输入[http://localhost/](http://localhost/)就可以访问dist文件夹下面的`index.html`文件。