import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { RouteChildrenProps } from 'react-router';
import type { RouteParams, tabKeyType } from './data.d';
import { useHistory, useModel, useParams, useRequest } from 'umi';
import { Button } from 'antd';
import Syllabus from './components/syllabus';
import Discussion from './components/discussion';
import { queryCourseName } from './service';
import MyModal from '@/components/Modal';
import Description from './components/description';

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
  const [openSendAnnouncement, setOpenSendAnnouncement] = useState<boolean>(false);

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
      ]}
      header={{
        title: data?.courseName,
        ghost: true,
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
          <Button key="2" onClick={() => setOpenSendAnnouncement(true)}>
            发布通知
            <MyModal
              open={openSendAnnouncement}
              setOpen={setOpenSendAnnouncement}
              displayMessage="公告内容"
              url="/api/order/message/send-to-class"
              idParam={courseID}
            />
          </Button>
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
