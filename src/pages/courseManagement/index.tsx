import { useState, type FC, useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { message, Button, Divider, Input, List, Modal, Space, Typography, Tag } from 'antd';
import AddCourse from './components/addCourse';
import { CourseListData, SearchParams } from './data.d';
import { deleteCourse, queryCourseList } from './service';
import { ProList } from '@ant-design/pro-components';
import CourseInfo from './components/intro';
import ModifyCourse from './components/modifyCourse';
import { useParams } from 'umi';

const CourseManagement: FC<Record<string, any>> = () => {
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = useState<number>(8);
  const [currentCourseName,setCurrentCourseName]=useState<string>('');
  const [currentTeacherName,setCurrentTeacherName]=useState<string>('');

  const params = useParams<SearchParams>();

  async function deleteCourseAdaptor(courseID: string) {
    setLoadingDelete(true);
    try {
      const result = await deleteCourse(courseID);
      if (result.code == 0) {
        message.success('课程删除成功');
      }
    } catch {}
    setLoadingDelete(false);
  }

  async function queryCourseListAdaptor(
    courseName:string,
    teacherName:string,
    current:number,
    pageSize:number,
  ) {
    try{
      const result=await queryCourseList(courseName,teacherName,current,pageSize);
      if(result.data){
        setCurrentCourseName(courseName);
        setCurrentTeacherName(teacherName);
        setCurrentPage(current);
        setCurrentPageSize(pageSize);
        return({list:result.data.list,total:result.data.totalNum,code:result.code})
      }
    }catch{}
  }

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 条`;
  }

  return (
    <ProList<CourseListData, SearchParams>
      params={params}
      request={async (
        params: SearchParams & {
          pageSize?: number;
          current?: number;
          keyword?: string;
        },
      ) => {
        const msg = await queryCourseListAdaptor(
          params.courseName ? params.courseName : '',
          params.teacherName ? params.teacherName : '',
          params.current?params.current:1,
          params.pageSize?params.pageSize:6,
        );

        return {
          data: msg?.list,
          success: msg?.code == 0,
          total: msg?.total,
        };
      }}
      toolBarRender={() => {
        return [
          <Space>
            <AddCourse
            onClose={()=>{
              console.log('in onClose');
              queryCourseListAdaptor(currentCourseName,currentTeacherName,currentPage,currentPageSize)}}
            ></AddCourse>
          </Space>,
        ];
      }}
      rowKey="courseID"
      search={{}}
      headerTitle="全部课程"
      pagination={{
        defaultPageSize: 8,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [8, 12, 16, 20],
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
            return <div>任课教师: {row.teacherName}</div>;
          },
          dataIndex: 'teacherName',
          title: '教师姓名',
        },
        subTitle: {
          render: (_, row) => {
            if (row.semester.includes('春')) {
              return (
                <Tag color="green" key="1">
                  春季学期
                </Tag>
              );
            } else if (row.semester.includes('夏')) {
              return (
                <Tag color="blue" key="2">
                  夏季学期
                </Tag>
              );
            } else if (row.semester.includes('秋')) {
              return (
                <Tag color="orange" key="3">
                  秋季学期
                </Tag>
              );
            } else {
              return (
                <Tag color="pink" key="4">
                  冬季学期
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
                  loading={loadingDelete}
                  onClick={() => {
                    if(window.confirm('确定要删除吗')){
                      deleteCourseAdaptor(row.courseID);
                    }
                  }}
                >
                  删除
                </Button>
              </Space>
            );
          },
        },
      }}
    />
  );
};

export default CourseManagement;
