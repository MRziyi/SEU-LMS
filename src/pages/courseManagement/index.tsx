import { useState, type FC, useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Button, Divider, Input, List, Modal, Space, Typography, Tag } from 'antd';
import AddCourse from './components/addCourse';
import { CourseListData } from './data.d';
import { queryCourseList } from './service';
import { ProList } from '@ant-design/pro-components';
import request from 'umi-request';
import CourseInfo from './components/intro';
import ModifyCourse from './components/modifyCourse';
import { query } from 'express';




const CourseManagement: FC<Record<string, any>> = () => {


  const [refresh, setRefresh] = useState(false);
  const [keyWord,setKeyWord] = useState<string>('');
  const [keyWord2,setKeyWord2] = useState<string>('');



  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<CourseListData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [loadingForPagigation, setLoadingForPagigation] = useState<boolean>(false);
  const [teacherList, setTeacherList] = useState<string[]>([]);

  const searchContent = useRef<string>('');
  const preSearchContent = useRef<string>('');

  //  获取用户信息

  useEffect(() => {
    changePage(1, pageSize);
  }, []);

  async function changePage(_page: number, _pageSize: number) {
    setLoadingForPagigation(true);
    if (preSearchContent.current !== searchContent.current) _page = 1;
    try {
      let result;
      result = await queryCourseList(keyWord, keyWord2, _page, _pageSize);
      if (result.data) {
        setTotalNum(result.data.totalNum);
        setListData(result.data.list);
        setPageSize(_pageSize);
        setCurrentPage(_page);
        setTeacherList(result.data.teacherList);
      }
    } catch {}
      
    setLoadingForPagigation(false);
  }

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 条`;
  }



  useEffect(() => {
    console.log('拿到的关键字为:', keyWord, keyWord2);
    changePage(1, pageSize)
  }, [keyWord,keyWord2]);

  const fetchKeyword = async (params: any) => {
    setKeyWord(params.courseName);
    setKeyWord2(params.teacherName);
  };

  function test(){
    console.log('拿到的关键字是:', keyWord, keyWord2);
  }
  //搜索功能雏形




  

  const handleDelete = async (params: any) => {
    console.log('请求参数:', params);
    // 发起删除请求
    request('/api/course/delete', {
      method: 'POST',
      params,
    })
      .then(() => {
        alert('删除成功');
        setRefresh((prevRefresh) => !prevRefresh);
        setRefresh((prevRefresh) => !prevRefresh);
      })
      .catch((error) => {
        alert('删除失败，请重试');
      });
  };


  return (
    <PageContainer>
      <div>
        <ProList<CourseListData>
          request={fetchKeyword}
          dataSource={listData}
          //一种新的方式
          search={{}}
          onSubmit={test}
          toolBarRender={() => {
            return [
              <Space>
                <AddCourse teacherList = {teacherList}></AddCourse>
              </Space>,
            ];
          }}

          rowKey="name"
          //获得数据，另一种
          //dataSource={courseList}

          headerTitle="全部课程"
          pagination={{
            onChange: changePage,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [8, 12, 16, 20],
            current: currentPage,
            pageSize: pageSize,
            total: totalNum,
            showTotal: showTotal,
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
              valueType: 'text',
              render: (_, row) => {
                return (
                  <div>
                    任课教师:<>{row.teacherName}</>
                  </div>
                );
              },
              dataIndex: 'teacherName',
              title:'教师姓名',
              
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
                    <CourseInfo 
                    courseID={row.courseID}
                    courseName={row.courseName} 
                    imgUrl={row.imgUrl} 
                    teacherName={row.teacherName}
                    teacherAvatar={row.teacherAvatar}
                    semester={row.semester}
                    description={row.description}
                    ></CourseInfo>
                    
                    <ModifyCourse
                    teacherList = {teacherList}
                    courseID={row.courseID}
                    courseName={row.courseName} 
                    imgUrl={row.imgUrl} 
                    teacherName={row.teacherName}
                    semester={row.semester}             
                    ></ModifyCourse>
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
        />
      </div>
    </PageContainer>
  );
};

export default CourseManagement;
function useModel(arg0: string): { initialState: any; } {
  throw new Error('Function not implemented.');
}

