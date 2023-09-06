import { Modal } from 'antd';
import ReactQuill from 'react-quill';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Button, Form, Input, Typography } from 'antd';
import TextEditor from './textEditor';

const { Item } = Form;
const { TextArea } = Input;
const { Title } = Typography;

interface IPostCreate {
  body: string;
}

interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  syllabusID: string;
}

const EditorModal: React.FC<modalCtrl> = ({ open, setOpen, syllabusID }) => {
  const [value, setValue] = useState('');
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

  const [form] = Form.useForm();

  const onSubmit = (values: IPostCreate) => {
    // logic to submit form to server
    console.log(values.body);
    form.resetFields();
  };

  return (
    <Modal
      title={'作业提交'}
      width={700}
      open={open}
      okButtonProps={{ style: { display: 'none' } }}
      onCancel={() => {
        setShow(false);
        return true;
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Item
            name="body"
            rules={[
              {
                required: true,
                message: '请输入文本内容！',
              },
            ]}
          >
            {/* @ts-ignore */}
            <TextEditor />
          </Item>

          <Item style={{ marginTop: '-10px', marginBottom: '-10px' }}>
            <Button htmlType="submit" type="primary" style={{ marginRight: '10px' }}>
              提交
            </Button>
            <Button htmlType="reset">重置</Button>
          </Item>
        </Form>
      </div>
    </Modal>
  );
};

export default EditorModal;
