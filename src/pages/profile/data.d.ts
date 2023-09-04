export type DiscussionData = {
  discussionID: string;
  fromUserName: string;
  fromUserAvatar: string;
  title: string;
  content: string;
  time: string;
};

export type DescriptionData={
  unit:string;
  credit:string;
  teachingTime:string;
  teachingLocation:string;
  teachingMethod:string;
  introduction:string;
}

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
