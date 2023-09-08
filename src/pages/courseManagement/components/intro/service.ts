import { request } from 'umi';
import { TeacherData } from './data';

export async function queryTeacherInfo(courseIDParam: string): Promise<{
  data: {
    teacherPhone: string;
    teacherEmail: string;
  };
}> {
  return request('/api/course/get-teacher-info', {
    method: 'POST',
    data: {
      courseID: courseIDParam,
    },
  });
}
