import { request } from 'umi';
import { CourseListData } from './data';

export async function queryCourseList(
  userIDParam: string,
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: CourseListData[] } }> {
  return request('/api/course/list', {
    method: 'POST',
    data: {
      userID: userIDParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}
export async function searchMyCourse(
  keywordParam: string,
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: CourseListData[] } }> {
  return request('/api/course/search', {
    method: 'POST',
    data: {
      keyword: keywordParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}
