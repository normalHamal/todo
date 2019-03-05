import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
// 必须在引入element插件后引入api.js，因为api.js依赖element.js
import Api from "./api";

Vue.config.productionTip = false;
Vue.prototype.$Api = Api;

new Vue({
  render: h => h(App)
}).$mount("#app");
