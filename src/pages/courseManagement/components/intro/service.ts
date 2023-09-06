import { request } from 'umi';
import { TeacherData } from './data';

export async function queryTeacherInfo(
  courseIDParam: string,
): Promise<{ data: { teacherData: TeacherData } }> {
  return request('/api/course/get-teacher-intro', {
    method: 'POST',
    data: {
      courseID: courseIDParam,
    },
  });
}
