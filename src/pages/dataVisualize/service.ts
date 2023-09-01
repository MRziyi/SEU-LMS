import { request } from 'umi';
import {
  CourseDiscription,
  GeneralOverviewData,
  TeacherChartData,
  TeacherDiscription,
} from './data';

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

export async function queryCourseList(): Promise<{
  data: { descriptionList: CourseDiscription[] };
}> {
  return request('/api/course/list-description');
}

export async function queryTeacherList(): Promise<{ data: { teacherList: TeacherDiscription[] } }> {
  return request('/api/user/list-teacher');
}

export async function queryGeneralOverview(): Promise<{
  data: { chartData: GeneralOverviewData };
}> {
  return request('/api/data-visualize/general-overview', {
    method: 'POST',
  });
}
