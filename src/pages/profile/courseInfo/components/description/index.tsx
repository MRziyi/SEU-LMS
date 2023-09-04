import {  Card, Col,Descriptions,Row} from 'antd';
import React from 'react';
import styles from './index.less';
import { useRequest } from 'umi';
import { queryCourseIntro } from '../../service';
import { GridContent } from '@ant-design/pro-layout';
import { ContactsOutlined, PhoneOutlined } from '@ant-design/icons';


interface CourseIDParam {
  courseID: string;
}


const Description: React.FC<CourseIDParam> = ({ courseID }) => {
    const { data, loading } = useRequest(() => {
        return queryCourseIntro(courseID);
      }); 

  return  (
    <GridContent>
      <Row gutter={24}>
        <Col lg={16} md={16} sm={24} xs={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            <Descriptions
                title="课程简介" 
                bordered 
            >
                <Descriptions.Item label="开课单位" span={2}>
                    {data?.courseData.description.unit}
                </Descriptions.Item>
                <Descriptions.Item label='学分' span={2}>
                    {data?.courseData.description.credit}
                </Descriptions.Item>
                <Descriptions.Item label='授课时间' span={4}>
                    {data?.courseData.description.teachingTime}
                </Descriptions.Item>
                <Descriptions.Item label='授课地点' span={2}>
                    {data?.courseData.description.teachingLocation}
                </Descriptions.Item>
                <Descriptions.Item label='授课方式' span={2}>
                    {data?.courseData.description.teachingMethod}
                </Descriptions.Item>
                <Descriptions.Item label='课程介绍' span={4}>
                    {data?.courseData.description.introduction}
                </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col lg={8} md={8} sm={24} xs={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            <div>
              <div className={styles.avatarHolder}>
                <img alt="" src={data?.courseData.teacherAvatar} />
                <div className={styles.name}>{data?.courseData.teacherName}</div>
              </div>
              <div className={styles.detail}>
                <p>
                  <ContactsOutlined
                    style={{
                      marginRight: 8,
                    }}
                  />
                  邮箱: {data?.courseData.teacherEmail}
                </p>
                <p>
                  <PhoneOutlined
                    style={{
                      marginRight: 8,
                    }}
                  />
                  手机号: {data?.courseData.teacherPhone}
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
