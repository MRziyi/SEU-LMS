import { request } from 'umi';
import { HomeworkInfo, HomeworkList } from './data';

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryHomeworkList(
  syllabusIDParam:string,
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: HomeworkList[];info:HomeworkInfo } }> {
  return request('/api/syllabus/homework', {
    method: 'POST',
    data: {
      syllabusID:syllabusIDParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}