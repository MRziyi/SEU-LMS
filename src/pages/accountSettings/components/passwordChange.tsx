import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { request, useModel } from 'umi';

const PasswordChange: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      name="dependencies"
      autoComplete="off"
      style={{ maxWidth: 600 }}
      layout="vertical"
      onFinish={async (values) => {
        const { ordiPassword, password } = values;
        try {
          // 发送表单数据到服务器
          const response = await request<{
            data: number;
          }>('/api/user/change-psw', {
            method: 'POST',
            body: JSON.stringify({ ordiPassword, password }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.data === 1) {
            message.success('修改成功');
            setInitialState((s) => ({ ...s, currentUser: undefined }));
          } else if (response.data === 0) {
            message.error('原密码错误');
          } else message.error('修改失败');
        } catch (error) {
          message.error('提交出错');
        }
      }}
    >
      {' '}
      <Form.Item label="原密码" name="ordiPassword" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item label="新密码" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      {/* Field */}
      <Form.Item
        label="确认密码"
        name="password2"
        dependencies={['password']}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('密码不一致！'));
            },
          }),
        ]}
        shouldUpdate={false}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" style={{ marginRight: '10px' }}>
          提交
        </Button>
        <Button htmlType="reset">重置</Button>
      </Form.Item>
    </Form>
  );
};

export default PasswordChange;
