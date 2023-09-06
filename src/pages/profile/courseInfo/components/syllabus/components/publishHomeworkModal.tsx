import ProForm, { ProFormDatePicker, ProFormText } from '@ant-design/pro-form';
import { Modal, Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { postPublishHomework } from '../../../service';

interface modalCtrl {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    syllabusID: string;
}

const PublishHomeworkModal: React.FC<modalCtrl> = ({ open, setOpen, syllabusID }) => {
  const [show, setShow] = useState(false);
  const [currentSyllabusID, setCurrentSyllabusID] = useState<string>('');

  useEffect(() => {
    if (syllabusID !== '') setCurrentSyllabusID(syllabusID);
  }, [syllabusID]);

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    setOpen(show);
  }, [show]);


  const [form] = Form.useForm<{
    name: string;
    description: string;
    deadline:string;
  }>();

  return (
    <Modal
      title='作业发布'
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
          description: string;
          deadline:string;
        }>
          form={form}
          autoFocusFirstInput
          onFinish={async (values) => {
            try {
              const { name, description, deadline } = values;
              console.log(name+' '+description+' '+deadline);
              const response = await postPublishHomework(currentSyllabusID,name, description, deadline);
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
            label={'作业标题'}
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormText
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
            dataFormat='YYYY-MM-DD'
          />
        </ProForm>
      </div>
    </Modal>
  );
};
export default PublishHomeworkModal;
