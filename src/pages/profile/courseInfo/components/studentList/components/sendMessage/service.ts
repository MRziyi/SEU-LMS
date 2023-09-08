import { request } from 'umi';

export async function sendPrivateMessage(
  idParam: string,
  contentParam: string,
  sourceParam: string,
): Promise<{ code: number }> {
  return request('/api/user/sendPM', {
    method: 'POST',
    data: {
      id: idParam,
      content: contentParam,
      source: sourceParam,
    },
  });
}
