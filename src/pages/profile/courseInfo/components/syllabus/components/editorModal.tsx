import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Button, Form, message } from 'antd';
import TextEditor from './textEditor';
import { request } from 'umi';

const { Item } = Form;

interface modalCtrl {
  disabled: boolean;
  syllabusID: string;
  haveHistory: boolean;
  title: string;
  body: string;
}

const EditorModal: React.FC<modalCtrl> = ({ disabled, syllabusID, haveHistory, title, body }) => {
  const [visiable, setVisiable] = useState(false);
  const [currentSyllabusID, setCurrentSyllabusID] = useState<string>('');
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [currentBody, setCurrentBody] = useState<string>('');
  const [currentHaveHistory, setCurrentHaveHistory] = useState<boolean>(false);
  const [currentDisabled, setCurrentDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (syllabusID !== '') setCurrentSyllabusID(syllabusID);
  }, [syllabusID]);

  useEffect(() => {
    if (title !== '') setCurrentTitle(title);
  }, [title]);

  useEffect(() => {
    if (body !== '') setCurrentBody(body);
  }, [body]);

  useEffect(() => {
    setCurrentHaveHistory(haveHistory);
  }, [haveHistory]);

  useEffect(() => {
    setCurrentDisabled(disabled);
  }, [disabled]);

  const [form] = Form.useForm();
  return (
    <>
      <Button
        type="primary"
        size="large"
        disabled={currentDisabled}
        onClick={() => {
          setVisiable(true);
        }}
      >
        {currentHaveHistory ? '继续使用在线富文本编辑器' : '开始使用在线富文本编辑器'}
      </Button>
      <Modal
        title={'作业提交'}
        width={700}
        open={visiable}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => {
          setVisiable(false);
          return true;
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Form
            layout="vertical"
            form={form}
            initialValues={{
              syllabusID: currentSyllabusID,
              homeworkTitle: haveHistory ? currentTitle : '',
              body: haveHistory ? currentBody : '',
            }}
            onFinish={async (values) => {
              try {
                // 发送表单数据到服务器
                const response = await request<{
                  code: number;
                }>('/api/syllabus/homework/post-text', {
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
          >
            <Form.Item label="大纲ID" name="syllabusID" hidden></Form.Item>

            <Form.Item
              label="作业标题"
              name="title"
              rules={[{ required: true, message: '请输入作业标题' }]}
            >
              <Input placeholder="请输入作业标题" />
            </Form.Item>
            <Item
              label="作业正文"
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
    </>
  );
};

export default EditorModal;
