import { request } from 'umi';
import { QAData } from './data';

export async function queryMessageList(
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: QAData[] } }> {
  return request('/api/wiki/admin-list', {
    method: 'POST',
    data: {
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}

export async function postAnswer(QAIDParam:string,answerParam:string):Promise<{code:number}> {
  return request('/api/wiki/postAnswer',{
    method:'POST',
    data:{
      wikiID:QAIDParam,
      answer:answerParam,
    }
  })
}

export async function markMessage(
  QAIDParam: string,
  setToParam: boolean,
): Promise<{ code:number }> {
  return request('/api/wiki/mark', {
    method: 'POST',
    data: {
      wikiID: QAIDParam,
      setTo: setToParam,
    },
  });
}
