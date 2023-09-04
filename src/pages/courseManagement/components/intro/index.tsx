import { useState, type FC, useEffect } from 'react';
import { Button, Modal, Space, Image, Row, Col, Card } from 'antd';
import React from 'react';
import { ProSkeleton } from '@ant-design/pro-components';
import { Layout } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import styles from './index.less';
import { ContactsOutlined, PhoneOutlined } from '@ant-design/icons';
import { TeacherData } from './data';
import { queryTeacherInfo } from './service';
import { request } from 'umi';
interface CourseInfoProps {
  courseName: string;
  imgUrl: string;
  teacherAvatar: string;
  semester: string;
  teacherName: string;
  description: string;
  courseID:string
}



const CourseInfo: FC<CourseInfoProps> = (props) => {
  const [visiable, setVisiable] = useState(false);
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        const response = await queryTeacherInfo(props.courseID);
        setTeacherData(response.data.teacherData);
      } catch (error) {
        console.error('Error fetching teacher info:', error);
      }
    };

    fetchTeacherInfo();
  }, [props.courseID]);


  const onOk = () => {
    console.log("编写自己的onOk逻辑");
    closeModal();
  };
 
  const closeModal = () => {
    setVisiable(false);
  };
 
  return (
<>
    <Button type='link' onClick={() => setVisiable(true)}>详情</Button>
   <Modal 
      title="课程详情"
      open={visiable}
      onOk={onOk}
      onCancel={closeModal}
      afterClose={closeModal}
      width={700}

      footer={
        [<Button onClick={onOk} type='primary'>完成</Button>]
      }
    >

{/* <div id="head" style={{ width: '100%', height: '30px', backgroundColor: 'white' }}>


</div> */}

      <GridContent>
        <Row gutter={15}>
          <Col lg={12}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
              <div>
                <img alt="课程图片" 
                src={props.imgUrl} 
                style={{
                  display: 'block',
                  margin: '0 auto',
                  width: '80%',  // 调整图片的宽度
                  marginBottom: '20px',  // 在图片下方添加 10px 的距离
                }}
                />
                <div className={styles.name}>{props.courseName}</div>
                <p>
                  <span><strong>开设学期:&nbsp;&nbsp;&nbsp;</strong>{props.semester}</span>
                </p>
                <p>
                  <span><strong>课程描述:&nbsp;&nbsp;&nbsp;</strong>{props.description}</span>
                </p>
              </div>
          </Card>
          </Col>
          <Col lg={12}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <div>
              <img alt='教师图片'
              src={props.teacherAvatar}
              style={{
                display: 'block',
                margin: '0 auto',
                width: '100px',  // 调整图片的宽度
                marginBottom: '20px',  // 在图片下方添加 10px 的距离
              }}></img>
              <div className={styles.name}>{props.teacherName}</div>
                
                <p style={{textAlign:'center'}}>
                <ContactsOutlined></ContactsOutlined>
                  <span>邮箱:&nbsp;&nbsp;&nbsp;{teacherData?.teacherEmail}</span>
                </p>
                <p style={{textAlign:'center'}}>
                  <PhoneOutlined></PhoneOutlined>
                  <span>电话:&nbsp;&nbsp;&nbsp;{teacherData?.teacherPhone}</span>
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
 
export default CourseInfo;
