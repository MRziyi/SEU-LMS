import ProForm, { ProFormDatePicker, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Modal, Form, message, Button } from 'antd';
import { useEffect, useState } from 'react';
import { postPublishHomework } from '../../../service';

interface modalInterface {
  syllabusID: string;
  refresh: () => void;
}

const PublishHomeworkModal: React.FC<modalInterface> = ({ syllabusID, refresh }) => {
  const [currentSyllabusID, setCurrentSyllabusID] = useState<string>('');
  const [visiable, setVisiable] = useState(false);

  useEffect(() => {
    if (syllabusID !== '') setCurrentSyllabusID(syllabusID);
  }, [syllabusID]);

  const [form] = Form.useForm<{
    name: string;
    description: string;
    deadline: string;
  }>();

  return (
    <>
      <Button onClick={() => setVisiable(true)} type="text">
        发布作业
      </Button>
      <Modal
        title="作业发布"
        width={500}
        open={visiable}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => {
          setVisiable(false);
          return true;
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ProForm<{
            name: string;
            description: string;
            deadline: string;
          }>
            form={form}
            autoFocusFirstInput
            onFinish={async (values) => {
              try {
                const { name, description, deadline } = values;
                const response = await postPublishHomework(
                  currentSyllabusID,
                  name,
                  description,
                  deadline,
                );
                if (response.code === 0) {
                  message.success('发布成功');
                  setVisiable(false);
                  refresh();
                } else message.error('发布失败');
              } catch (error) {
                message.error('提交出错');
              }
            }}
          >
            <ProFormText
              style={{ width: '50%' }}
              width="md"
              name="name"
              label={'作业标题'}
              placeholder="请输入名称"
              rules={[{ required: true }]}
            />
            <ProFormTextArea
              style={{ width: '50%' }}
              width="md"
              name="description"
              label={'作业描述'}
              placeholder="请输入内容"
              rules={[{ required: true }]}
            />
            <ProFormDatePicker
              name="deadline"
              label={'截止日期'}
              dataFormat="YYYY-MM-DD"
              rules={[{ required: true }]}
            />
          </ProForm>
        </div>
      </Modal>
    </>
  );
};
export default PublishHomeworkModal;
