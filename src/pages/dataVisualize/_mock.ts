import type { Request, Response } from 'express';

async function postFakeCourseDiscription(req: Request, res: Response) {
  return res.json({
    code: 0,
    data: {
      descriptionList: [
        {
          courseName: '离散数学',
          courseID: 'Course - 1',
        },
        {
          courseName: '程序设计',
          courseID: 'Course - 2',
        },
        {
          courseName: '编译原理',
          courseID: 'Course - 3',
        },
      ],
    },
  });
}

async function postFakeTeacherDiscription(req: Request, res: Response) {
  return res.json({
    code: 0,
    data: {
      teacherList: [
        {
          teacherName: '张小一',
          teacherID: 'Teacher - 1',
        },
        {
          teacherName: '王小二',
          teacherID: 'Teacher - 2',
        },
        {
          teacherName: '李小三',
          teacherID: 'Teacher - 3',
        },
      ],
    },
  });
}

async function postTeacherChart(req: Request, res: Response) {
  return res.json({
    code: 0,
    data: {
      chartData: {
        dountChartData: [
          { type: '已签到', value: 45 },
          { type: '未签到', value: 8 },
        ],
        pieChartData: [
          { type: '已批改', value: 32 },
          { type: '待批改', value: 18 },
          { type: '未提交', value: 3 },
        ],
        gaugeChartData: 75,
        lineChartData: [
          { chapter: 'Chapter 1', attendanceRate: 80 },
          { chapter: 'Chapter 2', attendanceRate: 75 },
          { chapter: 'Chapter 3', attendanceRate: 90 },
          { chapter: 'Chapter 4', attendanceRate: 85 },
        ],
        groupedColumnChartData: [
          { chapter: 'Chapter 1', task: 'Task 1', score: 85 },
          { chapter: 'Chapter 1', task: 'Task 2', score: 92 },
          { chapter: 'Chapter 2', task: 'Task 1', score: 78 },
          { chapter: 'Chapter 3', task: 'Task 1', score: 90 },
          { chapter: 'Chapter 3', task: 'Task 2', score: 88 },
        ],
      },
    },
  });
}

async function postGeneralOverview(req: Request, res: Response) {
  return res.json({
    code: 0,
    data: {
      chartData: {
        userDountChartData: [
          { type: '学生', value: 1730 },
          { type: '教师', value: 180 },
          { type: '管理员', value: 20 },
        ],
        pieChartData: [
          { type: '其他', value: 102 },
          { type: '20-30人', value: 32 },
          { type: '10-20人', value: 18 },
        ],
        discussionDountChartData: [
          { type: '回复', value: 168 },
          { type: '主贴', value: 42 },
        ],
        lineChartData: [
          { date: '2023-09-01', attendance: 800 },
          { date: '2023-09-02', attendance: 1100 },
          { date: '2023-09-03', attendance: 600 },
          { date: '2023-09-04', attendance: 1400 },
        ],
        columnChartData: [
          { date: '2023-09-01', num: 700 },
          { date: '2023-09-02', num: 900 },
          { date: '2023-09-03', num: 620 },
          { date: '2023-09-04', num: 1300 },
        ],
      },
    },
  });
}

async function postTeacherStatistic(req: Request, res: Response) {
  return res.json({
    code: 0,
    data: {
      chartData: {
        dountChartData: [
          { type: '计算机组成原理', value: 80 },
          { type: 'Java', value: 43 },
          { type: 'C++', value: 37 },
        ],
        gaugeChartData: 85,
        pieChartData: [
          { type: '90-100', value: 12 },
          { type: '80-90', value: 21 },
          { type: '60-80', value: 11 },
          { type: '其他', value: 9 },
          { type: '未提交', value: 3 },
        ],
        lineChartData: [
          { course: '计算机组成原理', attendance: 85 },
          { course: 'Java', attendance: 92 },
          { course: 'C++', attendance: 78 },
        ],
        columnChartData: [
          { course: '计算机组成原理', score: 88 },
          { course: 'Java', score: 92 },
          { course: 'C++', score: 75 },
        ],
      },
    },
  });
}

async function postCourseStatistic(req: Request, res: Response) {
  return res.json({
    code: 0,
    data: {
      chartData: {
        dountChartData: [
          { type: '教师A', value: 45 },
          { type: '教师B', value: 32 },
          { type: '教师C', value: 58 },
        ],
        gaugeChartData: 85,
        pieChartData: [
          { type: '90-100', value: 12 },
          { type: '80-90', value: 21 },
          { type: '60-80', value: 11 },
          { type: '其他', value: 9 },
          { type: '未提交', value: 3 },
        ],
        lineChartData: [
          { teacher: '教师A', attendance: 85 },
          { teacher: '教师B', attendance: 92 },
          { teacher: '教师C', attendance: 78 },
        ],
        columnChartData: [
          { teacher: '教师A', score: 88 },
          { teacher: '教师B', score: 92 },
          { teacher: '教师C', score: 75 },
        ],
      },
    },
  });
}

export default {
  'POST  /api/data-visualize/teacher-chart': postTeacherChart,
  'GET  /api/data-visualize/general-overview': postGeneralOverview,
  'POST  /api/data-visualize/teacher-statistics': postTeacherStatistic,
  'POST  /api/data-visualize/course-statistics': postCourseStatistic,

  'GET  /api/course/list-description': postFakeCourseDiscription,
  'POST  /api/user/list-teacher': postFakeTeacherDiscription,
};
