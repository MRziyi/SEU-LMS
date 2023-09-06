import { request } from 'umi';
import { wikiData } from './data';

export async function queryMessageList(
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: wikiData[] } }> {
  return request('/api/wiki/admin-list', {
    method: 'POST',
    data: {
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}

export async function postAnswer(
  wikiIDParam: string,
  answerParam: string,
): Promise<{ code: number }> {
  return request('/api/wiki/answer', {
    method: 'POST',
    data: {
      wikiID: wikiIDParam,
      answer: answerParam,
    },
  });
}
