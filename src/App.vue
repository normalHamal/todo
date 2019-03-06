<template>
  <!-- 主要内容 -->
  <div class="page" id="app">
    <!-- title -->
    <div class="page__title">TODO LIST</div>
    <!-- input -->
    <div class="page__prompt">
      <input
        type="text"
        placeholder="What needs to be done?"
        autofocus
        autocomplete="off"
        class="page__input"
        v-model="task"
        @keyup.enter="addTask"
      />
    </div>
    <!-- todo list -->
    <List
      :tasksOrigin="tasks"
      v-show="!!tasks.length"
      @change="onchange"
      v-cloak
    ></List>
    <!-- loading -->
    <div
      ref="lottie"
      class="page__loading page__loading--on"
      v-show="loading"
    ></div>
  </div>
</template>

<script>
import List from "./components/List.vue";
import _ from "lodash";
import lottie from "lottie-web";

export default {
  name: "app",
  components: {
    List
  },
  data() {
    return {
      task: "",
      loading: true,
      cacheTasks: null,
      tasks: [],
      timeStart: null,
      // loading动画最少持续时间
      minDuration: 3 * 1000,
      lottieInstance: null
    };
  },
  created() {
    this.initLottie().then(() => {
      this.fetchTasks().then(() => {
        this.stopLoading();
      });
    });
  },
  methods: {
    startLoading() {
      this.loading = true;
      this.timeStart = new Date();
    },
    stopLoading() {
      let distance = this.minDuration - (new Date() - this.timeStart);
      if (distance > 0) {
        // 如果整个loading动画持续时间少于最少时长则推迟结束
        return setTimeout(this.stopLoading.bind(this), distance);
      }

      this.loading = false;
    },
    initLottie() {
      let self = this;
      return this.$Api.fetchJson("/loading.json").then(json => {
        self.lottieInstance = lottie.loadAnimation({
          container: self.$refs.lottie,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: json
        });
        self.startLoading();
      });
    },
    /**
     * tasks变化时由子组件触发的事件
     */
    onchange(tasks) {
      this.diff();
      this.tasks = tasks;
    },
    fetchTasks() {
      return this.$Api.getAllTasks().then(result => {
        this.tasks = result.data;
        // 缓存最开始获取的tasks
        this.cacheTasks = JSON.parse(JSON.stringify(result.data));
      });
    },
    addTask() {
      if (!this.task) {
        return;
      }

      this.tasks.push({
        completed: false,
        content: this.task
      });

      this.task = "";
      this.onchange(this.tasks);
    },
    diff: _.debounce(function() {
      let requests = [];
      // 和cacheTasks进行比较，将数据变更同步到数据库
      this.cacheTasks.forEach(cTask => {
        let found = false;
        // 首先从现有tasks中查找是否存在原cacheTasks的每一项
        for (let i = 0, l = this.tasks.length; i < l; i++) {
          let task = this.tasks[i];
          if (cTask.id === task.id) {
            found = true;
            // 存在则查看数据是否更新
            if (
              cTask.content !== task.content ||
              cTask.completed !== task.completed
            ) {
              requests.push(this.$Api.updateTask(task));
            }
          }
        }
        // 不存在则说明已被删除
        if (!found) {
          requests.push(this.$Api.delTask({ id: cTask.id }));
        }
      });
      // 没有id属性的task一定是新增的
      this.tasks.forEach(task => {
        if (!Object.hasOwnProperty.call(task, "id")) {
          requests.push(this.$Api.addTask(task));
        }
      });

      // 将所有改动并发地同步到数据库
      Promise.all(requests)
        .then(() => {
          // 更新整个tasks
          this.fetchTasks().then(() => {
            this.$message({
              message: "数据已在后台进行了更新",
              type: "success"
            });
          });
        })
        .catch(() => {
          this.$message.error("数据更新出现了点问题，请刷新浏览器重试");
        });
    }, 4000)
  }
};
</script>

<style lang="postcss">
:root {
  --primaryColor: #fff;
  --secondaryColor: #949494;
  --bgColor: #565656;
  --bigFontSize: 60px;
  --primaryFontSize: 30px;
  --secondaryFontSize: 18px;
  --width: 672px;
}

[v-cloak] {
  display: none;
}

body {
  background: var(--bgColor);
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
}

@component page {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 20px 0;

  @descendent title {
    color: var(--primaryColor);
    font-size: var(--bigFontSize);
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  @descendent prompt {
    width: 100%;
    margin: 30px 0;
    text-align: center;
  }

  @descendent input {
    width: var(--width);
    font-size: var(--primaryFontSize);
    background: 0;
    border: 0;
    outline: 0;
    border-bottom: 2px solid #fff;
    color: var(--secondaryColor);
  }

  @descendent loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    background: var(--bgColor);
    transform: scale(0);

    @modifier on {
      transform: scale(1);
    }
  }
}
</style>
