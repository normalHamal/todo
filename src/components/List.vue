<template>
  <div class="list">
    <div class="list__menu overflow_hide">
      <div :class="classSwitch" @click="toggleAll">
        <span :class="classSwitchBot"></span>
      </div>
      <div class="list__text">Active All Tasks</div>
    </div>
    <div class="list__item overflow_hide" v-for="item in tasks" :key="item.id">
      <div class="list__item_status" @click="toggleCompleted(item)">
        <span :class="itemStatus(item.completed)"></span>
      </div>
      <input
        type="text"
        class="list__input"
        v-model="item.content"
        @blur="finishUpdate(item, $event)"
        @keyup.enter="finishUpdate(item, $event)"
        v-todo-focus="item == editedItem"
      />
      <div :class="isCompleted(item.completed)" @dblclick="updateContent(item)">
        {{ item.content }}
      </div>
      <div class="list__item_remove" @click="remove(item)"></div>
    </div>
    <div class="list__tabbar overflow_hide">
      <span class="list__text left">{{ countOfUncompleted }} items left</span>
      <span class="list__text right" @click="clearCompleted"
        >Clear Completed</span
      >
      <span :class="classFilter[0]" @click="filterAll">All</span> |
      <span :class="classFilter[1]" @click="filterActive">Active</span> |
      <span :class="classFilter[2]" @click="filterCompleted">Completed</span>
    </div>
  </div>
</template>
<script>
function toggleClass(className) {
  let classList = this.split(" ");

  if (!this || !className) return this;

  return ~classList.indexOf(className)
    ? classList.slice(0, -1).join(" ")
    : classList.concat(className).join(" ");
}

export default {
  props: ["tasksOrigin"],
  data() {
    return {
      tasks: [],
      classFilter: ["list__text", "list__text", "list__text"],
      classSwitch: "list__switch",
      classSwitchBot: "list__switch_bot",
      activeAll: false,
      editedItem: null
    };
  },
  created() {
    // 复制从父组件传递过来的数据，因为直接修改props是不可取的
    // 因为没有函数以及其他不可序列化数据类型
    // 所以直接用原生的方法来克隆
    this.tasks = JSON.parse(JSON.stringify(this.tasksOrigin));
    this.toggleActiveClass(0);
  },
  watch: {
    tasksOrigin() {
      // 一旦父组件更新了数据，则同步并reload组件
      this.tasks = JSON.parse(JSON.stringify(this.tasksOrigin));
    }
  },
  computed: {
    countOfUncompleted() {
      return this.tasks.filter(task => !task.completed).length;
    }
  },
  methods: {
    toggleAll() {
      let isChangeed = false;
      // 切换滑块样式
      this.classSwitch = toggleClass.call(this.classSwitch, "list__switch--on");
      this.classSwitchBot = toggleClass.call(
        this.classSwitchBot,
        "list__switch_bot--on"
      );
      // 处理滑动逻辑
      this.activeAll = !this.activeAll;

      this.tasks = this.tasks.map(task => {
        if (task.completed !== this.activeAll) {
          isChangeed = true;
        }

        task.completed = this.activeAll;
        return task;
      });

      if (isChangeed) {
        this.change();
      }
    },
    itemStatus(status) {
      return status ? "icon_status icon_status--checked" : "icon_status";
    },
    isCompleted(status) {
      return status
        ? "list__item_content list__item_content--delete"
        : "list__item_content";
    },
    remove(item) {
      let { tasks } = this;

      this.tasks = tasks.filter(task => task !== item);
      this.change();
    },
    toggleCompleted(task) {
      task.completed = !task.completed;
      this.change();
    },
    change() {
      this.$emit("change", this.tasks);
    },
    filterAll() {
      this.tasks = this.tasksOrigin;
      this.toggleActiveClass(0);
    },
    filterActive() {
      this.tasks = this.tasksOrigin.filter(task => !task.completed);
      this.toggleActiveClass(1);
    },
    filterCompleted() {
      this.tasks = this.tasksOrigin.filter(task => task.completed);
      this.toggleActiveClass(2);
    },
    toggleActiveClass(index) {
      this.classFilter = ["list__text", "list__text", "list__text"];

      this.classFilter[index] += " list__text--active";
    },
    clearCompleted() {
      this.tasks.forEach(task => {
        if (task.completed) {
          this.remove(task);
        }
      });
    },
    updateContent(item) {
      this.editedItem = item;
    },
    finishUpdate(item, e) {
      if (!this.editedItem) {
        return;
      }

      this.editedItem = null;
      item.content = item.content.trim();
      if (!item.content) {
        this.remove(item);
      } else {
        e.target.classList.remove("list__input--on");
      }
    }
  },
  directives: {
    "todo-focus": function(el, binding) {
      if (binding.value) {
        el.classList.add("list__input--on");
        el.focus();
      }
    }
  }
};
</script>
<style lang="postcss">
:root {
  --vertical-center: {
    display: flex;
    align-items: center;
  }
  --margin-right: {
    margin-right: 20px;
  }
  --transition-all {
    transition: all 0.2s ease;
  }
}

@component list {
  width: var(--width);
  padding: 23px 52px;
  background: rgba(15, 15, 15, 0.9);
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @descendent menu {
    @apply --vertical-center;
    padding: 10px 0;
  }

  @descendent switch {
    position: relative;
    display: inline-block;
    width: 70px;
    height: 30px;
    @apply --margin-right;
    line-height: 30px;
    border-radius: 30px;
    cursor: pointer;
    @apply --transition-all;
    user-select: none;
    overflow: hidden;
    background: var(--bgColor);

    @modifier on {
      background: var(--primaryColor);
    }
  }

  @descendent switch_bot {
    position: absolute;
    left: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: var(--secondaryColor);
    cursor: pointer;
    @apply --transition-all;

    @modifier on {
      left: 45px;
    }
  }

  @descendent text {
    color: var(--secondaryColor);
    font-size: var(--secondaryFontSize);

    @modifier active {
      color: var(--primaryColor);
    }
  }

  @descendent item {
    position: relative;
    @apply --vertical-center;
    height: 63px;
    margin-bottom: 36px;

    &:hover .list__item_remove {
      transform: scale(1);
    }
  }

  @descendent input {
    position: absolute;
    top: -63px;
    left: 62px;
    width: calc(100% - 83px);
    font-size: var(--primaryFontSize);
    color: var(--primaryColor);
    background: 0;
    border: 0;
    outline: 0;
    border-bottom: 2px solid #fff;
    @apply --transition-all;

    @modifier on {
      top: 50%;
      transform: translateY(-50%);

      & ~ .list__item_content {
        opacity: 0;
      }
    }
  }

  @descendent item_content {
    font-size: var(--primaryFontSize);
    color: var(--primaryColor);
    width: calc(100% - 83px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all 0.2s ease 0.2s;

    @modifier delete {
      color: var(--secondaryColor);
      text-decoration: line-through;
    }
  }

  @descendent item_remove {
    position: absolute;
    right: 0;
    width: 20px;
    height: 20px;
    background-image: url("../assets/chacha.svg");
    background-repeat: no-repeat;
    background-size: 20px 20px;
    background-position: center center;
    @apply --transition-all;
    transform: scale(0);
    cursor: pointer;
  }

  @descendent tabbar {
    font-size: var(--secondaryFontSize);
    text-align: center;
    color: var(--secondaryColor);

    & .list__text:not(:first-child) {
      cursor: pointer;
    }

    & .list__text:not(:first-child):hover {
      color: var(--primaryColor);
    }
  }
}

@component icon_status {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--primaryColor);
  vertical-align: middle;
  cursor: pointer;
  @apply --margin-right;

  @modifier checked {
    background-image: url("../assets/gou.svg");
    background-repeat: no-repeat;
    background-size: 40px 40px;
    background-position: center center;
  }
}

.left {
  float: left;
}

.overflow_hide {
  overflow: hidden;
}

.right {
  float: right;
}
</style>
