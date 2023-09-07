import { Card, Col, Descriptions, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { queryCourseIntro } from '../../service';
import { GridContent } from '@ant-design/pro-layout';
import { ContactsOutlined, PhoneOutlined } from '@ant-design/icons';
import { CourseData } from '../../data';

interface CourseIDParam {
  courseID: string;
}

const Description: React.FC<CourseIDParam> = ({ courseID }) => {
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState<CourseData>({} as CourseData);

  useEffect(() => {
    queryCourseIntroAdaptor();
  }, []);

  async function queryCourseIntroAdaptor() {
    setLoading(true);
    try {
      console.log('Sending!!');
      const result = await queryCourseIntro(courseID);
      if (result && result.data && result.data.courseData) {
        message.success('详情获取成功');
        setCourseData(result.data.courseData);
      }
    } catch {}
    setLoading(false);
  }

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={16} md={16} sm={24} xs={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            <Descriptions title="课程简介" bordered>
              <Descriptions.Item label="开课单位" span={2}>
                {courseData.description?.unit}
              </Descriptions.Item>
              <Descriptions.Item label="学分" span={2}>
                {courseData.description?.credit}
              </Descriptions.Item>
              <Descriptions.Item label="授课时间" span={4}>
                {courseData.description?.teachingTime}
              </Descriptions.Item>
              <Descriptions.Item label="授课地点" span={2}>
                {courseData.description?.teachingLocation}
              </Descriptions.Item>
              <Descriptions.Item label="授课方式" span={2}>
                {courseData.description?.teachingMethod}
              </Descriptions.Item>
              <Descriptions.Item label="课程介绍" span={4}>
                {courseData.description?.introduction}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col lg={8} md={8} sm={24} xs={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            <div>
              <div className={styles.avatarHolder}>
                <img alt="" src={courseData.teacherAvatar} />
                <div className={styles.name}>{courseData.teacherName}</div>
              </div>
              <div className={styles.detail}>
                <p>
                  <ContactsOutlined
                    style={{
                      marginRight: 8,
                    }}
                  />
                  邮箱: {courseData.teacherEmail}
                </p>
                <p>
                  <PhoneOutlined
                    style={{
                      marginRight: 8,
                    }}
                  />
                  手机号: {courseData.teacherPhone}
                </p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};

export default Description;
