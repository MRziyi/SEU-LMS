import { request } from 'umi';
import { MessageData } from './data';

export async function queryMessageList(
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: MessageData[] } }> {
  return request('/api/message/list', {
    method: 'POST',
    data: {
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}

export async function markMessage(
  messageIDParam: string,
  setToParam: boolean,
): Promise<{ data: { totalNum: number; list: MessageData[] } }> {
  return request('/api/message/mark', {
    method: 'POST',
    data: {
      messageID: messageIDParam,
      setTo: setToParam,
    },
  });
}
