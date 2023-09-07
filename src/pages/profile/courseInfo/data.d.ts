export type tabKeyType = '1' | '2' | '3' | '4';

export interface RouteParams {
  courseID: string;
}
export type DiscussionData = {
  discussionID: string;
  fromUserName: string;
  fromUserAvatar: string;
  title: string;
  content: string;
  time: string;
};

export type CourseData = {
  courseName: string;
  description: DescriptionData;
  imgUrl: string;
  teacherName: string;
  teacherAvatar: string;
  teacherPhone: string;
  semester: string;
  teacherEmail: string;
};

export type SyllabusData = {
  syllabusID: string;
  title: string;
  haveMaterial: boolean;
  haveHomework: boolean;
  isCheckedIn: number;
  time: string;
};

export type FileData = {
  type: string;
  name: string;
  description: string;
  status: number;
  url: string;
  time: string;
};

export type DescriptionData = {
  unit: string;
  credit: string;
  teachingTime: string;
  teachingLocation: string;
  teachingMethod: string;
  introduction: string;
};
export type HomeworkData = {
  homeworkName: string;
  homeworkDescription: string;
  deadline: string;
  homeworkHistory: {
    name: string;
    isText: boolean;
    body: string;
  };
};

export type ReplyData = {
  fromUserName: string;
  fromUserAvatar: string;
  replyID: string;
  content: string;
  isRead: bool;
  time: string;
};

export type CheckInStatus = {
  isCheckedIn: number;
  notCheckedIn: number;
};

export type SearchParams = {
  name: string;
};

export type StudentData = {
  name: string;
  id: string;
  phone: string;
  email: string;
  avatarUrl: string;
};
