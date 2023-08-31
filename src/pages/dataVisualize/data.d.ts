export type TeachingSituation={
    courseName:string;
    teacherName:string[];
    averageScore:number[];//某个课程的某个老师的学生作业均分
    attendance:number[];
}

export type CourseSituation={
    courseName:string;
    averageScore:number;
}

export type SectionSituation={
    courseName:string;
    lessonTitle:string[];
    averageScore:number[];//某个课程的某个章节的学生作业均分
    attendance:number[];
}