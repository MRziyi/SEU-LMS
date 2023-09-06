import { request } from 'umi';

export async function sendPrivateMessage(
  idParam:string,
  answerParam:string
  ):Promise<{}> {
  return request('/api/user/sendPM',{
    method:'POST',
    data:{
      id:idParam,
      answer:answerParam,
    }
  })
}
