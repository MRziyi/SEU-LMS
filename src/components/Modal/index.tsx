import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Modal, Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';

interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  displayMessage: string;
  url: string;
  idParam?: string;
}

const MyModal: React.FC<modalCtrl> = ({ open, setOpen, title, displayMessage, url, idParam }) => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    if (idParam !== undefined) setId(idParam);
  }, [idParam]);

  const [form] = Form.useForm<{
    field: string;
  }>();

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Modal
      title={title}
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
          field: string;
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
                data: { field: field.field, id },
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
          onFinishFailed={(errorInfo: any) => {
            console.log('提交失败:', errorInfo);
          }}
        >
          <ProFormText
            style={{ width: '50%' }}
            width="md"
            name="field"
            label={displayMessage}
            placeholder="请输入相关信息"
            rules={[{ required: true }]}
          />
        </ProForm>
      </div>
    </Modal>
  );
};
export default MyModal;
