import React, { useState } from 'react';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import type { RouteChildrenProps } from 'react-router';
import type { RouteParams, tabKeyType } from './data.d';
import { useHistory, useParams, useRequest } from 'umi';
import { Button, Card, Col, Row } from 'antd';
import { ContactsOutlined, PhoneOutlined } from '@ant-design/icons';
import Syllabus from './components/syllabus';
import Discussion from './components/discussion';
import { queryCourseIntro } from './service';
import styles from './index.less';

const CourseInfo: React.FC<RouteChildrenProps> = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  const { courseID } = useParams<RouteParams>();

  const { data, loading } = useRequest(() => {
    return queryCourseIntro(courseID);
  });

  const [tabKey, setTabKey] = useState<tabKeyType>('1');

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === '1') {
      return (
        <GridContent>
          <Row gutter={24}>
            <Col lg={16} md={16} sm={24} xs={24}>
              <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
                {data?.courseData.description}
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
    }
    if (tabValue === '2') {
      return <Syllabus courseID={courseID} key="2" />;
    }
    if (tabValue === '3') {
      return <Discussion courseID={courseID} key="3" />;
    }
    return null;
  };

  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        loading={loading}
        tabList={[
          {
            key: '1',
            tab: '课程简介',
          },
          {
            key: '2',
            tab: '课程大纲',
          },
          {
            key: '3',
            tab: '讨论区',
          },
        ]}
        header={{
          title: data?.courseData.courseName,
          ghost: true,
        }}
        tabActiveKey={tabKey}
        onTabChange={(_tabKey: string) => {
          setTabKey(_tabKey as tabKeyType);
        }}
        extra={
          <Button onClick={handleGoBack} type="primary">
            返回我的课程
          </Button>
        }
      >
        {renderChildrenByTabKey(tabKey)}
      </PageContainer>
    </div>
  );
};
export default CourseInfo;
