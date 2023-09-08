import { request } from 'umi';

export async function sendPrivateMessage(
  courseIDParam: string,
  answerParam: string,
): Promise<{ code: number }> {
  return request('/api/course/sendNotice', {
    method: 'POST',
    data: {
      courseID:courseIDParam,
      answer:answerParam,
    },
  });
}
