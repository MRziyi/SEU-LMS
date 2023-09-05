import { request } from 'umi';
import { CourseListData } from './data';

export async function queryCourseList(
  courseNameParam: string,
  teacherNameParam: string,
  currentPageParam?: number,
  pageSizeParam?: number,
): Promise<{
  code: number;
  data: { totalNum: number; list: CourseListData[]; teacherList: string[] };
}> {
  return request('/api/course/admin-list', {
    method: 'POST',
    data: {
      courseName: courseNameParam,
      teacherName: teacherNameParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}

export async function deleteCourse(courseIDParam: string): Promise<{
  code: number;
}> {
  return request('/api/course/admin-list', {
    method: 'POST',
    data: {
      courseID: courseIDParam,
    },
  });
}
