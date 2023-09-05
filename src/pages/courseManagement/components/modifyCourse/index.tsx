import { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Upload, Select, message } from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import request from 'umi-request';
import { queryTeacherList } from '@/pages/dataVisualize/service';

interface CourseInfoProps {
  courseID: string;
  courseName: string;
  imgUrl: string;
  semester: string;
  teacherName: string;
}

const ModifyCourse: React.FC<CourseInfoProps> = (props) => {
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
    alert("!!ok");
    closeModal();
  };

  const closeModal = () => {
    setVisiable(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    closeModal;
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
      <Button type="link" onClick={() => setVisiable(true)}>
        修改
      </Button>
      <Modal
        title="修改课程"
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
          initialValues={{
            courseID: props.courseID,
            courseName: props.courseName,
            // imgUrl: props.imgUrl,
            semester: props.semester,
            teacherName: props.teacherName,
          }}
          onFinish={async (values) => {
            const { courseID, courseName, teacherName, semester, imgUrl } = values;
            try {
              // 发送表单数据到服务器
              const response = await request<{
                code: number;
              }>('/api/course/modify', {
                method: 'POST',
                body: JSON.stringify({ courseID, courseName, teacherName, semester, imgUrl }),
              });
              if (response.code === 0) {
                message.success('新增成功');
                closeModal();
              } else message.error('新增失败');
            } catch (error) {
              message.error('提交出错');
            }
          }}
          autoComplete="off"
        >
          <Form.Item label="课程ID" name="courseID" hidden></Form.Item>
          <Form.Item
            label="课程名称"
            name="courseName"
            rules={[{ required: true, message: '请输入课程名称' }]}
          >
            <Input placeholder="请输入课程名称" />
          </Form.Item>

          <Form.Item
            label="教师姓名"
            name="teacherName"
            rules={[{ required: true, message: '请输入教师姓名' }]}
          >
            <Select
              showSearch
              placeholder="选择或搜索一位老师"
              optionFilterProp="children"
              onSearch={(value) => getTeacherList(value)}
              loading={loading}
              filterOption={filterOption}
              options={teacherList}
            />
          </Form.Item>

          <Form.Item
            label="开设学期"
            name="semester"
            rules={[{ required: true, message: 'xxxx年x季学期  例:2023年夏季学期' }]}
          >
            <Input placeholder="例:2023年夏季学期" />
          </Form.Item>
          <Form.Item
            name="imgUrl"
            label="上传课程图片"
            valuePropName="fileList"
            rules={[{ required: true, message: '请上传课程封面' }]}
            getValueFromEvent={normFile}
          >
            <Upload
              name="logo"
              listType="picture"
              customRequest={async (options: any) => {
                const data = new FormData();
                data.append('file', options.file);
                try {
                  const response = await request<{
                    code: number;
                  }>('/api/upload/image', {
                    method: 'POST',
                    body: data,
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                  if (response.code === 0) {
                    message.success('图片上传成功！');
                  } else message.error('图片上传失败！');
                } catch (error) {
                  message.error('提交出错');
                }
              }}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
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

export default ModifyCourse;
