import { useState, useEffect } from 'react';
import { Button, Modal, Input, message, Row, Col, Divider } from 'antd';
import React from 'react';
import { sendNotice } from '../../service';
interface UserInfoProps {
  courseID: string;
  courseName: string;
}

const SendCourseNotice: React.FC<UserInfoProps> = ({ courseID, courseName }) => {
  const [answer, setAnswer] = useState<string>(''); // 使用状态管理 TextArea 的值
  const [visiable, setVisiable] = useState(false);
  const [currentID, setCurrentID] = useState<string>('');
  const [currentCourseName, setCurrentCourseName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (courseID && courseID !== '') setCurrentID(courseID);
    if (courseName && courseName !== '') setCurrentCourseName(courseName);
  }, [courseID, courseName]);

  const { TextArea } = Input;

  async function sendPrivateMessageAdaptor() {
    setLoading(true);
    try {
      const result = await sendNotice(currentID, answer, courseName + ' 通知');
      if (result.code == 0) {
        message.success('通知发送成功');
        setAnswer('');
        closeModal();
      }
    } catch {}
    setLoading(false);
  }

  const onOk = () => {
    sendPrivateMessageAdaptor();
  };

  const closeModal = () => {
    setVisiable(false);
  };

  return (
    <>
      <Button loading={loading} onClick={() => setVisiable(true)}>
        发布通知
      </Button>
      <Modal
        title="发布通知"
        open={visiable}
        onOk={onOk}
        onCancel={closeModal}
        afterClose={closeModal}
      >
        <Row gutter={50}>
          <Col span={24}>
            <p>
              <b>通知课程</b>: {currentCourseName}
            </p>
            <Divider />
            <TextArea
              rows={3}
              placeholder="请输入通知内容"
              maxLength={600} // 你可以根据需要调整最大长度
              value={answer} // 使用状态管理 TextArea 的值
              onChange={(e) => setAnswer(e.target.value)} // 在输入变化时更新状态
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default SendCourseNotice;
