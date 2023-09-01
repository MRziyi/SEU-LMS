import { request } from 'umi';
import { WikiData } from './data';

export async function queryWiki(
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: WikiData[] } }> {
  return request('/api/wiki/list', {
    method: 'POST',
    data: {
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}
