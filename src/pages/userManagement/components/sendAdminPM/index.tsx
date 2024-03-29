import { useState, useEffect } from 'react';
import { Button, Modal, Input, message, Row, Col, Divider } from 'antd';
import React from 'react';
import { sendPM } from '@/pages/profile/courseInfo/service';
interface UserInfoProps {
  id: string;
  nickName: string;
}

const SendAdminPM: React.FC<UserInfoProps> = ({ id, nickName }) => {
  const [answer, setAnswer] = useState<string>(''); // 使用状态管理 TextArea 的值
  const [visiable, setVisiable] = useState(false);
  const [currentID, setCurrentID] = useState<string>('');
  const [currentNickName, setCurrentNickName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState('');

  const changeValue = (e: any) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    if (id && id !== '') setCurrentID(id);
    if (nickName && nickName !== '') setCurrentNickName(nickName);
  }, [id, nickName]);

  const { TextArea } = Input;

  async function sendPrivateMessageAdaptor() {
    setLoading(true);
    try {
      const result = await sendPM(currentID, value, '私信');
      if (result.code == 0) {
        message.success('私信发送成功');
        setValue('');
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
        title="私信用户"
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
              value={value}
              onChange={changeValue}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default SendAdminPM;
