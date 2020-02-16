import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('@/index'),
        meta: {
            title: '首页',
            requireAuth: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/login'),
        meta: {
            title: '登陆'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/register'),
        meta: {
            title: '注册'
        }
    }
]
const router = new VueRouter({
    base: '/profileSystem',
    mode: 'history',
    routes: routes
})

export default router