import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { RouteChildrenProps } from 'react-router';
import { useModel } from 'umi';
import { message } from 'antd';
import { queryTeacherCourses } from './service';
import ChartForTeacher from './chartForTeacher';
import ChartForAdmin from './chartForAdmin';

const DataVisualize: React.FC<RouteChildrenProps> = () => {
  useEffect(() => {
    if (initialState?.currentUser?.access == 'teacher') getTeacherTab();
    else getAdminTab;
  }, []);

  const { initialState } = useModel('@@initialState');
  const [loadingForTab, setLoadingForTab] = useState<boolean>(false);
  const [tabList, setTabList] = useState<{ key: string; tab: string }[]>([]);

  async function getTeacherTab() {
    setLoadingForTab(true);
    try {
      if (initialState?.currentUser?.id) {
        const result = await queryTeacherCourses(initialState.currentUser.id);
        if (result.data.tabList) {
          message.success('课程数据拉取成功');
          const newTabList = result.data.tabList.map((element) => ({
            key: element.courseID,
            tab: element.courseName,
          }));
          setTabList(newTabList);
          setTabKey(result.data.tabList[0].courseID);
        }
      }
    } catch {}
    setLoadingForTab(false);
  }

  async function getAdminTab() {
    setLoadingForTab(true);
    setTabList([
      { key: '1', tab: 'Tab1' },
      { key: '2', tab: 'Tab2' },
    ]);
    setTabKey('1');

    setLoadingForTab(false);
  }
  // 渲染tab切换
  const renderChildrenByTabKey = (value: string, isTeacher: boolean) => {
    console.log('Randering :' + value);
    if (isTeacher)
      return (
        <ChartForTeacher
          key={value}
          courseID={value}
          loadingFather={loadingForTab}
        ></ChartForTeacher>
      );
    else
      return (
        <ChartForAdmin key={value} value={value} loadingFather={loadingForTab}></ChartForAdmin>
      );
  };

  const [tabKey, setTabKey] = useState<string>('');

  return (
    <PageContainer
      loading={loadingForTab || !initialState?.currentUser?.nickName}
      tabList={tabList}
      header={{
        title:
          '你好！' +
          initialState?.currentUser?.nickName +
          (initialState?.currentUser?.access == 'teacher' ? '老师' : '管理员'),
      }}
      tabActiveKey={tabKey}
      onTabChange={(_tabKey: string) => {
        setTabKey(_tabKey);
      }}
    >
      {renderChildrenByTabKey(tabKey, initialState?.currentUser?.access == 'teacher')}
    </PageContainer>
  );
};
export default DataVisualize;
