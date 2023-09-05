import { useState, type FC } from 'react';
import { Button, Modal, Checkbox, Form, Input, Upload, Select} from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import request from 'umi-request';


const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const { Option } = Select;


const AddUser : React.FC = () => {
  const [visiable, setVisiable] = useState(false);
  const [form] = Form.useForm();
 
  const onOk = () => {
    closeModal();
  };
 
  const closeModal = () => {
    setVisiable(false);
  };

  const handleSubmit = (params:any) => {
    //alert("!!");
    console.log('请求参数:', params);
    request('/api/user/add-user', {
      method: 'POST',
      params
    })
      .then(() => {
        //alert('新增成功');
      })
      .catch((error) => {
        alert('创建失败，请重试');
      });
      form.resetFields();
    }
      
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
 
  return (
<>
  <Button type='primary' onClick={() => setVisiable(true)}>新建用户</Button>
    <Modal
      title="新增用户"
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
    initialValues={{ remember: true }}
    onFinish={handleSubmit}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="用户名"
      name="nickName"
      rules={[{ required: true, message: '请输入用户名称' }]}
    >
      <Input placeholder='请输入用户名称'/>
    </Form.Item>

    <Form.Item
      label="一卡通号"
      name="ID"
      rules={[{ required: true, message: '请输入一卡通号' }]}
    >
      <Input placeholder='请输入一卡通号'/>
    </Form.Item>    
    
    <Form.Item name="access" label="身份" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option"
          allowClear
        >
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
      <Input placeholder='请输入电子邮箱'/>
    </Form.Item>

    <Form.Item
      label="手机号"
      name="phone"
      rules={[{ required: true, message: '请输入手机号' }]}
    >
      <Input placeholder='请输入手机号'/>
    </Form.Item>

    <Form.Item
      name="avatarUrl"
      label="Upload"
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Upload name="logo" action="/upload.do" listType="picture">
        <Button icon={<UploadOutlined />}>上传头像</Button>
      </Upload>
    </Form.Item>      
    <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
        <Button type="primary" htmlType="submit" onClick={(closeModal)}>
          提交
        </Button>
    </Form.Item>

  </Form>

      </Modal>
    </>
  )
  

};
 
export default AddUser;
