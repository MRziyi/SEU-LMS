import { request } from 'umi';
import { StudentData } from './data';

export async function queryUserList(
  nickNameParam: string,
  idParam: string,
  courseIDParam:string,
  currentPageParam?: number,
  pageSizeParam?: number,
): Promise<{ code: number; data: { totalNum: number; list: StudentData[] } }> {
  return request('/api/syllabus/student-list', {
    method: 'POST',
    data: {
      nickName: nickNameParam,
      id: idParam,
      courseID: courseIDParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}


