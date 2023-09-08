import { useState, type FC } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import request from 'umi-request';
import { useModel } from 'umi';

const QuestionModal: FC = () => {
  const [visiable, setVisiable] = useState(false);
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');

  const onOk = () => {
    closeModal();
  };

  const closeModal = () => {
    setVisiable(false);
  };

  return (
    <>
      <Button key="3" type="primary" onClick={() => setVisiable(true)}>
        创建提问
      </Button>
      ,
      <Modal
        title="创建提问"
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
            userID: initialState?.currentUser?.id,
          }}
          onFinish={async (values) => {
            try {
              // 发送表单数据到服务器
              const response = await request<{
                code: number;
              }>('/api/wiki/question', {
                method: 'POST',
                body: JSON.stringify({ ...values }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (response.code === 0) {
                message.success('提问成功');
                closeModal();
              } else message.error('提问异常');
            } catch (error) {
              message.error('提交出错');
            }
          }}
          autoComplete="off"
        >
          <Form.Item label="用户ID" name="userID" rules={[{ required: true }]} hidden></Form.Item>
          <Form.Item
            label="问题"
            name="question"
            rules={[{ required: true, message: '请输入想提问的问题' }]}
          >
            <Input placeholder="请输入想提问的问题" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default QuestionModal;
