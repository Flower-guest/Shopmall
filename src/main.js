import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import toast from './components/common/toast/toast'

// 阻止启动生产消息
Vue.config.productionTip = false
// 添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
