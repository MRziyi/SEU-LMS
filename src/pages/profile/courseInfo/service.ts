import { request } from 'umi';
import { CourseData, DiscussionData, ReplyData, SyllabusData } from '../data';

export async function queryDiscussionList(
  courseIDParam: string,
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: DiscussionData[] } }> {
  return request('/api/discussion/list', {
    method: 'POST',
    data: {
      courseID: courseIDParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}

export async function querySyllabus(
  courseIDParam: string,
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: SyllabusData[] } }> {
  return request('/api/syllabus/list', {
    method: 'POST',
    data: {
      courseID: courseIDParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}

export async function queryCourseIntro(
  courseIDParam: string,
): Promise<{ data: { courseData: CourseData } }> {
  return request('/api/course/get-intro', {
    method: 'POST',
    data: {
      courseID: courseIDParam,
    },
  });
}

export async function queryReplyList(
  discussionIDParam: string,
  currentReplyCntParam: number,
  replySizeParam: number,
): Promise<{ data: { totalNum: number; list: ReplyData[] } }> {
  return request('/api/reply/list', {
    method: 'POST',
    data: {
      discussionID: discussionIDParam,
      currentReplyCnt: currentReplyCntParam,
      replySize: replySizeParam,
    },
  });
}
