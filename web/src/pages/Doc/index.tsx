import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';
import { Note, NoteListData } from '@/services/note/types';
import { noteListApi } from '@/services/note/api';


const columns: ProColumns<Note>[] = [
    {
        title: 'ID',
        dataIndex: 'id',
        search: false,
        width: 48,
    },
    {
        title: '标题',
        dataIndex: 'name',
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
        disable: true,
        title: '主题',
        dataIndex: 'topicName',
        search: false,
    },
    {
        title: '更新时间',
        key: 'showTime',
        dataIndex: 'updateTime',
        valueType: 'date',
        sorter: true,
        hideInSearch: true,
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        valueType: 'dateRange',
        hideInTable: true,
        search: {
            transform: (value: any[]) => {
                return {
                    start: value[0],
                    end: value[1],
                };
            },
        },
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
                },
                sort: any,
                filter: { keyword: string; updateTime: { start: number, end: number } },
            ) => {
                return await noteListApi({
                    pager: {
                        index: params.current,
                        size: params.pageSize,
                    },
                    // topicId: 0, 
                    keyword: filter.keyword
                }).then((data: NoteListData) => {
                    console.log("success?", data.list)
                    return {
                        data: data.list,
                        success: true,
                        total: data.pager.count,
                    }
                }).catch((err) => {
                    console.log("error?")
                    return {
                        data: err,
                        success: false,
                        total: 0,
                    }
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
            form={{
                // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                syncToUrl: (values: { start: any; end: any; }, type: string) => {
                    if (type === 'get') {
                        return {
                            ...values,
                            createTime: [values.start, values.end],
                        };
                    }
                    return values;
                },
            }}
            pagination={{
                pageSize: 10,
                onChange: (page: number) => console.log(page),
            }}
            dateFormatter="string"
            headerTitle="高级表格"
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