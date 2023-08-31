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


  // const [courseList, setCourseList] = useState<CourseListData[]>([])
  // //  获取用户信息
  // const { initialState } = useModel('@@initialState');

  // const { loading } = useRequest(
  //   () => {
  //     if (initialState && initialState.currentUser && initialState.currentUser.id)
  //       return queryCourseList();
  //     else throw 'Please Login!';
  //   },
  //   {
  //     onSuccess: (result: any) => {
  //       setCourseList(result.list);
  //     },
  //   },
  // );
    //获取到课程全部列表



    //尝试一种新的写法


    // const fetchData = async (params) => {
    //   const response = await fetch(`GET  /api/course/listAll`, { params });
    //   const data = await response.json();
    //   return data;
    // };


    // async function fetchData(params = {}) {
    //   return request<{
    //     data: CourseListData[];
    //   }>('GET  /api/course/listAll', {
    //     params,
    //   });
    // }

    // async function fetchData(params = {}) {
    //   return request<{
    //     data: CourseListData[];
    //   }>('/api/course/listAll', {
    //     method: 'GET',
    //     params,
    //   });
    // }

    // 在组件中定义一个函数，并为 T 指定具体的类型


// const fetchData = async (
//   params: Record<string, any> & {
//     pageSize?: number;
//     current?: number;
//     keyword?: string;
//   },
//   sort: any,
//   filter: Record<string, any>
// ) => {
//   // 实际的数据获取逻辑
//   // 这里假设使用 fetch 或其他方式获取数据
//   const response = await fetch('/api/course/listAll', {
//     method: 'GET',
//     // 添加 params 中的参数等
//   });
//   const data = await response.json();

//   return {
//     data: data.list, // 假设数据在 list 字段中
//     success: true,
//     total: data.totalNum,
//   };
// };





  return <PageContainer
  >
  
  <div>
   <ProList<CourseListData>


     request={async (params = {}) =>
     request<{
      data: CourseListData[];
       }>('/api/course/listAll', {
        method: 'GET',
        params,
      })
    }
    // request={async (
    //   params: CourseListData & {
    //     pageSize: number;
    //     current: number;
    //   },
    //   sort,
    //   filter,
    // ) =>
    //   request<{
    //     data: CourseListData[];
    //   }>('/api/course/listAll', {
    //     method: 'GET',
    //   })
    // }

    toolBarRender={() => {
      return [
        <Space>
          <AddCourse></AddCourse>
          <Button type='primary'>批量删除</Button>
        </Space>
      ];
    }}
    search={{
      filterType:'query',
      searchText:'搜索课程'
      
    }}
    rowKey="name"
    //获得数据
    //dataSource={courseList}

    headerTitle="全部课程"
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
