import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import api from './api/mainApi'
import store from './store/index.js'
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios //全局注册axios,使用方法为this.$axios
axios.defaults.baseURL = '/api' //设置axios的baseURL，在axios请求时，所有的请求前面回默认加上/api
Vue.prototype.$api = api //全局注册api，使用方法为this.$api
Vue.prototype.$echarts = echarts //全局注册echarts

//路由判断登录，根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title
  store.state.token = sessionStorage.getItem('token')
  if (to.matched.some(record => record.meta.requireAuth)) { //判断该路由是否需要登陆权限
    if (store.state.token) { //判断当前的token是否存在；登陆时存入的token
      next();
    } else {
      next({ path: '/', query: { redirect: to.fullPath } }) //将跳转的路由path作为参数，登录成功后跳转到该路由
      console.log(to.fullPath);
      Vue.prototype.$message.warning('请先登录!') //在element中已经封装好了prototype,所以在其它组件中可以直接使用
    }                                            //在main.js中使用Vue.prototype.$message
  } else {
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
