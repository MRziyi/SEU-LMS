import { request } from 'umi';

export async function sendPrivateMessage(
  idParam: string,
  answerParam: string,
): Promise<{ code: number }> {
  return request('/api/course/sendPM', {
    method: 'POST',
    data: {
      id: idParam,
      answer: answerParam,
    },
  });
}
