export type HomeworkList = {
  studentAvatar: string;
  studentNickName: string;
  homeworkID: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  status: number;
};

export type HomeworkInfo = {
  homeworkName: string;
  homeworkDescription: string;
  toBeCorrectedNum: number;
  uncommittedNum: number;
};
