import { request } from 'umi';
import { CourseListData } from './data';

export async function queryCourseList(  
  keywordParam:string,
  teacherNameParam:string,
  currentPageParam: number,
  pageSizeParam: number,): Promise<{ data: { totalNum: number; list: CourseListData[]; teacherList:string[] } }> {
  return request('/api/course/admin-list', {
    method: 'POST',
    data:{
      keyword: keywordParam,
      teacherName: teacherNameParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    }
  });
}
