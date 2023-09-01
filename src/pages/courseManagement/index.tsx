import { useState, type FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Button, Divider, Input, List, Modal, Space, Typography, Tag } from 'antd';
import AddCourse from './components/addCourse';
import { CourseListData } from './data';
import { queryCourseList } from './service';
import { ProList } from '@ant-design/pro-components';
import request from 'umi-request';

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

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const fetchData = async (params: any) => {
    // params 包含了请求的参数，包括搜索条件
    console.log('请求参数:', params);
    return request<{
      data: CourseListData[];
    }>('/api/course/listForAdmin', {
      method: 'POST',
      params,
    });
  };

  const handleDelete = async (params: any) => {
    console.log('请求参数:', params);
    // 发起删除请求
    request('/api/course/delete', {
      method: 'POST',
      params,
    })
      .then(() => {
        alert('删除成功');
        setRefreshKey((prevKey) => prevKey + 1); // 刷新列表
      })
      .catch((error) => {
        alert('删除失败，请重试');
      });
  };

  return (
    <PageContainer>
      <div>
        <ProList<CourseListData>
          request={fetchData}
          //一种新的方式

          toolBarRender={() => {
            return [
              <Space>
                <AddCourse></AddCourse>
              </Space>,
            ];
          }}
          search={{}}
          rowKey="name"
          //获得数据，另一种
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
              dataIndex: 'teacherAvatar',
              search: false,
            },
            description: {
              render: (_, row) => {
                return (
                  <div>
                    任课教师:<>{row.teacherName}</>
                  </div>
                );
              },
              dataIndex: 'teacherName',
              search: false,
            },
            subTitle: {
              render: (_, row) => {
                if (row.semester.includes('夏季')) {
                  return (
                    <Tag color="green" key="1">
                      夏季学期
                    </Tag>
                  );
                } else {
                  return (
                    <Tag color="orange" key="1">
                      秋季学期
                    </Tag>
                  );
                }
              },
              title: '开设学期',
              valueType: 'select',
              search: false,
            },

            actions: {
              render: (_, row) => {
                return (
                  <Space>
                    <Button type="link">详情</Button>
                    <Button type="link">修改</Button>
                    <Button
                      type="link"
                      key="delete"
                      danger
                      onClick={() => handleDelete(row.courseID)}
                    >
                      删除
                    </Button>
                  </Space>
                );
              },
            },
          }}
          key={refreshKey} // 刷新列表的 key
        />
      </div>
    </PageContainer>
  );
};

export default CourseManagement;
