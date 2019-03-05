const Koa = require("koa");
const static_koa = require("koa-static");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const router = require("./api");

app.use(async (ctx, next) => {
  // 处理error
  try {
    await next();
  } catch (error) {
    ctx.body = {
      code: -1,
      msg: error.message
    };
  }
});

// 配置静态资源加载中间件
app.use(static_koa(__dirname + "/dist"));

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

// 监听启动端口
app.listen(80);
console.info("server is running on port 80");
