import { useState } from 'react';
import { Button, Modal, Form, Input, Select, message } from 'antd';
import React from 'react';
import request from 'umi-request';

const { Option } = Select;

interface modalCtrl {
  onClose: () => void;
}

const AddUser: React.FC<modalCtrl> = ({ onClose }) => {
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
          initialValues={{ remember: true }}//输入框初始值
          onFinish={async (values) => {
            try {
              const { nickName, id, access } = values;
              const response = await request<{
                code: number;
              }>('/api/user/add-user', {
                method: 'POST',
                body: JSON.stringify({ nickName, id, access }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (response.code === 0) {
                message.success('添加成功');
                onClose();
                console.log('add user Refreshed');
                closeModal();
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
            name="id"
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
