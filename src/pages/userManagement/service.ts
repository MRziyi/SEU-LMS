import { request } from 'umi';
import { UserListData } from './data';

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
