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
        redirect: '/index/indexSelf',
        component: () => import('@/index'),
        children: [
            {
                path: 'indexSelf',
                name: 'indexSelf',
                component: () => import('@/indexSelf')
            },
            {
                path: 'fileInfoManagement',
                name: 'fileInfoManagement',
                component: () => import('@/fileInfoManagement')
            },
            {
                path: 'deletedFileManagement',
                name: 'deletedFileManagement',
                component: () => import('@/deletedFileManagement')
            },
            {
                path: 'accountManagement',
                name: 'accountManagement',
                component: () => import('@/accountManagement')
            },
            {
                path: 'messageBoard',
                name: 'messageBoard',
                component: () => import('@/messageBoard')
            }
        ],
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
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/profile'),
        meta: {
            title: '个人中心',
            requireAuth: true
        }
    }
]
const router = new VueRouter({
    base: '/profileSystem',
    mode: 'history',
    routes
})

export default router