import { request } from 'umi';
import { CourseListData } from './data';

export async function queryStudentCourseList(
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: CourseListData[] } }> {
  return request('/api/course/student-list', {
    method: 'POST',
    data: {
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}

export async function queryTeacherCourseList(
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: CourseListData[] } }> {
  return request('/api/course/teacher-list', {
    method: 'POST',
    data: {
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}

export async function searchTeacherCourse(
  keywordParam: string,
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: CourseListData[] } }> {
  return request('/api/course/teacher-search', {
    method: 'POST',
    data: {
      keyword: keywordParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}

export async function searchStudentCourse(
  keywordParam: string,
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: CourseListData[] } }> {
  return request('/api/course/student-search', {
    method: 'POST',
    data: {
      keyword: keywordParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}


export async function queryAdminCourseList(
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: CourseListData[] } }> {
  return request('/api/course/admin-list', {
    method: 'POST',
    data: {
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}

export async function searchAdminCourse(
  keywordParam: string,
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: CourseListData[] } }> {
  return request('/api/course/admin-search', {
    method: 'POST',
    data: {
      keyword: keywordParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}
