import { useState, type FC } from 'react';
import { Button, Modal } from 'antd';
import React from 'react';
 
const AddCourse : React.FC = () => {
  const [visiable, setVisiable] = useState(false);
 
  const onOk = () => {
    console.log("编写自己的onOk逻辑");
    closeModal();
  };
 
  const closeModal = () => {
    setVisiable(false);
  };
 
  return (
<>
      <Button type='primary' style={{width:'80%'}} onClick={() => setVisiable(true)}>新增课程</Button>
      <Modal
        title="按钮+弹窗"
        open={visiable}
        onOk={onOk}
        onCancel={closeModal}
        afterClose={closeModal}
      >
        <p>弹窗内容</p>
      </Modal>
    </>
  )
  

};
 
export default AddCourse;
