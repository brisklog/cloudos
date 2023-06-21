import Guide from '@/components/Guide';
import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import { Space, Tag } from 'antd';

const HomePage: React.FC = () => {
    return (
        <PageContainer ghost>
            <div className={styles.container}>
                <Guide name={'cloudos'} />
            </div>
            TODO: 
            <Space size={[0, 8]} wrap>
                <Tag color="magenta">CPU占用</Tag>
                <Tag color="red">内存占用</Tag>
                <Tag color="volcano">硬盘占用</Tag>
                <Tag color="orange">系统进程</Tag>
                <Tag color="gold">最近访问</Tag>
                <Tag color="lime">大文件</Tag>
                <Tag color="green">系统动态</Tag>
                <Tag color="cyan">应用状态</Tag>
                <Tag color="geekblue">运行时间</Tag>
            </Space>

        </PageContainer>
    );
};

export default HomePage;
