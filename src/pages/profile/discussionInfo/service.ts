import { request } from 'umi';
import { DiscussionData } from '../data';

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryDiscussionProfile(
  discussionIDParam: string,
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: DiscussionData[] } }> {
  return request('/api/discussion/profile', {
    method: 'POST',
    data: {
      discussionID: discussionIDParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}
