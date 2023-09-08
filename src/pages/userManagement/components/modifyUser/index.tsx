import { useState } from 'react';
import { Button, Modal, Form, Input, Upload, Select, message } from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import request from 'umi-request';

const { Option } = Select;
interface UserInfoProps {
  nickName: string;
  id: string;
  access: string;
  avatarUrl: string;
  phone: string;
  email: string;
  refresh: () => void;
}

const ModifyUser: React.FC<UserInfoProps> = (props) => {
  const [visiable, setVisiable] = useState(false);
  const [form] = Form.useForm();

  const onOk = () => {
    closeModal();
  };

  const closeModal = () => {
    setVisiable(false);
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <Button type="link" onClick={() => setVisiable(true)}>
        修改
      </Button>
      <Modal
        title="修改用户"
        open={visiable}
        onOk={onOk}
        onCancel={closeModal}
        afterClose={closeModal}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            nickName: props.nickName,
            id: props.id,
            access: props.access,
            email: props.email,
            phone: props.phone,
            avatarUrl: props.avatarUrl,
          }}
          onFinish={async (values) => {
            try {
              const { nickName, id, access, email, phone, avatarUrl } = values;
              const response = await request<{
                code: number;
              }>('/api/user/modify-user', {
                method: 'POST',
                body: JSON.stringify({ nickName, id, access, email, phone, avatarUrl }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (response.code === 0) {
                message.success('修改成功');
                props.refresh();
                closeModal();
              } else message.error('修改失败');
            } catch (error) {
              message.error('提交出错');
            }
          }}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="nickName"
            rules={[{ required: true, message: '请输入用户名称' }]}
          >
            <Input placeholder="请输入用户名称" />
          </Form.Item>

          <Form.Item label="一卡通号" name="id" rules={[{ required: true }]} hidden></Form.Item>

          <Form.Item name="access" label="身份" rules={[{ required: true }]}>
            <Select placeholder="Select a option" allowClear>
              <Option value="teacher">教师</Option>
              <Option value="student">学生</Option>
              <Option value="admin">管理员</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="电子邮箱"
            name="email"
            rules={[{ required: true, message: '请输入电子邮箱' }]}
          >
            <Input placeholder="请输入电子邮箱" />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            label="头像"
            name="avatarUrl"
            hidden
            rules={[{ required: true, message: '请上传用户头像' }]}
          ></Form.Item>
          <Form.Item
            name="imgUpload"
            label="上传用户头像"
            valuePropName="fileList"
            rules={[{ message: '请上传用户头像' }]}
            getValueFromEvent={normFile}
          >
            <Upload
              name="file"
              listType="picture"
              action={'/api/upload/image'}
              onChange={(value) => {
                const { status } = value.file;
                if (status === 'done') {
                  if (value.file.response && value.file.response.code == 0)
                    form.setFieldValue('avatarUrl', value.file.response.data);
                } else if (status === 'error') {
                  message.error(`${value.file.name} file upload failed.`);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Button htmlType="submit" type="primary" style={{ marginRight: '10px' }}>
              提交
            </Button>
            <Button htmlType="reset">重置</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModifyUser;
