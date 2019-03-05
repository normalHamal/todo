const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(
  "mongodb://127.0.0.1/todos",
  {
    useNewUrlParser: true
  },
  function(error) {
    if (error) {
      console.error(`数据库连接失败\n${error}`);
      process.exit(-1);
    } else {
      console.info("数据库连接成功");
    }
  }
);

const TodoSchema = new Schema({
  id: String,
  content: String,
  completed: Boolean
});

module.exports = {
  Todo: mongoose.model("Todo", TodoSchema)
};
