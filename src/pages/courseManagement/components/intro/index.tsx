import { useState, type FC, useEffect } from 'react';
import { Button, Modal, Row, Col, Avatar } from 'antd';
import styles from './index.less';
import { ContactsOutlined, PhoneOutlined } from '@ant-design/icons';
import { TeacherData } from './data';
import { queryTeacherInfo } from './service';
interface CourseInfoProps {
  courseName: string;
  imgUrl: string;
  teacherAvatar: string;
  semester: string;
  teacherName: string;
  description: string;
  courseID: string;
}

const CourseInfo: FC<CourseInfoProps> = (props) => {
  const [visiable, setVisiable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teacherEmailData, setTeacherEmailData] = useState<string>('');
  const [teacherPhoneData, setTeacherPhoneData] = useState<string>('');
  async function getTeacherIntro() {
    setLoading(true);
    try {
      const response = await queryTeacherInfo(props.courseID);
      setTeacherEmailData(response.data.teacherEmail);
      setTeacherPhoneData(response.data.teacherPhone);
    } catch (error) {}
    setLoading(false);
  }

  const onOk = () => {
    closeModal();
  };

  const closeModal = () => {
    setVisiable(false);
  };

  return (
    <>
      <Button
        loading={loading}
        type="link"
        onClick={() => {
          getTeacherIntro();
          setVisiable(true);
        }}
      >
        详情
      </Button>
      <Modal
        title="课程详情"
        open={visiable}
        onOk={onOk}
        onCancel={closeModal}
        afterClose={closeModal}
        width={700}
        footer={[
          <Button onClick={onOk} type="primary">
            完成
          </Button>,
        ]}
      >
        <div>
          <Row gutter={100}>
            <Col lg={12}>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <img
                    alt="课程图片"
                    src={props.imgUrl}
                    style={{
                      display: 'block',
                      margin: '0 auto',
                      width: '100%', // 调整图片的宽度
                      marginBottom: '20px', // 在图片下方添加 10px 的距离
                    }}
                  />
                  <div className={styles.name}>{props.courseName}</div>
                  <p>
                    <span>
                      <strong>开设学期: </strong>
                      {props.semester}
                    </span>
                  </p>
                  <p>
                    <span>
                      <strong>课程描述: </strong>
                      {props.description}
                    </span>
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={12}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Avatar size={160} src={props.teacherAvatar} style={{ marginBottom: '20px' }} />
                </div>
                <div className={styles.name}>{props.teacherName}</div>

                <p>
                  <ContactsOutlined></ContactsOutlined>
                  <span style={{ marginLeft: '10px' }}>邮箱: {teacherEmailData}</span>
                </p>
                <p>
                  <PhoneOutlined></PhoneOutlined>
                  <span style={{ marginLeft: '10px' }}>电话: {teacherPhoneData}</span>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default CourseInfo;
