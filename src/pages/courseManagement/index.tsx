import { useState, type FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Link, useModel, useRequest } from 'umi';
import { Avatar, Button, Divider, Input, List, Modal, Space, Typography, Tag } from 'antd';
import AddCourse from './components';
import { CourseListData } from './data';
import { queryCourseList } from './service';
import { ProList } from '@ant-design/pro-components';
import request from 'umi-request';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};


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
    //获取到课程全部列表



  return <PageContainer
  >
  
  <div>
  {/* <List
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
  /> */}
   <ProList<CourseListData>
    toolBarRender={() => {
      return [
        <AddCourse></AddCourse>
      ];
    }}
    search={{}}
    rowKey="name"
    dataSource={courseList}

    headerTitle="全部课程"
    // request={async (params = {}) =>
    //   request<{
    //     data: GithubIssueItem[];
    //   }>('https://proapi.azurewebsites.net/github/issues', {
    //     params,
    //   })
    // }
    pagination={{
      pageSize: 10,
    }}
    showActions="hover"
    metas={{
      title: {
        dataIndex: 'courseName',
        title: '课程名称',
      },
      avatar: {
        dataIndex: 'imgUrl',
        search: false,
      },
      description: {
        render:(_,row)=>{
          return(
            <div>任课教师:<>{row.teacherName}</></div>
          )
        },
        dataIndex: 'teacherName',
        search: false,
      },
      subTitle:{
        render:(_,row)=>{
          if(row.semester.includes("夏季")){
            return(
            <Tag color="green" key="1">
              夏季学期
            </Tag>
            )         
            }else{return (
            <Tag color="orange" key="1">
              秋季学期
            </Tag>
            )

            }
        },
        title:'开设学期',
        valueType: 'select',
      },


      // subTitle: {
      //   dataIndex: 'labels',
      //   render: (_, row) => {
      //     return (
      //       <Space size={0}>
      //         {row.labels?.map((label: { name: string }) => (
      //           <Tag color="blue" key={label.name}>
      //             {label.name}
      //           </Tag>
      //         ))}
      //       </Space>
      //     );
      //   },
      //   search: false,
      // },
      actions: {
        render: () => {
          return(
          <Space>
            <Button type="link">详情</Button>
            <Button type="link">修改</Button>
            <Button type="link">删除</Button>
          </Space>
          )
        }
      },
    }}
  />

  </div>
  </PageContainer>;

};

export default CourseManagement;
