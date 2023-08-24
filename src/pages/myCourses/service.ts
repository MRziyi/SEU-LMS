import { request } from 'umi';
import type { Params, ItemData, Course } from './data.d';

export async function queryList(): Promise<{ data: { totalNum: number; list: ItemData[] } }> {
  return request('/api/item/list');
}

export async function searchList(
  params: Params,
): Promise<{ data: { totalNum: number; list: ItemData[] } }> {
  return request('/api/item/search', {
    params,
  });
}

export async function queryMyCourses(): Promise<{ data: { totalNum: number; list: Course[] } }> {
  return request('/api/course/list');
}
