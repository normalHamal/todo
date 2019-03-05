const Router = require("koa-router");
const router = new Router({
  prefix: "/api"
});
const { Todo } = require("./model");
const uuidv1 = require("uuid/v1");

/**
 * 将需要返回的json数据添加上额外的状态信息
 * @private
 * @param {*} ctx koa context 实例对象
 * @param {*} response 返回的json数据
 * @param {*} options 状态信息
 */
function responseToJson(ctx, response, options = { code: 0, msg: "" }) {
  ctx.body = Object.assign(response, options);
}

// 返回所有todo
router.get("/getAllTasks", async ctx => {
  let todos = await Todo.find({}).exec();

  responseToJson(ctx, {
    data: todos
  });
});

// 添加一个todo
router.post("/addTask", async ctx => {
  const { content, completed } = ctx.request.body;
  let id;

  if (!content || content.trim() === "" || typeof completed !== "boolean") {
    return responseToJson(
      ctx,
      {},
      {
        code: -1,
        msg: "error params"
      }
    );
  }

  // 生成唯一id
  id = uuidv1();
  await new Todo({
    id,
    content,
    completed
  }).save();

  responseToJson(ctx, {});
});

// 更新一个todo
router.post("/updateTask", async ctx => {
  const { id, content, completed } = ctx.request.body;
  let todo;

  if (
    !content ||
    content.trim() === "" ||
    typeof completed !== "boolean" ||
    !id
  ) {
    return responseToJson(
      ctx,
      {},
      {
        code: -1,
        msg: "error params"
      }
    );
  }

  todo = await Todo.findOne({ id }).exec();

  if (!todo) {
    return responseToJson(
      ctx,
      {},
      {
        code: -1,
        msg: "404 not found"
      }
    );
  }

  todo.content = content;
  todo.completed = completed;

  await todo.save();

  responseToJson(ctx, {});
});

// 删除一个todo
router.post("/delTask", async ctx => {
  const { id } = ctx.request.body;

  let todo = await Todo.findOne({ id }).exec();

  if (!todo) {
    return responseToJson(
      ctx,
      {},
      {
        code: -1,
        msg: "404 not found"
      }
    );
  }

  await Todo.deleteOne({ id }).exec();

  responseToJson(ctx, {});
});

module.exports = router;
