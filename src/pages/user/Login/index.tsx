import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import styles from './index.less';

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
    return userInfo?.access;
  };
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({
        ...values,
        type,
      });
      if (msg.data) {
        console.log(msg);
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        const access = await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位 置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        history.push(redirect || '/');

        if (
          (access == 'student' && initialState?.settings?.primaryColor != '#13C2C2') ||
          (access == 'teacher' && initialState?.settings?.primaryColor != '#722ED1') ||
          (access == 'admin' && initialState?.settings?.primaryColor != '#1890ff')
        )
          window.location.reload();
        return;
      }
      console.log(msg);
    } catch (error) {
      // const defaultLoginFailureMessage = '登录失败，请重试！';
      // message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="东南大学教学管理系统 SEU-LMS"
          subTitle="专为东大师生服务的教学管理系统"
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'一卡通号登录'} />
            <Tabs.TabPane key="verify" tab={'统一身份验证登录'} />
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'一卡通号: '}
                rules={[
                  {
                    required: true,
                    message: '一卡通号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码: '}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <a
                style={{
                  float: 'right',
                  marginBottom: 10,
                }}
              >
                忘记密码 ?
              </a>
            </>
          )}

          {type === 'verify' && <></>}
          <div
            style={{
              marginBottom: 24,
            }}
          />
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
