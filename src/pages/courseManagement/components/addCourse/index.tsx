import { useState, type FC } from 'react';
import { Button, Modal, Checkbox, Form, Input, Upload, message} from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import request from 'umi-request';
import { Select } from 'antd';

interface Props{
  teacherList:string[];
}

const filterOption = (input: string, option: { label: string; value: string }) =>
(option?.label ?? '').toLowerCase().includes(input.toLowerCase());


const AddCourse : React.FC<Props> = (Props) => {
  const [visiable, setVisiable] = useState(false);
  const [form] = Form.useForm();
  const [selectedTeacherName, setSelectedTeacherName] = useState<string>('');

  //console.log(teacherList);




  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setSelectedTeacherName(value);
  };



  const onOk = () => {
    closeModal();
  };
 
  const closeModal = () => {
    setVisiable(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('创建失败，请重试');
  };

  const handleSubmit = (params:any) => {
    //alert("!!");
    console.log('请求参数:', params);
    params.teacherName = selectedTeacherName;
    request('/api/course/add', {
      method: 'POST',
      params
    })
      .then(() => {
        message.success('创建成功');
      })
      .catch((error) => {
        message.error('创建失败，请重试');
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

  function convertArrayToOptions(array:string[]) {
    return array.map((item) => ({
      value: item,
      label: item ,
    }));
  }
  
  const stringArray = ['jack', 'lucy', 'tom'];
  const optionsArray = convertArrayToOptions(Props.teacherList);
 
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
    <Form.Item
      label="课程名称"
      name="courseName"
      rules={[{ required: true, message: '请输入课程名称' }]}
    >
      <Input placeholder='请输入课程名称'/>
    </Form.Item>

    <Form.Item
      label="教师姓名"
      name='teacherName'
      rules={[{ required: true, message: '请输入教师姓名' }]}
    >
    <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    filterOption={filterOption}
    options={optionsArray}
  />
    </Form.Item>
    
    <Form.Item
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
