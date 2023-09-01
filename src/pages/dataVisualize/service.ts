import { request } from 'umi';
import { CourseDiscription, TeacherChartData } from './data';

export async function queryTeacherChart(
  courseIDParam: string,
): Promise<{ data: { chartData: TeacherChartData } }> {
  return request('/api/data-visualize/teacher-chart', {
    method: 'POST',
    data: {
      courseID: courseIDParam,
    },
  });
}

export async function queryTeacherCourses(
  teacherIDParam: string,
): Promise<{ data: { tabList: CourseDiscription[] } }> {
  return request('/api/course/list-for-teacher', {
    method: 'POST',
    data: {
      teacherID: teacherIDParam,
    },
  });
}
