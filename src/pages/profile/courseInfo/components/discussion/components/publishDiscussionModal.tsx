import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Modal, Form, message, Button } from 'antd';
import { useEffect, useState } from 'react';
import { postPublishDiscussion } from '../../../service';
import { FormOutlined } from '@ant-design/icons';

interface modalInterface {
  courseID: string;
  refresh: () => void;
}

const PublishDiscussionModal: React.FC<modalInterface> = ({ courseID, refresh }) => {
  const [currentCourseID, setCurrentCourseID] = useState<string>('');
  const [visiable, setVisiable] = useState(false);

  useEffect(() => {
    if (courseID !== '') setCurrentCourseID(courseID);
  }, [courseID]);

  const [form] = Form.useForm<{
    name: string;
    content: string;
  }>();

  return (
    <>
        <Button 
           type="primary" 
           shape="round" 
           size='large'
           onClick={() => {
            setVisiable(true);
           }}
         >
           <FormOutlined />发布讨论
         </Button>
      <Modal
        title="发布讨论"
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
            content: string;
          }>
            form={form}
            autoFocusFirstInput
            onFinish={async (values) => {
              try {
                const { name, content } = values;
                const response = await postPublishDiscussion(currentCourseID, name, content);
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
              label={'讨论标题'}
              placeholder="请输入标题"
              rules={[{ required: true }]}
            />
            <ProFormTextArea
              style={{ width: '50%' }}
              width="md"
              name="content"
              label={'讨论内容'}
              placeholder="请输入内容"
              rules={[{ required: true }]}
            />
          </ProForm>
        </div>
      </Modal>
    </>
  );
};
export default PublishDiscussionModal;
