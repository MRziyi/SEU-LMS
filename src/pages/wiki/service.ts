import { request } from 'umi';
import { WikiListData } from './data';

export async function queryWiki(
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: WikiListData[] } }>{
  return request('/api/wiki',{
    method:'POST',
    data: {
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  })
}