import { ProList } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import { noteListApi } from '@/services/note/api';
import { Note } from '@/services/note/types';

export default () => (
    <ProList<Note>
        toolBarRender={() => {
            return [
                <Button key="3" type="primary">
                    新建
                </Button>,
            ];
        }}
        search={{}}
        rowKey="id"
        headerTitle="基础列表"
        request={noteListApi}
        pagination={{ pageSize: 10 }}
        showActions="hover"
        metas={{
            name: {
                dataIndex: 'name',
                title: '标题',
                search: false,
            },
            topicName: {
                dataIndex: 'topicName',
                title: '主题',
                search: false,
            },
            createTime: {
                dataIndex: 'createTime',
                title: "创建时间",
                search: false,
            },
            updateTime: {
                dataIndex: 'updateTime',
                title: "更新时间",
                search: false,
            },
            subTitle: {
                dataIndex: 'labels',
                render: (_, row) => {
                    return (
                        <Space size={0}>
                            {row.labels?.map((label: { name: string }) => (
                                <Tag color="blue" key={label.name}>
                                    {label.name}
                                </Tag>
                            ))}
                        </Space>
                    );
                },
                search: false,
            },
            actions: {
                render: (text: string, row: Note) => [
                    <a
                        href={row.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        key="link"
                    >
                        链路
                    </a>,
                    <a
                        href={row.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        key="warning"
                    >
                        报警
                    </a>,
                    <a
                        href={row.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        key="view"
                    >
                        查看
                    </a>,
                ],
                search: false,
            },
            status: {
                // 自己扩展的字段，主要用于筛选，不在列表中显示
                title: '状态',
                valueType: 'select',
                valueEnum: {
                    all: { text: '全部', status: 'Default' },
                    open: {
                        text: '未解决',
                        status: 'Error',
                    },
                    closed: {
                        text: '已解决',
                        status: 'Success',
                    },
                    processing: {
                        text: '解决中',
                        status: 'Processing',
                    },
                },
            },
        }}
    />
);