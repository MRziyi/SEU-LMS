import React, { useState } from "react";
import { Button, Col, DatePicker, Divider, Form, Input, Modal, Row, TimePicker } from "antd";
import moment from 'moment';
import {  message } from 'antd';
import request from 'umi-request';

interface syllabusParam{
    syllabusID:string
}
 
const ModifySyllabus: React.FC<syllabusParam> = (props) => {
 
  const [visiable, setVisiable] = useState(false);
  const [form] = Form.useForm();

  const closeModal = () => {
    setVisiable(false);
  };
 
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    closeModal();
  };
 
  return (
    <>
      <Button type="text" onClick={() => setVisiable(true)}>修改大纲信息</Button>
      <Modal
        title="修改大纲信息"
        open={visiable}
        footer={null}
        onCancel={closeModal}
      >


<Form
    name="basic"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    form={form}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    onFinish={async (values) => {

        const syllabusID = props.syllabusID;
        const { syllabusTitle, date, time } = values;
        const selectedDateTime = moment(date).format('YYYY-MM-DD') + ' ' + moment(time).format('HH:mm:ss');
        console.log('提交的时间：', selectedDateTime);
        try {
            // 发送表单数据到服务器

            const response = await request<{
              code: number;
            }>('/api/syllabus/modify', {
              method: 'POST',
              body: JSON.stringify({ syllabusID, syllabusTitle, selectedDateTime}),
            });
            if (response.code === 0) {
              message.success('新增成功');
              closeModal();
            } else message.error('新增失败');
          } catch (error) {
            message.error('提交出错');
          }
      }}
  >
    <Form.Item
        label="大纲标题"
        name="syllabusTitle"
        rules={[{ required: true, message: '请输入大纲标题' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
        label='请选择日期'
        name="date"
        rules={[{ required: true, message: '请选择日期' }]}
      >
        <DatePicker format='YYYY-MM-DD' />
      </Form.Item>


      <Form.Item
        label='请选择时间'
        name="time"
        rules={[{ required: true, message: '请选择时间' }]}
      >
        <TimePicker format='HH:mm:ss' />
      </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form.Item>
  </Form>
    


      </Modal>
    </>
  );
};
 
export default ModifySyllabus;
