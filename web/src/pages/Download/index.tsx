import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
    return (
        <PageContainer
            ghost
            header={{ title: '离线下载' }}
        >
            <Button>干嘛？</Button>
        </PageContainer>
    );
};

export default AccessPage;
