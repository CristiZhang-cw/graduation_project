import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

//路由判断登录，根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title
  if (to.matched.some(record => record.meta.requireAuth)) { //判断该路由是否需要登陆权限
    if (localStorage.token) { //判断当前的token是否存在；登陆时存入的token
      next();
    } else {
      next({ path: '/', query: { redirect: to.fullPath } }) //将跳转的路由path作为参数，登录成功后跳转到该路由
      console.log(to.fullPath);
    }
  } else {
    next();
  }
})
