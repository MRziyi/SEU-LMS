import { request } from 'umi';
import { CourseDiscription, TeacherChartData } from './data';

export async function queryTeacherChart(
  courseIDParam: string,
): Promise<{ data: TeacherChartData }> {
  return request('/api/data-visualize/teacher-chart', {
    method: 'POST',
    data: {
      courseID: courseIDParam,
    },
  });
}

export async function queryTeacherCourses(
  userIDParam: string,
): Promise<{ data: CourseDiscription[] }> {
  return request('/api/course/list-for-teacher', {
    method: 'POST',
    data: {
      userID: userIDParam,
    },
  });
}
