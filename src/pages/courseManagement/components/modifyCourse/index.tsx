import { useState, type FC } from 'react';
import { Button, Modal, Checkbox, Form, Input, Upload, Select, message} from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import request from 'umi-request';



const filterOption = (input: string, option: { label: string; value: string }) =>
(option?.label ?? '').toLowerCase().includes(input.toLowerCase());



interface CourseInfoProps {
    courseID:string;
    courseName: string;
    imgUrl: string;
    semester: string;
    teacherName: string;
    teacherList:string[];
  }


const ModifyCourse : React.FC<CourseInfoProps> = (props) => {
  const [visiable, setVisiable] = useState(false);
  const [form] = Form.useForm();
  const [selectedTeacherName, setSelectedTeacherName] = useState<string>('');

 
  const onOk = () => {
    alert("!!ok");
    closeModal();
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setSelectedTeacherName(value);
  };
 
  const closeModal = () => {
    setVisiable(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    closeModal;
  };

  const handleSubmit = (formValues:any) => {

    closeModal();
    const { courseID } = props;
    const courseName = form.getFieldValue('courseName');
    // 如果输入框的值为空，则使用默认值
    if (!courseName) {
      formValues.courseName = props.courseName;
    }

    const semester = form.getFieldValue('semester');
    // 如果输入框的值为空，则使用默认值
    if (!semester) {
      formValues.semester = props.semester;
    }

    formValues.teacherName = selectedTeacherName || props.teacherName;

    //formValues.teacherName = selectedTeacherName;
    const params = {
        ...formValues,
        courseID, // 将 courseID 添加到 params 对象中
      };
      console.log("提交的教师名",selectedTeacherName,props.teacherName,formValues.teacherName)
    console.log('请求参数:', params,);
    request('/api/course/modify-course', {
      method: 'POST',
      data:params,
    })
      .then(() => {
        message.success("修改成功");
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

  const optionsArray = convertArrayToOptions(props.teacherList);
 
  return (
<>
  <Button type='link' onClick={() => setVisiable(true)}>修改</Button>
    <Modal
      title="课程修改"
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
      rules={[{  message: '请输入课程名称' }]}
    >
      <Input placeholder={props.courseName} defaultValue={props.courseName}/>
    </Form.Item>

    <Form.Item
      label="教师名称"
      name="teacherName"
      rules={[{  message: '请输入教师名称' }]}
    >
    <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    defaultValue={props.teacherName}
    onChange={onChange}
    filterOption={filterOption}
    options={optionsArray}
  />
    </Form.Item>    
    
    <Form.Item
      label="开设学期"
      name="semester"
      rules={[{  message: 'xxxx年x季学期  例:2023年夏季学期' }]}
    >
      <Input placeholder={props.semester} defaultValue={props.semester}/>
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
        <Button type="primary" htmlType="submit">
          提交
        </Button>
    </Form.Item>

  </Form>

      </Modal>
    </>
  )
  

};
 
export default ModifyCourse;
