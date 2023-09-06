import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { RouteChildrenProps } from 'react-router';
import { useModel } from 'umi';
import { Select, Space } from 'antd';
import { queryCourseList, queryTeacherList } from './service';
import ChartForTeacher from './chartForTeacher';
import GeneralOverview from './chartForAdmin/generalOverview';
import CourseStatistics from './chartForAdmin/courseStatistics';
import TeacherStatistics from './chartForAdmin/teacherStatistics';

const DataVisualize: React.FC<RouteChildrenProps> = () => {
  useEffect(() => {
    if (initialState?.currentUser?.access == 'teacher') {
      getTeacherTab();
    } else {
      getAdminTab();
    }
  }, []);

  const { initialState } = useModel('@@initialState');
  const [loadingForTab, setLoadingForTab] = useState<boolean>(false);
  const [tabList, setTabList] = useState<{ key: string; tab: string }[]>([]);
  const [teacherSelectList, setTeacherSelectList] = useState<{ value: string; label: string }[]>(
    [],
  );
  const [courseSelectList, setCourseSelectList] = useState<{ value: string; label: string }[]>([]);
  const [defaultTeacherValue, setDefaultTeacherValue] = useState<string>('');
  const [defaultCourseValue, setDefaultCourseValue] = useState<string>('');
  const [currentTeacherValue, setCurrentTeacherValue] = useState<string>('');
  const [currentCourseValue, setCurrentCourseValue] = useState<string>('');

  async function getTeacherTab() {
    setLoadingForTab(true);
    try {
      if (initialState?.currentUser?.id) {
        const result = await queryCourseList();
        if (result.data.descriptionList) {
          const newTabList = result.data.descriptionList.map((element) => ({
            key: element.courseID,
            tab: element.courseName,
          }));
          console.log(newTabList);
          setTabList(newTabList);
          setTabKey(result.data.descriptionList[0].courseID);
        }
      }
    } catch {}
    setLoadingForTab(false);
  }

  async function getAdminTab() {
    setLoadingForTab(true);
    setTabList([
      { key: '1', tab: '总体概览' },
      { key: '2', tab: '教师统计' },
      { key: '3', tab: '课程统计' },
    ]);
    setTabKey('1');
    //获取管理员数据可视化的教师列表
    const teacherResult = await queryTeacherList('');
    if (teacherResult.data.teacherList) {
      const newTabList = teacherResult.data.teacherList.map((element) => ({
        value: element.teacherID,
        label: element.teacherName,
      }));
      setTeacherSelectList(newTabList);
      setDefaultTeacherValue(teacherResult.data.teacherList[0].teacherID);
      setCurrentTeacherValue(teacherResult.data.teacherList[0].teacherID);
    }

    //获取管理员数据可视化的课程列表
    const courseResult = await queryCourseList();
    if (courseResult.data.descriptionList) {
      const newTabList = courseResult.data.descriptionList.map((element) => ({
        value: element.courseID,
        label: element.courseName,
      }));
      setCourseSelectList(newTabList);
      setDefaultCourseValue(courseResult.data.descriptionList[0].courseID);
      setCurrentCourseValue(courseResult.data.descriptionList[0].courseID);
    }

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
    else {
      if (value === '1') return <GeneralOverview></GeneralOverview>;
      else if (value === '2')
        return <TeacherStatistics teacherID={currentTeacherValue}></TeacherStatistics>;
      else return <CourseStatistics courseName={currentCourseValue}></CourseStatistics>;
    }
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
          (initialState?.currentUser?.access == 'teacher' ? ' 老师' : ' 管理员'),
      }}
      tabActiveKey={tabKey}
      onTabChange={(_tabKey: string) => {
        setTabKey(_tabKey);
      }}
      extra={
        initialState?.currentUser?.access == 'admin' ? (
          tabKey === '1' ? (
            ''
          ) : tabKey === '2' ? (
            <Space>
              <b style={{ fontSize: '13pt' }}>统计教师：</b>
              <Select
                key={'1'}
                defaultValue={defaultTeacherValue}
                style={{ width: 120 }}
                onChange={(value) => {
                  setCurrentTeacherValue(value);
                }}
                options={teacherSelectList}
              />
            </Space>
          ) : (
            <Space>
              <b style={{ fontSize: '13pt' }}>统计课程：</b>
              <Select
                key={'2'}
                defaultValue={defaultCourseValue}
                style={{ width: 120 }}
                onChange={(value) => {
                  setCurrentCourseValue(value);
                }}
                options={courseSelectList}
              />
            </Space>
          )
        ) : (
          ''
        )
      }
    >
      {renderChildrenByTabKey(tabKey, initialState?.currentUser?.access == 'teacher')}
    </PageContainer>
  );
};
export default DataVisualize;
