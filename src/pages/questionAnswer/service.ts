import { request } from 'umi';
import { QAData } from './data';

export async function queryMessageList(
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: QAData[] } }> {
  return request('/api/questionAnswer/list', {
    method: 'POST',
    data: {
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}

export async function postAnswer(QAIDParam:string,answerParam:string):Promise<{code:number}> {
  return request('/api/questionAnswer/postAnswer',{
    method:'POST',
    data:{
      QAID:QAIDParam,
      answer:answerParam,
    }
  })
}

export async function markMessage(
  QAIDParam: string,
  setToParam: boolean,
): Promise<{ code:number }> {
  return request('/api/questionAnswer/mark', {
    method: 'POST',
    data: {
      QAID: QAIDParam,
      setTo: setToParam,
    },
  });
}
