import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { message } from "antd";
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';
import { Note, NoteListData, NoteListParams } from '@/services/note/types';
import { noteListApi, noteTopicApi } from '@/services/note/api';


const columns: ProColumns<Note>[] = [
    {
        title: 'ID',
        dataIndex: 'id',
        search: false,
        width: 48,
    },
    {
        title: '标题',
        dataIndex: 'title',
        copyable: true,
        ellipsis: true,
        search: false,
    },
    {
        title: "关键词",
        dataIndex: 'keyword',
        hideInTable: true,
    },
    {
        title: '主题',
        dataIndex: 'topic',
        valueType: 'select',
        request: async () => {
            return await noteTopicApi().then((labels: string[]) => {
                let values = new Array();
                for (let index = 0; index < labels.length; index++) {
                    const label = labels[index];
                    values.push({ label: label, value: label })
                }
                return values
            }).catch(err => {
                return err
            });
        },
    },
    {
        title: '修改时间',
        key: 'showTime',
        dataIndex: 'updateTime',
        valueType: 'dateTime',
        sorter: true,
        hideInSearch: true,
    },
    {
        title: '时间',
        dataIndex: 'updateTimeRange',
        valueType: 'dateRange',
        hideInTable: true,
    },
    {
        title: '操作',
        valueType: 'option',
        key: 'option',
        render: (text: any, record: { id: any; url: string | undefined; }, _: any, action: { startEditable: (arg0: any) => void; reload: () => void; }) => [
            <a
                key="editable"
                onClick={() => {
                    action?.startEditable?.(record.id);
                }}
            >
                编辑
            </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                预览
            </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                设定任务
            </a>,
        ],
    },
];

export default () => {
    const actionRef = useRef<ActionType>();
    return (
        <ProTable<Note>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (
                params: {
                    pageSize: number;
                    current: number;
                    keyword: string;
                    topic: any;
                    updateTimeRange: any[];
                },
            ) => {
                let apiParams: NoteListParams = {
                    pager: {
                        index: params.current,
                        size: params.pageSize,
                    },
                    keyword: params.keyword,
                    topic: params.topic,
                }
                if (params.updateTimeRange !== undefined) {
                    apiParams.updateTimeRange = {
                        left: new Date(params.updateTimeRange[0]).getTime() / 1000 - 28800,
                        right: new Date(params.updateTimeRange[1]).getTime() / 1000 + 57600,
                    }
                }
                return await noteListApi(apiParams).then((data: NoteListData) => {
                    return {
                        data: data.list,
                        success: true,
                        total: data.pager.count,
                    }
                }).catch((err) => {
                    message.error(err)
                    return err
                });
            }}
            columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
                onChange(value: any) {
                    console.log('value: ', value);
                },
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            options={{
                setting: {
                    listsHeight: 400,
                },
            }}
            pagination={{
                pageSize: 20,
            }}
            dateFormatter="string"
            // headerTitle="我的文档"
            toolBarRender={() => [
                <Button
                    key="button"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        actionRef.current?.reload();
                    }}
                    type="primary"
                >
                    新建
                </Button>,
            ]}
        />
    );
};