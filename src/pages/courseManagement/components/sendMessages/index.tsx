import { useState, useEffect } from 'react';
import { Button, Modal, Input, message, Row, Col, Divider } from 'antd';
import React from 'react';
import { sendPrivateMessage } from './service';
interface CourseInfoProps {
  CourseID: string
}

const SendMessages: React.FC<CourseInfoProps> = ({ CourseID }) => {
  const [answer, setAnswer] = useState<string>(''); // 使用状态管理 TextArea 的值
  const [visiable, setVisiable] = useState(false);
  const [currentID, setCurrentID] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (CourseID && CourseID !== '') setCurrentID(CourseID);
  }, [CourseID]);

  const { TextArea } = Input;

  async function sendPrivateMessageAdaptor() {
    setLoading(true);
    try {
      const result = await sendPrivateMessage(currentID, answer);
      if (result.code == 0) {
        message.success('私信发送成功');
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
      <Button loading={loading} type="link" onClick={() => setVisiable(true)}>
        发送通知
      </Button>
      <Modal
        title="发送全体通知"
        open={visiable}
        onOk={onOk}
        onCancel={closeModal}
        afterClose={closeModal}
      >
        <Row gutter={50}>
          <Col span={24}>
            <p>
              <b>发布通知:</b>
            </p>
            <Divider />
            <TextArea
              rows={3}
              placeholder="请输入私信内容"
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

export default SendMessages;
