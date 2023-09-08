import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { RouteChildrenProps } from 'react-router';
import type { RouteParams, tabKeyType } from './data.d';
import { useHistory, useModel, useParams, useRequest } from 'umi';
import { Button } from 'antd';
import Syllabus from './components/syllabus';
import Discussion from './components/discussion';
import { queryCourseName } from './service';
import Description from './components/description';
import StudentList from './components/studentList';
import SendCourseNotice from './components/sendCourseNotice';

const CourseInfo: React.FC<RouteChildrenProps> = () => {
  const { initialState } = useModel('@@initialState');
  const history = useHistory();
  const { courseID } = useParams<RouteParams>();

  const handleGoBack = () => {
    history.goBack();
  };

  const { data, loading } = useRequest(() => {
    return queryCourseName(courseID);
  });

  const [tabKey, setTabKey] = useState<tabKeyType>('1');

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === '1') {
      return <Description courseID={courseID} key="1" />;
    }
    if (tabValue === '2') {
      return <Syllabus courseID={courseID} key="2" />;
    }
    if (tabValue === '3') {
      return <Discussion courseID={courseID} key="3" />;
    }
    if (tabValue === '4') {
      return (
        <StudentList
          courseName={data?.courseName ? data.courseName : ''}
          courseID={courseID}
          key="4"
        />
      );
    }
    return null;
  };

  return (
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
        {
          key: '4',
          tab: '学生列表',
        },
      ]}
      header={{
        title: data?.courseName,
        ghost: true,
        breadcrumb: {},
      }}
      tabActiveKey={tabKey}
      onTabChange={(_tabKey: string) => {
        setTabKey(_tabKey as tabKeyType);
      }}
      extra={[
        <Button onClick={handleGoBack} key="1" type="primary">
          返回我的课程
        </Button>,
        initialState?.currentUser?.access == 'teacher' ? (
          <SendCourseNotice
            courseID={courseID}
            courseName={data?.courseName ? data.courseName : ''}
          />
        ) : (
          ''
        ),
      ]}
    >
      {renderChildrenByTabKey(tabKey)}
    </PageContainer>
  );
};
export default CourseInfo;
