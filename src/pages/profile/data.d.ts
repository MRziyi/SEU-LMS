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
  // homework: string[]; TODO
  isCheckedIn: boolean;
  time: string;
};

export type MaterialData = {
  type: string;
  name: string;
  url: string;
};

export type ReplyData = {
  fromUserName: string;
  fromUserAvatar: string;
  replyID: string;
  content: string;
  isRead: bool;
  time: string;
};
