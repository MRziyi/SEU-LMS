import { request } from 'umi';
import { HomeworkCorrection, HomeworkList } from './data';

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryHomeworkList(
  syllabusIDParam:string,
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number;homeworkName:string,homeworkDescription:string, list: HomeworkList[];} }> {
  return request('/api/syllabus/homework/list', {
    method: 'POST',
    data: {
      syllabusID:syllabusIDParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}

export async function queryHomeworkCorrection(
  syllabusIDParam:string,
) : Promise<{ data: { correctionData:HomeworkCorrection } }>{
  return request('/api/syllabus/homework/correction', {
    method: 'POST',
    data: {
      syllabusID:syllabusIDParam,
    },
  });
}

const WS_BASE_URL = 'ws://your-websocket-url'; // 替换成实际的WebSocket URL

export function createWebSocketConnection() {
  return new WebSocket(WS_BASE_URL);
}