import { useState, type FC } from 'react';
import { Button, Modal, Checkbox, Form, Input, Upload} from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import request from 'umi-request';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};



const AddCourse : React.FC = () => {
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
    request('/api/course/addCourse', {
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
  <Button type='primary' onClick={() => setVisiable(true)}>新增课程</Button>
    <Modal
      title="新增课程"
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
    <Form.Item<FieldType>
      label="课程名称"
      name="courseName"
      rules={[{ required: true, message: '请输入课程名称' }]}
    >
      <Input placeholder='请输入课程名称'/>
    </Form.Item>

    <Form.Item<FieldType>
      label="教师名称"
      name="TeacherName"
      rules={[{ required: true, message: '请输入教师名称' }]}
    >
      <Input placeholder='请输入教师名称'/>
    </Form.Item>    
    
    <Form.Item<FieldType>
      label="开设学期"
      name="semester"
      rules={[{ required: true, message: 'xxxx年x季学期  例:2023年夏季学期' }]}
    >
      <Input placeholder='xxxx年夏/秋季学期  例:2023年夏季学期'/>
    </Form.Item>
    <Form.Item
      name="上传课程图片"
      label="Upload"
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Upload name="logo" action="/upload.do" listType="picture">
        <Button icon={<UploadOutlined />}>Click to upload</Button>
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
 
export default AddCourse;
