import {defineConfig} from '@umijs/max';

export default defineConfig({
    antd: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: 'cloudos',
    },
    proxy: {
        '/api/v1': {
            'target': 'http://127.0.0.1:18000',
            'changeOrigin': true,
        },
    },
    routes: [
        {
            name: '登陆',
            path: '/login',
            component: './Login',
            layout: false,
        },
        {
            name: '系统状态',
            path: '/',
            component: './Home',
            icon: "DashboardOutlined",
            wrappers: ["@/wrappers/auth"],
        },
        {
            name: '我的文档',
            path: '/doc',
            component: './Doc',
            icon: "FolderOutlined",
            wrappers: ["@/wrappers/auth"]
        },
        {
            name: '云盘管理',
            path: '/folder',
            component: './Folder',
            icon: "DatabaseOutlined",
            wrappers: ["@/wrappers/auth"]
        },
        {
            name: '应用管理',
            path: '/appstore',
            component: './Appstore',
            icon: "AppstoreOutlined",
            wrappers: ["@/wrappers/auth"]
        },
        {
            name: '离线下载',
            path: '/download',
            component: './Download',
            icon: "CloudDownloadOutlined",
            wrappers: ["@/wrappers/auth"]
        },
        {
            name: '回收站',
            path: '/trash',
            icon: "DeleteOutlined",
            component: './Trash',
            wrappers: ["@/wrappers/auth"]
        },
        {
            name: '控制面板',
            path: '/config',
            icon: "ControlOutlined",
            component: './Config',
            wrappers: ["@/wrappers/auth"]
        },
        
    ],
    npmClient: 'pnpm',
});
