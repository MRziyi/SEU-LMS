import { request } from 'umi';
import { EventList } from './data';

export async function fakeSubmitForm(params: any) {
  return request('/api/basicForm', {
    method: 'POST',
    data: params,
  });
}

export async function queryEventList(userID:string) :Promise<{data:EventList[]}>{
  return request('/api/myCalendar', {
    method: 'POST',
  });
}