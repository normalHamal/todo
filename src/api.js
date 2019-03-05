import axios from "axios";
import Vue from "vue";

const Message = Vue.prototype.$message;

// 设置不同环境下的api请求路径
const rootHttpUrl =
  process.env.NODE_ENV === "development"
    ? "https://nei.netease.com/api/apimock/d5c149aab781843ac5eacb9257ab172b"
    : window.location.origin;

const request = axios.create({
  baseURL: rootHttpUrl
});

// 添加一个请求拦截器
request.interceptors.request.use(
  function(config) {
    return config;
  },
  function() {
    return Message.error("请求失败，可能是网络出现了点问题");
  }
);

// 添加一个响应拦截器
request.interceptors.response.use(
  function(response) {
    if (response.data.code && response.data.code != 0) {
      return Message.error("请求失败，可能是服务器出现了点问题");
    }

    return response;
  },
  function() {
    return Message.error("请求失败，可能是服务器出现了点问题");
  }
);

export default {
  async getAllTasks() {
    let { data } = await request("/api/getAllTasks");
    return data;
  },
  async addTask(postData) {
    let { data } = await request({
      method: "post",
      url: "/api/addTask",
      data: postData
    });
    return data;
  },
  async updateTask(postData) {
    let { data } = await request({
      method: "post",
      url: "/api/updateTask",
      data: postData
    });
    return data;
  },
  async delTask(postData) {
    let { data } = await request({
      method: "post",
      url: "/api/delTask",
      data: postData
    });
    return data;
  },
  async fetchJson(url) {
    // 请求json文件就不用mock了
    let { data } = await axios(url);
    return data;
  }
};
