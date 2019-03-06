(function(t){function e(e){for(var s,r,o=e[0],c=e[1],l=e[2],d=0,p=[];d<o.length;d++)r=o[d],i[r]&&p.push(i[r][0]),i[r]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);u&&u(e);while(p.length)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],s=!0,o=1;o<n.length;o++){var c=n[o];0!==i[c]&&(s=!1)}s&&(a.splice(e--,1),t=r(r.s=n[0]))}return t}var s={},i={app:0},a=[];function r(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=s,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(n,s,function(e){return t[e]}.bind(null,s));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/todo/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var s=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page",attrs:{id:"app"}},[n("div",{staticClass:"page__title"},[t._v("TODO LIST")]),n("div",{staticClass:"page__prompt"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.task,expression:"task"}],staticClass:"page__input",attrs:{type:"text",placeholder:"What needs to be done?",autofocus:"",autocomplete:"off"},domProps:{value:t.task},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addTask(e)},input:function(e){e.target.composing||(t.task=e.target.value)}}})]),n("List",{directives:[{name:"show",rawName:"v-show",value:!!t.tasks.length,expression:"!!tasks.length"}],attrs:{tasksOrigin:t.tasks},on:{change:t.onchange}}),n("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],ref:"lottie",staticClass:"page__loading page__loading--on"})],1)},a=[],r=n("795b"),o=n.n(r),c=(n("5df3"),n("ac6a"),n("f499")),l=n.n(c),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"list"},[n("div",{staticClass:"list__menu overflow_hide"},[n("div",{class:t.classSwitch,on:{click:t.toggleAll}},[n("span",{class:t.classSwitchBot})]),n("div",{staticClass:"list__text"},[t._v("Active All Tasks")])]),t._l(t.tasks,function(e){return n("div",{key:e.id,staticClass:"list__item overflow_hide"},[n("div",{staticClass:"list__item_status",on:{click:function(n){return t.toggleCompleted(e)}}},[n("span",{class:t.itemStatus(e.completed)})]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.content,expression:"item.content"},{name:"todo-focus",rawName:"v-todo-focus",value:e==t.editedItem,expression:"item == editedItem"}],staticClass:"list__input",attrs:{type:"text"},domProps:{value:e.content},on:{blur:function(n){return t.finishUpdate(e,n)},keyup:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.finishUpdate(e,n)},input:function(n){n.target.composing||t.$set(e,"content",n.target.value)}}}),n("div",{class:t.isCompleted(e.completed),on:{dblclick:function(n){return t.updateContent(e)}}},[t._v("\n      "+t._s(e.content)+"\n    ")]),n("div",{staticClass:"list__item_remove",on:{click:function(n){return t.remove(e)}}})])}),n("div",{staticClass:"list__tabbar overflow_hide"},[n("span",{staticClass:"list__text left"},[t._v(t._s(t.countOfUncompleted)+" items left")]),n("span",{staticClass:"list__text right",on:{click:t.clearCompleted}},[t._v("Clear Completed")]),n("span",{class:t.classFilter[0],on:{click:t.filterAll}},[t._v("All")]),t._v(" |\n    "),n("span",{class:t.classFilter[1],on:{click:t.filterActive}},[t._v("Active")]),t._v(" |\n    "),n("span",{class:t.classFilter[2],on:{click:t.filterCompleted}},[t._v("Completed")])])],2)},d=[];n("28a5");function p(t){var e=this.split(" ");return this&&t?~e.indexOf(t)?e.slice(0,-1).join(" "):e.concat(t).join(" "):this}var f={props:["tasksOrigin"],data:function(){return{tasks:[],classFilter:["list__text","list__text","list__text"],classSwitch:"list__switch",classSwitchBot:"list__switch_bot",activeAll:!1,editedItem:null}},created:function(){this.tasks=JSON.parse(l()(this.tasksOrigin)),this.toggleActiveClass(0)},watch:{tasksOrigin:function(){this.tasks=JSON.parse(l()(this.tasksOrigin))}},computed:{countOfUncompleted:function(){return this.tasks.filter(function(t){return!t.completed}).length}},methods:{toggleAll:function(){var t=this,e=!1;this.classSwitch=p.call(this.classSwitch,"list__switch--on"),this.classSwitchBot=p.call(this.classSwitchBot,"list__switch_bot--on"),this.activeAll=!this.activeAll,this.tasks=this.tasks.map(function(n){return n.completed!==t.activeAll&&(e=!0),n.completed=t.activeAll,n}),e&&this.change()},itemStatus:function(t){return t?"icon_status icon_status--checked":"icon_status"},isCompleted:function(t){return t?"list__item_content list__item_content--delete":"list__item_content"},remove:function(t){var e=this.tasks;this.tasks=e.filter(function(e){return e!==t}),this.change()},toggleCompleted:function(t){t.completed=!t.completed,this.change()},change:function(){this.$emit("change",this.tasks)},filterAll:function(){this.tasks=this.tasksOrigin,this.toggleActiveClass(0)},filterActive:function(){this.tasks=this.tasksOrigin.filter(function(t){return!t.completed}),this.toggleActiveClass(1)},filterCompleted:function(){this.tasks=this.tasksOrigin.filter(function(t){return t.completed}),this.toggleActiveClass(2)},toggleActiveClass:function(t){this.classFilter=["list__text","list__text","list__text"],this.classFilter[t]+=" list__text--active"},clearCompleted:function(){var t=this;this.tasks.forEach(function(e){e.completed&&t.remove(e)})},updateContent:function(t){this.editedItem=t},finishUpdate:function(t,e){this.editedItem&&(this.editedItem=null,t.content=t.content.trim(),t.content?e.target.classList.remove("list__input--on"):this.remove(t))}},directives:{"todo-focus":function(t,e){e.value&&(t.classList.add("list__input--on"),t.focus())}}},h=f,m=(n("ffa0"),n("2877")),v=Object(m["a"])(h,u,d,!1,null,null,null),_=v.exports,g=n("2ef0"),k=n.n(g),w=n("94f1"),b=n.n(w),y={name:"app",components:{List:_},data:function(){return{task:"",loading:!0,cacheTasks:null,tasks:[],timeStart:null,minDuration:3e3,lottieInstance:null}},created:function(){var t=this;this.initLottie(),this.fetchTasks().then(function(){t.stopLoading()})},methods:{startLoading:function(){this.loading=!0,this.timeStart=new Date},stopLoading:function(){var t=this.minDuration-(new Date-this.timeStart);if(t>0)return setTimeout(this.stopLoading.bind(this),t);this.loading=!1},initLottie:function(){var t=this;this.$Api.fetchJson("/todo/loading.json").then(function(e){t.lottieInstance=b.a.loadAnimation({container:t.$refs.lottie,renderer:"svg",loop:!0,autoplay:!0,animationData:e}),t.startLoading()})},onchange:function(t){this.diff(),this.tasks=t},fetchTasks:function(){var t=this;return this.$Api.getAllTasks().then(function(e){t.tasks=e.data,t.cacheTasks=JSON.parse(l()(e.data))})},addTask:function(){this.task&&(this.tasks.push({completed:!1,content:this.task}),this.task="",this.onchange(this.tasks))},diff:k.a.debounce(function(){var t=this,e=[];this.cacheTasks.forEach(function(n){for(var s=!1,i=0,a=t.tasks.length;i<a;i++){var r=t.tasks[i];n.id===r.id&&(s=!0,n.content===r.content&&n.completed===r.completed||e.push(t.$Api.updateTask(r)))}s||e.push(t.$Api.delTask({id:n.id}))}),this.tasks.forEach(function(n){Object.hasOwnProperty.call(n,"id")||e.push(t.$Api.addTask(n))}),o.a.all(e).then(function(){t.fetchTasks().then(function(){t.$message({message:"数据已在后台进行了更新",type:"success"})})}).catch(function(){t.$message.error("数据更新出现了点问题，请刷新浏览器重试")})},4e3)}},x=y,O=(n("a5d2"),Object(m["a"])(x,i,a,!1,null,null,null)),C=O.exports,A=(n("0fb7"),n("450d"),n("f529")),T=n.n(A);s["default"].prototype.$message=T.a;n("96cf");var S=n("3b8d"),j=n("bc3a"),$=n.n(j),L=s["default"].prototype.$message,R="https://nei.netease.com/api/apimock/d5c149aab781843ac5eacb9257ab172b",I=$.a.create({baseURL:R});I.interceptors.request.use(function(t){return t},function(){return L.error("请求失败，可能是网络出现了点问题")}),I.interceptors.response.use(function(t){return t.data.code&&0!=t.data.code?L.error("请求失败，可能是服务器出现了点问题"):t},function(){return L.error("请求失败，可能是服务器出现了点问题")});var P={getAllTasks:function(){var t=Object(S["a"])(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,I("/api/getAllTasks");case 2:return e=t.sent,n=e.data,t.abrupt("return",n);case 5:case"end":return t.stop()}},t)}));function e(){return t.apply(this,arguments)}return e}(),addTask:function(){var t=Object(S["a"])(regeneratorRuntime.mark(function t(e){var n,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,I({method:"post",url:"/api/addTask",data:e});case 2:return n=t.sent,s=n.data,t.abrupt("return",s);case 5:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}(),updateTask:function(){var t=Object(S["a"])(regeneratorRuntime.mark(function t(e){var n,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,I({method:"post",url:"/api/updateTask",data:e});case 2:return n=t.sent,s=n.data,t.abrupt("return",s);case 5:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}(),delTask:function(){var t=Object(S["a"])(regeneratorRuntime.mark(function t(e){var n,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,I({method:"post",url:"/api/delTask",data:e});case 2:return n=t.sent,s=n.data,t.abrupt("return",s);case 5:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}(),fetchJson:function(){var t=Object(S["a"])(regeneratorRuntime.mark(function t(e){var n,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,$()(e);case 2:return n=t.sent,s=n.data,t.abrupt("return",s);case 5:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}()};s["default"].config.productionTip=!1,s["default"].prototype.$Api=P,new s["default"]({render:function(t){return t(C)}}).$mount("#app")},a5d2:function(t,e,n){"use strict";var s=n("f809"),i=n.n(s);i.a},a676:function(t,e,n){},f809:function(t,e,n){},ffa0:function(t,e,n){"use strict";var s=n("a676"),i=n.n(s);i.a}});