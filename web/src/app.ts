// 运行时配置
import {history, RequestConfig, RequestError, RequestOptions} from '@umijs/max';
import {message} from "antd";
import * as store from "@/models/store";
import * as types from "@/services/user/types";
import {storage} from "@/models/store";
import {ignore_apis, TOKEN_KEY} from "@/constants";
import {refreshTokenApi} from "@/services/user/api";

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
    return {name: 'atopx'};
}

export const layout = () => {
    return {
        logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
        logout: () => {
            storage.remove(TOKEN_KEY)
            history.push("/login")
            message.info("退出登陆")
        },
        menu: {
            locale: false,

        },
    };
};

// 与后端约定的响应数据格式
interface IHeader {
    code: number,
    message: string,
    traceId: number,
}

interface IResponse {
    header: IHeader,
    data: any;
}


export const request: RequestConfig = {
    timeout: 60000,
    headers: {'Content-Type': 'application/json'},
    errorConfig: {
        errorThrower(resp: IResponse) {
            if (resp.header.code > 0) {
                const error: any = new Error(resp.header.message);
                error.info = resp.header;
                message.error(resp.header.message);
                throw error; // 抛出自制的错误
            }
        },
    },
    requestInterceptors: [
        (url, options: RequestOptions) => {
            options.headers = {'Content-Type': 'application/json', source: "desktop"}
            if (!ignore_apis.includes(url)) {
                const token = store.storage.get(TOKEN_KEY) as types.Token
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${token.access_token}`,
                }
                if (Date.now() < token.expire_time * 1000) {
                    refreshTokenApi(token.refresh_token).then(data => {
                        store.storage.set(TOKEN_KEY, data)
                    }).catch(err => {
                        history.push("/login")
                        message.warning(err)
                        Promise.reject()
                    })
                }
            }
            return {
                url: `${url}`,
                options: options,
            };
        },
    ],

    responseInterceptors: [
        // 直接写一个 function，作为拦截器
        (response) => {
            // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
            const {data = {} as any, config} = response;
            console.log(data);
            console.log(config);
            // do something
            return response;
        },
        [
            (response) => {
                return response;
            },
            (error: RequestError) => {
                console.log(error);
                return Promise.reject(error);
            },
        ],
    ],
};
