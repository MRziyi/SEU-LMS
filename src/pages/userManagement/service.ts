import { request } from 'umi';
import { CourseListData, UserListData } from './data';

export async function queryUserList(
  nickNameParam: string,
  idParam: string,
  currentPageParam?: number,
  pageSizeParam?: number,
): Promise<{ code: number; data: { totalNum: number; list: UserListData[] } }> {
  return request('/api/user/list-for-admin', {
    method: 'POST',
    data: {
      nickName: nickNameParam,
      id: idParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}



export async function deleteUserList(IDListParam: string[]): Promise<{ code: number }> {
  return request('/api/user/delete-users', {
    method: 'POST',
    data: {
      id: IDListParam,
    },
  });
}


export async function queryCourseList(
): Promise<{
  code: number;
  data: { list: CourseListData[]};
}> {
  return request('/api/course/all-course', {
    method: 'GET',
  });
}

export async function importToCourse(
  idParam: string[],
  courseIDParam: string
)
: Promise<{
  code: number;
}> {
  return request('/api/user/importToCourse',{
    method: 'POST',
    data:{
      id:idParam,
      courseID:courseIDParam
    }
  })
}
