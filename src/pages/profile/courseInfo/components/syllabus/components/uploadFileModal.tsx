import { Modal, message, Upload, Form, Button, Input } from 'antd';
import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { request } from 'umi';

interface modalInterface {
  syllabusID: string;
  isLarge: boolean;
}

const { Dragger } = Upload;

const UploadFileModal: React.FC<modalInterface> = ({ syllabusID, isLarge }) => {
  const [visiable, setVisiable] = useState(false);
  const [form] = Form.useForm();

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      {isLarge ? (
        <Button
          type="primary"
          size="large"
          style={{ display: 'flex' }}
          onClick={() => setVisiable(true)}
        >
          上传课件资料
        </Button>
      ) : (
        <Button type="text" onClick={() => setVisiable(true)}>
          上传课件资料
        </Button>
      )}
      <Modal
        title={'课件资料'}
        width={700}
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
            syllabusID: syllabusID,
          }}
          onFinish={async (values) => {
            const { name, content, fileUrl, syllabusID } = values;
            try {
              // 发送表单数据到服务器
              const response = await request<{
                code: number;
              }>('/api/syllabus/material/upload', {
                method: 'POST',
                body: JSON.stringify({ name, content, fileUrl, syllabusID }),
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
          <Form.Item label="大纲ID" name="syllabusID" hidden></Form.Item>

          <Form.Item
            label="课件名称"
            name="name"
            rules={[{ required: true, message: '请输入课件名称' }]}
          >
            <Input placeholder="请输入课件名称" />
          </Form.Item>
          <Form.Item
            label="课件描述"
            name="content"
            rules={[{ required: true, message: '请输入课件描述' }]}
          >
            <Input placeholder="请输入课件描述" />
          </Form.Item>
          <Form.Item label="课件路径" name="fileUrl" hidden></Form.Item>
          <Form.Item
            name="fileUpload"
            label="上传课件文件"
            rules={[{ required: true, message: '请上传课件文件' }]}
            getValueFromEvent={normFile}
          >
            <Dragger
              style={{}}
              name="file"
              multiple={false}
              action="/api/upload/file"
              maxCount={1}
              onChange={(info) => {
                const { status } = info.file;
                if (status === 'done') {
                  if (info.file.response && info.file.response.code == 0)
                    form.setFieldValue('fileUrl', info.file.response.data);
                } else if (status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text" style={{ marginLeft: '20px', marginRight: '20px' }}>
                点击或拖拽文件到此区域以上传
              </p>
              <p className="ant-upload-hint">多个课件请多次上传</p>
            </Dragger>
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
export default UploadFileModal;
