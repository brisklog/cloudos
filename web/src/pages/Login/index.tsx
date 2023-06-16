import {LoginForm, PageContainer, ProConfigProvider, ProFormText} from '@ant-design/pro-components';

import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import styles from './index.less';
import {loginApi} from "@/services/user/api"
import React from "react";
import {history, Navigate} from "@umijs/max"
import {storage} from "@/models/store";
import {TOKEN_KEY} from "@/constants";
import {Token} from "@/services/user/types";
import {message} from "antd";


const onFinish = async (values: any) => {
    await loginApi({"username": values.username, "password": values.password}).then(() => {
        message.info("登陆成功")
        history.back()
    }).catch(err => {
        console.log("err", err)
    })
};

const LoginPage: React.FC = () => {
    // 如果已经登陆, 跳转到首页
    const token = storage.get(TOKEN_KEY) as Token
    if (token && token.expire_time > 0) {
        return <Navigate to="/"/>
    }
    return (
        <PageContainer ghost>
            <ProConfigProvider hashed={false}>
                <div style={{backgroundColor: 'white'}} className={styles.loginform}>
                    <LoginForm
                        title="CloudOS"
                        onFinish={onFinish}
                    >
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'}/>,
                            }}
                            placeholder={' 用户名'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'}/>,
                            }}
                            placeholder={' 密码'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />

                    </LoginForm>
                </div>
            </ProConfigProvider>
        </PageContainer>
    );
};

export default LoginPage;
