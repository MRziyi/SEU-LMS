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
  description: string;
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
  materials: string[];
  homework: string[];
  isCheckedIn: boolean;
};

export type ReplyData = {
  fromUserName: string;
  fromUserAvatar: string;
  ID: string;
  content: string;
  isRead: bool;
  time: string;
};
