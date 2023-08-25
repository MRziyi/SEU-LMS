import { request } from 'umi';
import type { ItemData, CommentData, OrderData } from './data.d';

export async function queryItemList(): Promise<{
  data: { totalNum: number; list: ItemData[] };
}> {
  return request('/api/item/listMy');
}

export async function queryOrderList(): Promise<{
  data: { totalNum: number; list: OrderData[] };
}> {
  return request('/api/order/listMy');
}

export async function queryCommentList(): Promise<{
  data: { totalNum: number; list: CommentData[] };
}> {
  return request('/api/comment/list');
}
