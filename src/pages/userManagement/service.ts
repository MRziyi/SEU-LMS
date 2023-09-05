import { request } from 'umi';
import { UserListData } from './data';

export async function queryUserList(  
  keyword1Param:string,
  keyword2Param:string,
  currentPageParam: number,
  pageSizeParam: number,): Promise<{ data: { totalNum: number; list: UserListData[] } }> {
  return request('/api/user/list-for-admin', {
    method: 'POST',
    data:{
      keyword1: keyword1Param,
      keyword2: keyword2Param,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    }
  });
}