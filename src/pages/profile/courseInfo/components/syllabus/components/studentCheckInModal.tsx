import { useState, type FC, useEffect } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import request from 'umi-request';
import { queryTeacherList } from '@/pages/dataVisualize/service';

const StudentCheckInModal: FC = () => {
  const [visiable, setVisiable] = useState(false);
  const [form] = Form.useForm();
  const [teacherList, setTeacherList] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getTeacherList('');
  }, []);

  async function getTeacherList(teacherName: string) {
    setLoading(true);
    const teacherResult = await queryTeacherList(teacherName);
    if (teacherResult.data.teacherList) {
      const newTabList = teacherResult.data.teacherList.map((element) => ({
        value: element.teacherID,
        label: element.teacherName,
      }));
      setTeacherList(newTabList);
    }
    setLoading(false);
  }

  const onOk = () => {
    closeModal();
  };

  const closeModal = () => {
    setVisiable(false);
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Button type="primary" onClick={() => setVisiable(true)}>
        新增课程
      </Button>
      <Modal
        title="新增课程"
        open={visiable}
        onOk={onOk}
        onCancel={closeModal}
        afterClose={closeModal}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={async (values) => {
            const { syllabusID, checkInPsw } = values;
            try {
              // 发送表单数据到服务器
              const response = await request<{
                data: number;
              }>('/api/syllabus/check-in', {
                method: 'POST',
                body: JSON.stringify({ syllabusID, checkInPsw }),
              });
              if (response.data === 1) {
                message.success('签到成功');
                closeModal();
              } else if (response.data === 0) message.error('签到密码错误');
              else if (response.data === -1) message.error('签到已停止');
              else message.error('签到异常');
            } catch (error) {
              message.error('提交出错');
            }
          }}
          autoComplete="off"
        >
          <Form.Item
            label="大纲ID"
            name="syllabusID"
            rules={[{ required: true }]}
            hidden
          ></Form.Item>
          <Form.Item
            label="签到密码"
            name="checkInPsw"
            rules={[{ required: true, message: '请输入签到密码' }]}
          >
            <Input placeholder="请输入签到密码" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Button type="primary" htmlType="submit" onClick={closeModal}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default StudentCheckInModal;
