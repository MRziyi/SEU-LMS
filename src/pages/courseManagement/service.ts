import { request } from 'umi';
import { CourseListData } from './data';

export async function queryCourseList(): Promise<{ data: { list: CourseListData[] } }> {
  return request('/api/course/listAll', {
    method: 'GET',
  });
}
