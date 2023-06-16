import {request} from '@umijs/max';
import * as types from "./types";
import * as store from "@/models/store";
import {HTTP_METHOD, TOKEN_KEY} from "@/constants";
import {IResponse} from "../../../typings";
import {message} from "antd";


export async function loginApi(
    body: {
        username: string;
        password: string;
    },
) {
    return request<IResponse<types.Token>>('/api/v1/user/login', {
        method: HTTP_METHOD.POST,
        data: body,
    }).then(resp => {
        if (resp.header.code > 0) {
            message.warning(resp.header.message)
        } else {
            store.storage.set(TOKEN_KEY, resp.data)
        }
        return resp.data
    }).catch(err => {
        message.error(err)
        return err
    })
}

export async function refreshTokenApi(refresh_token: string) {
    return request<IResponse<types.Token>>('/api/v1/user/refresh', {
        method: HTTP_METHOD.POST,
        data: {refresh_token: refresh_token},
    }).then(resp => {
        if (resp.header.code > 0) {
            message.warning(resp.header.message)
        } else {
            store.storage.set(TOKEN_KEY, resp.data)
        }
        return resp.data
    }).catch(err => {
        message.error(err)
        return err
    })
}
