export type CourseListData = {
  courseID: string;
  courseName: string;
  imgUrl: string;
  teacherName: string;
  teacherAvatar: string;
  semester: string;
  description: string;
  teacherEmail: string;
  teacherPhone: string;
};

export type SearchParams = {
  courseName: string;
  teacherName: string;
};
