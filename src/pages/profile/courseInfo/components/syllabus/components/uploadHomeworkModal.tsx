import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Modal, Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';

interface modalCtrl {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    syllabusID: string;
}

const DoubleInputModal: React.FC<modalCtrl> = ({ open, setOpen, syllabusID }) => {
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
    content: string;
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
          content: string;
        }>
          form={form}
          autoFocusFirstInput
          onFinish={async (field) => {
            try {
              const response = await request<{
                data: boolean;
              }>(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                data: { name: field.name, content: field.content, syllabusID: currentSyllabusID },
              });
              if (response.data) {
                message.success('提交成功');
                setOpen(false);
                return true;
              } else {
                message.error('提交失败，请重试');
                return false;
              }
            } catch (error) {
              message.error('提交失败，请重试');
              return false;
            }
          }}
        >
          <ProFormText
            style={{ width: '50%' }}
            width="md"
            name="name"
            label={'名称'}
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormText
            style={{ width: '50%' }}
            width="md"
            name="content"
            label={'内容'}
            placeholder="请输入内容"
            rules={[{ required: true }]}
          />
        </ProForm>
      </div>
    </Modal>
  );
};
export default DoubleInputModal;
