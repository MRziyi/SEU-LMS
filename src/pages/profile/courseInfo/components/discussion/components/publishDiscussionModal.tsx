import ProForm, {  ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Modal, Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { postPublishDiscussion } from '../../../service';
import { useModel } from 'umi';

interface modalCtrl {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    courseID: string;
}

const PublishDiscussionModal: React.FC<modalCtrl> = ({ open, setOpen, courseID}) => {
  const [show, setShow] = useState(false);
  const [currentCourseID, setCurrentCourseID] = useState<string>('');
  const [currentUserID, setCurrentUserID] = useState<string>('');
  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    if (courseID !== ''&&initialState&&initialState.currentUser){
        setCurrentCourseID(courseID);
        setCurrentUserID(initialState.currentUser.id);
    }
  }, [courseID]);

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    setOpen(show);
  }, [show]);


  const [form] = Form.useForm<{
    name: string;
    content:string;
  }>();

  return (
    <Modal
      title='发布讨论'
      width={500}
      open={open}
      okButtonProps={{ style: { display: 'none' } }}
      onCancel={() => {
        setShow(false);
        return true;
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ProForm<{
          name: string;
          content:string;
        }>
          form={form}
          autoFocusFirstInput
          onFinish={async (values) => {
            try {
              const { name, content } = values;
              console.log(name+' '+content);
              const response = await postPublishDiscussion(currentCourseID,currentUserID,name,content);
              if (response.code === 0) {
                message.success('发布成功');
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
  );
};
export default PublishDiscussionModal;
