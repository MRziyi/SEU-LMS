export type UserListData = {
  nickName: string;
  id: string;
  access: string;
  avatarUrl: string;
  phone: string;
  email: string;
};
export type SearchParams = {
  nickName: string;
  userID: string;
};

export type CourseListData = {
  courseID: string;
  courseName: string;
  teacherName: string;
}