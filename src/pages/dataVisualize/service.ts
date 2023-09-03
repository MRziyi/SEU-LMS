import { request } from 'umi';
import {
  CourseDiscription,
  CourseStatisticsData,
  GeneralOverviewData,
  TeacherChartData,
  TeacherDiscription,
  TeacherStatisticsData,
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

export async function queryTeacherStatistics(teacherIDParam: string): Promise<{
  data: { chartData: TeacherStatisticsData };
}> {
  return request('/api/data-visualize/teacher-statistics', {
    method: 'POST',
    data: {
      teacherID: teacherIDParam,
    },
  });
}

export async function queryCourseSiatistics(courseIDParam: string): Promise<{
  data: { chartData: CourseStatisticsData };
}> {
  return request('/api/data-visualize/course-statistics', {
    method: 'POST',
    data: {
      courseID: courseIDParam,
    },
  });
}
