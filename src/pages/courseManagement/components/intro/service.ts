import { request } from "umi";
import { TeacherData } from "./data";

export async function queryTeacherInfo(
    courseIDParam: string,
  ): Promise<{ data: { teacherData: TeacherData } }> {
    return request('/api/course/get-teacher-intro', {
      method: 'POST',
      data: {
        courseID: courseIDParam,
      },
    });
  }
  //这段代码不知道怎么回事，一调用就开始疯狂弹叉号
  