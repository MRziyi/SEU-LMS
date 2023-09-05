import { useState, type FC } from 'react';
import { Button, Modal, Checkbox, Form, Input, Upload, Select, Row, Col, Card} from 'antd';
import React from 'react';
import { ContactsOutlined, PhoneOutlined, UploadOutlined } from '@ant-design/icons';
import request from 'umi-request';
import { GridContent } from '@ant-design/pro-layout';
import styles from './index.less';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const { Option } = Select;

interface UserInfoProps {
  nickName: string;
  id: string;
  access: string;
  avatarUrl: string;
  phone: string;
  email: string;
}

const UserInfo : React.FC<UserInfoProps> = (props) => {
  const [visiable, setVisiable] = useState(false);
  const [form] = Form.useForm();
 
  const onOk = () => {
    closeModal();
  };
 
  const closeModal = () => {
    setVisiable(false);
  };

 
  return (
<>
  <Button type='link' onClick={() => setVisiable(true)}>详情</Button>
    <Modal
      title="用户详情"
      open={visiable}
      onOk={onOk}
      onCancel={closeModal}
      afterClose={closeModal}
      width={300}
      style={{
        height:'700px'
      }}
      centered = {true}
      footer={[
        <Button key="ok" type="primary" onClick={onOk}>
          确定
        </Button>,
      ]}
    >
        <GridContent>
        <Row gutter={10}>
          <Col lg={50}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <div>
              <img alt='头像'
              src={props.avatarUrl}
              style={{
                display: 'block',
                margin: '0 auto',
                maxWidth: '100px',  // 限制图片的最大宽度
                width: '100%',     // 让图片充满其容器的宽度
                marginBottom: '20px', 
              }}></img>
                  <hr/>    
              <div className={styles.name}>姓名:{props.nickName}</div>
              <div className={styles.name}>身份:{props.access}</div>
                <p style={{textAlign:'center'}}>
                <ContactsOutlined></ContactsOutlined>
                  <span>一卡通号:&nbsp;&nbsp;&nbsp;{props.id}</span>
                </p>
                <p style={{textAlign:'center'}}>
                <ContactsOutlined></ContactsOutlined>
                  <span>邮箱:&nbsp;&nbsp;&nbsp;{props.email}</span>
                </p>
                <p style={{textAlign:'center'}}>
                  <PhoneOutlined></PhoneOutlined>
                  <span>电话:&nbsp;&nbsp;&nbsp;{props.phone}</span>
                </p>
            </div>
          </Card>
          </Col>
        </Row>
      </GridContent>
    </Modal>
  </>
  )
  

};
 
export default UserInfo;
