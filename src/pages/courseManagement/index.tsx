import { useState, type FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Link, useModel, useRequest } from 'umi';
import { Avatar, Button, Divider, Input, List, Modal, Space, Typography, Tag } from 'antd';
import AddCourse from './components';
import { CourseListData } from './data';
import { queryCourseList } from './service';
import { ProList } from '@ant-design/pro-components';
import request from 'umi-request';


const CourseManagement: FC<Record<string, any>> = () => {


  const [courseList, setCourseList] = useState<CourseListData[]>([])
  //  获取用户信息
  const { initialState } = useModel('@@initialState');

  const { loading } = useRequest(
    () => {
      if (initialState && initialState.currentUser && initialState.currentUser.id)
        return queryCourseList();
      else throw 'Please Login!';
    },
    {
      onSuccess: (result: any) => {
        setCourseList(result.list);
      },
    },
  );




  return <PageContainer
    header={{
      extra: [
        <Input.Search
          placeholder="请输入课程名称"
          enterButton="搜索"
          size="middle"
          // onSearch={handleFormSubmit}}
        />,
      ],
    }}
  >
    
  <Divider orientation="left" orientationMargin="200">课程列表</Divider>
  <div style={{float:'left',width:'10%'}}>
    <AddCourse></AddCourse>
  </div>

  <div style={{float:'left',width:'85%'}}>
  <List
    itemLayout="horizontal"
    bordered
    dataSource={courseList}
    
    renderItem={(item, index) => (
      <List.Item extra={
        <Space>
          <Button type="link">详情</Button>
          <Button type="link">修改</Button>
          <Button type="link">删除</Button>
        </Space>
      }>
        <List.Item.Meta
          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
          title={<a>{item.courseName}</a>}
          description={"任课教师:"+item.teacherName}
        />
      </List.Item>
    )}
  />
  </div>
  
  </PageContainer>;

};

export default CourseManagement;
