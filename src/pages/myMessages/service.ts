import { request } from 'umi';
import { MessageListData } from './data';

export async function fakeSubmitForm(params: any) {
  return request('/api/basicForm', {
    method: 'POST',
    data: params,
  });
}

export async function queryMessageList(
  userIDParam: string,
  currentPageParam: number,
  pageSizeParam: number,
):Promise<{ data: { totalNum: number; list: MessageListData[] } }>{
  return request('/api/message/list', {
    method: 'POST',
    data: {
      userID: userIDParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}

export async function queryUserAvatar(userIDParam:string):Promise<{data:{nickName:string;avatarUrl:string}}> {
  return request('api/message/user',{
    method:'Post',
    data:{
      userID:userIDParam,
    },
  })
}