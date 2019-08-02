import Vue from 'vue'
import App from './App.vue'
// 导入包
import ElementUI from 'element-ui'
// 导入样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入路由配置
import router from '@/router'
// 导入axios
import axios from '@/api/axios'
Vue.prototype.$http = axios
// 注册到VUE实例
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  // 实例的路由对象
  router,
  render: h => h(App)
}).$mount('#app')
