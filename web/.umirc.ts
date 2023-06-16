import {defineConfig} from '@umijs/max';

export default defineConfig({
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: 'cloudos',
    },
    proxy: {
        '/api/v1': {
            'target': 'http://super.itmeng.top',
            'changeOrigin': true,
        },
    },
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            name: '登陆',
            path: '/login',
            component: './Login',
            layout: false,
        },
        {
            name: '首页',
            path: '/home',
            component: './Home',
            wrappers: ["@/wrappers/auth"],
        },
        {
            name: '权限演示',
            path: '/access',
            component: './Access',
            wrappers: ["@/wrappers/auth"]
        },
    ],
    npmClient: 'pnpm',
});
