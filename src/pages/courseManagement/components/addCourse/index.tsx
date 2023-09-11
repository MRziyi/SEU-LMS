import { useState, type FC } from 'react';
import { Button, Modal, Form, Input, Upload, message, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import request from 'umi-request';
import { Select } from 'antd';
import { queryTeacherList } from '@/pages/dataVisualize/service';

interface modalCtrl {
  refresh: () => void;
}

const AddCourse: React.FC<modalCtrl> = ({ refresh }) => {
  const [visiable, setVisiable] = useState(false);
  const [form] = Form.useForm();
  const [teacherList, setTeacherList] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
      <Button
        type="primary"
        onClick={() => {
          getTeacherList('');
          setVisiable(true);
        }}
      >
        新增课程
      </Button>
      <Modal title="新增课程" open={visiable} onCancel={closeModal} footer={null} width={1000}>

        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 1000 }}
          initialValues={{ remember: true }}
          onFinish={async (values) => {
            const { courseName, teacherName, semester, imgUrl, unit, credit, teachingTime, teachingLocation, teachingMethod, introduction } = values;
            try {
              // 发送表单数据到服务器
              const response = await request<{
                code: number;
              }>('/api/course/add', {
                method: 'POST',
                body: JSON.stringify({ courseName, teacherName, semester, imgUrl,
                  unit, credit, teachingTime, teachingLocation, teachingMethod, introduction }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (response.code === 0) {
                message.success('新增成功');
                refresh();
                console.log('add course refreshed');
                closeModal();
              } else message.error('新增失败');
            } catch (error) {
              message.error('提交出错');
            }
          }}
          autoComplete="off"
        >
      <Row gutter={100}>
            <Col lg={12}>      
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
            label="开课单位"
            name="unit"
            rules={[{ required: true, message: '请输入开课单位' }]}
          >
            <Input placeholder="请输入开课单位名称" />
          </Form.Item>


          <Form.Item label="课程封面" name="imgUrl" hidden></Form.Item>
          <Form.Item
            name="imgUpload"
            label="上传课程图片"
            valuePropName="fileList"
            rules={[{ required: true, message: '请上传课程封面' }]}
            getValueFromEvent={normFile}
          >
            <Upload
              name="file"
              listType="picture"
              action={'/api/upload/image'}
              onChange={(value) => {
                const { status } = value.file;
                if (status === 'done') {
                  if (value.file.response && value.file.response.code == 0)
                    form.setFieldValue('imgUrl', value.file.response.data);
                } else if (status === 'error') {
                  message.error(`${value.file.name} file upload failed.`);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>    
              {/* 左半部分结束 */}
          </Col>

          <Col lg={12}>
          {/* 右半部分开始 */}
          <Form.Item
            label="学分"
            name="credit"
            rules={[{ required: true, message: '请输入学分数' }]}
          >
            <Input placeholder="请输入学分数" />
          </Form.Item>
          
          <Form.Item
            label="开课时间"
            name="teachingTime"
            rules={[{ required: true, message: '请输入开课时间' }]}
          >
            <Input placeholder="请输入开课时间" />
          </Form.Item>
          
          <Form.Item
            label="上课地点"
            name="teachingLocation"
            rules={[{ required: true, message: '请输入上课地点' }]}
          >
            <Input placeholder="请输入上课地点" />
          </Form.Item>

          <Form.Item
            label="授课方式"
            name="teachingMethod"
            rules={[{ required: true, message: '请输入授课方式' }]}
          >
          <Select
            style={{ width: 120 }}
            options={[
              { value: '线上', label: '线上' },
              { value: '线下', label: '线下' },
            ]}
          />
          </Form.Item>

          <Form.Item
            label="课程简介"
            name="introduction"
            rules={[{ required: true, message: '请输入课程简介' }]}
          >
            <Input placeholder="请输入课程简介" />
          </Form.Item>

          </Col>
          </Row>

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

export default AddCourse;
