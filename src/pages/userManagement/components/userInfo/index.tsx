import { useState } from 'react';
import { Button, Modal, Row, Col, Divider, Avatar } from 'antd';
import React from 'react';
import { ContactsOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from './index.less';

interface UserInfoProps {
  nickName: string;
  id: string;
  access: string;
  avatarUrl: string;
  phone: string;
  email: string;
}

const UserInfo: React.FC<UserInfoProps> = (props) => {
  const [visiable, setVisiable] = useState(false);

  const onOk = () => {
    closeModal();
  };

  const closeModal = () => {
    setVisiable(false);
  };

  return (
    <>
      <Button type="link" onClick={() => setVisiable(true)}>
        详情
      </Button>
      <Modal
        title="用户详情"
        open={visiable}
        onOk={onOk}
        onCancel={closeModal}
        afterClose={closeModal}
        width={350}
        style={{
          height: '600px',
        }}
        centered={true}
        footer
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Row gutter={10}>
            <Col lg={24}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar size={160} src={props.avatarUrl} />
              </div>
              <Divider></Divider>
              <div className={styles.name}>姓名: {props.nickName}</div>
              <div className={styles.name}>身份: {props.access}</div>
              <p style={{ textAlign: 'center' }}>
                <ContactsOutlined></ContactsOutlined>
                <span style={{ marginLeft: '10px' }}>一卡通号: {props.id}</span>
              </p>
              <p style={{ textAlign: 'center' }}>
                <MailOutlined />
                <span style={{ marginLeft: '10px' }}>邮箱: {props.email}</span>
              </p>
              <p style={{ textAlign: 'center' }}>
                <PhoneOutlined></PhoneOutlined>
                <span style={{ marginLeft: '10px' }}>电话: {props.phone}</span>
              </p>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default UserInfo;
