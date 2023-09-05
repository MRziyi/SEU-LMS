import { useState } from 'react';
import { Button, Modal, Form, Input, Select, message } from 'antd';
import React from 'react';
import request from 'umi-request';

const { Option } = Select;

const AddUser: React.FC = () => {
  const [visiable, setVisiable] = useState(false);
  const [form] = Form.useForm();

  const onOk = () => {
    closeModal();
  };

  const closeModal = () => {
    setVisiable(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisiable(true)}>
        新建用户
      </Button>
      <Modal title="新增用户" open={visiable} onOk={onOk} onCancel={closeModal} footer={null}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={async (values) => {
            try {
              const { nickName, ID, access } = values;
              const response = await request<{
                data: number;
              }>('/api/user/add-user', {
                method: 'POST',
                body: JSON.stringify({ nickName, ID, access }),
              });
              if (response.data === 0) {
                message.success('添加成功');
                closeModal;
              } else message.error('添加失败');
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

          <Form.Item
            label="一卡通号"
            name="ID"
            rules={[{ required: true, message: '请输入一卡通号' }]}
          >
            <Input placeholder="请输入一卡通号" />
          </Form.Item>

          <Form.Item name="access" label="身份" rules={[{ required: true }]}>
            <Select placeholder="Select a option" allowClear>
              <Option value="teacher">教师</Option>
              <Option value="student">学生</Option>
              <Option value="admin">管理员</Option>
            </Select>
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

export default AddUser;
