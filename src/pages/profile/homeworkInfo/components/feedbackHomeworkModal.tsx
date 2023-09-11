import { Modal, Form, message, Button, Rate } from 'antd';
import { useEffect, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { request } from 'umi';

interface modalInterface {
  homeworkID: string;
  parentRefresh: ()=>void;
}

const FeedbackHomeworkModal: React.FC<modalInterface> = ({ homeworkID }) => {
  const [currentHomeworkID, setCurrentHomeworkID] = useState<string>('');
  const [visiable, setVisiable] = useState(false);

  useEffect(() => {
    if (homeworkID !== '') setCurrentHomeworkID(homeworkID);
  }, [homeworkID]);

  const [form] = Form.useForm<{
    name: string;
    description: string;
    deadline: string;
  }>();

  return (
    <>
      <Button onClick={() => setVisiable(true)} type="text">
        作业批改
      </Button>
      <Modal
        title="作业批改"
        width={500}
        open={visiable}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => {
          setVisiable(false);
          return true;
        }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            homeworkID: currentHomeworkID,
          }}
          onFinish={async (values) => {
            try {
              // 发送表单数据到服务器
              const response = await request<{
                code: number;
              }>('/api/syllabus/homework/feedback', {
                method: 'POST',
                body: JSON.stringify({ ...values }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (response.code === 0) {
                message.success('新增成功');
                setVisiable(false);
              } else message.error('新增失败');
            } catch (error) {
              message.error('提交出错');
            }
          }}
          autoComplete="off"
        >
          <Form.Item label="作业ID" name="homeworkID" hidden></Form.Item>

          <Form.Item
            label="作业评分"
            name="rate"
            rules={[{ required: true, message: '请对作业进行评分' }]}
          >
            <Rate allowHalf defaultValue={2.5} />
          </Form.Item>
          <Form.Item
            label="作业反馈"
            name="feedback"
            rules={[{ required: true, message: '请输入作业反馈' }]}
          >
            <TextArea placeholder="请输入作业反馈" />
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
export default FeedbackHomeworkModal;
