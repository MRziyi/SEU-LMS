import { useState, type FC } from 'react';
import { Button, Modal, Checkbox, Form, Input, Upload, Select, message, Row, Col, Divider} from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import request from 'umi-request';
import { sendPrivateMessage } from './service';



interface UserInfoProps {
  id:string;
  nickName:string;

}



const SendMessage : React.FC<UserInfoProps> = (props) => {
  const [answer, setAnswer] = useState<string>(''); // 使用状态管理 TextArea 的值
  const [visiable, setVisiable] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;

  
  const onOk = () => {

    sendPrivateMessage(props.id,answer);
    message.success("发送成功");
    closeModal();
  };
 
  const closeModal = () => {
    setVisiable(false);
  };

  return (
<>
  <Button type='link' onClick={() => setVisiable(true)}>私信</Button>
    <Modal
      title="新增用户"
      open={visiable}
      onOk={onOk}
      onCancel={closeModal}
      afterClose={closeModal}
    >
    <Row gutter={50}>

    <Col span={24} >
      <p><b>私信对象</b>:&nbsp;&nbsp;&nbsp;{props.nickName}</p>
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
  )
  

};
 
export default SendMessage;
