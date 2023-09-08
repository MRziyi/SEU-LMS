import { useState, useEffect } from 'react';
import { Button, Modal, Input, message, Row, Col, Divider } from 'antd';
import React from 'react';
import { sendPrivateMessage } from '@/pages/profile/courseInfo/components/studentList/components/sendMessage/service';
interface UserInfoProps {
  id: string;
  nickName: string;
}

const SendMessage: React.FC<UserInfoProps> = ({ id, nickName }) => {
  const [answer, setAnswer] = useState<string>(''); // 使用状态管理 TextArea 的值
  const [visiable, setVisiable] = useState(false);
  const [currentID, setCurrentID] = useState<string>('');
  const [currentNickName, setCurrentNickName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id && id !== '') setCurrentID(id);
    if (nickName && nickName !== '') setCurrentNickName(nickName);
  }, [id, nickName]);

  const { TextArea } = Input;

  async function sendPrivateMessageAdaptor() {
    setLoading(true);
    try {
      const result = await sendPrivateMessage(currentID, answer, '私信');
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
        私信
      </Button>
      <Modal
        title="新增用户"
        open={visiable}
        onOk={onOk}
        onCancel={closeModal}
        afterClose={closeModal}
      >
        <Row gutter={50}>
          <Col span={24}>
            <p>
              <b>私信对象</b>: {currentNickName}
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

export default SendMessage;
