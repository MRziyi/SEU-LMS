import { request } from 'umi';
import { CheckInData, CourseData, DiscussionData, FileData, ReplyData, SyllabusData } from './data';

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
  currentPageParam: number,
  pageSizeParam: number,
): Promise<{ data: { totalNum: number; list: ReplyData[] } }> {
  return request('/api/discussion/reply-list', {
    method: 'POST',
    data: {
      discussionID: discussionIDParam,
      currentPage: currentPageParam,
      pageSize: pageSizeParam,
    },
  });
}

export async function sendReply(
  contentParam: string,
  courseIDParam: string,
  discussionIDParam: string,
): Promise<{ code: number }> {
  return request('/api/discussion/reply-send', {
    method: 'POST',
    data: {
      content: contentParam,
      courseID: courseIDParam,
      discussionID: discussionIDParam,
    },
  });
}

export async function sendCheckIn(syllabusIDParam: string): Promise<{ data: number }> {
  return request('/api/syllabus/check-in', {
    method: 'POST',
    data: {
      syllabusID: syllabusIDParam,
    },
  });
}
export async function queryCourseName(
  syllabusIDParam: string,
): Promise<{ data: { courseName: string } }> {
  return request('/api/course/get-name', {
    method: 'POST',
    data: {
      syllabusID: syllabusIDParam,
    },
  });
}
export async function queryMaterialList(
  syllabusIDParam: string,
): Promise<{ data: { fileList: FileData[] } }> {
  return request('/api/syllabus/material-list', {
    method: 'POST',
    data: {
      syllabusID: syllabusIDParam,
    },
  });
}

export async function queryCheckInData(
  syllabusIDParam:string,
): Promise<{ data: {checkInData:CheckInData} }> {
  return request('/api/syllabus/check-in-data', {
    method: 'POST',
    data: {
      syllabusID: syllabusIDParam,
    },
  });
}