import { HTTP_METHOD } from '@/constants';
import { request } from '@umijs/max';
import { message } from 'antd';
import { IResponse } from '../../../typings';
import * as types from './types';

export async function noteListApi(params: types.NoteListParams) {
    return request<IResponse<types.NoteListData>>('/api/v1/note/list', {
        method: HTTP_METHOD.POST,
        data: params,
    })
        .then((resp) => {
            if (resp.code > 0) {
                message.warning(resp.message);
            }
            return resp.data;
        })
        .catch((err) => {
            message.error(err);
            return err;
        });
}
