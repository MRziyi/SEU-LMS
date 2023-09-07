import { useState, type FC } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import request from 'umi-request';
import { useModel } from 'umi';

interface modalInterface {
  syllabusID: string;
  canCheckIn: boolean;
}

const StudentCheckInModal: FC<modalInterface> = ({ syllabusID, canCheckIn }) => {
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
      <Button type="primary" size="small" disabled={!canCheckIn} onClick={() => setVisiable(true)}>
        签到
      </Button>
      <Modal
        title="进行签到"
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
            syllabusID: syllabusID,
            userID: initialState?.currentUser?.id,
          }}
          onFinish={async (values) => {
            const { syllabusID, checkInPsw } = values;
            try {
              // 发送表单数据到服务器
              const response = await request<{
                data: number;
              }>('/api/syllabus/check-in', {
                method: 'POST',
                body: JSON.stringify({ syllabusID, checkInPsw }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (response.data === 1) {
                message.success('签到成功');
                closeModal();
              } else if (response.data === 0) message.error('签到密码错误');
              else if (response.data === -1) message.error('签到已停止');
              else message.error('签到异常');
            } catch (error) {
              message.error('提交出错');
            }
          }}
          autoComplete="off"
        >
          <Form.Item
            label="大纲ID"
            name="syllabusID"
            rules={[{ required: true }]}
            hidden
          ></Form.Item>
          <Form.Item
            label="签到密码"
            name="checkInPsw"
            rules={[{ required: true, message: '请输入签到密码' }]}
          >
            <Input placeholder="请输入签到密码" />
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

export default StudentCheckInModal;
