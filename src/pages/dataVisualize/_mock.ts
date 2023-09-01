import type { Request, Response } from 'express';

function teachingSituationList() {
  return [
    {
      courseName: '数学',
      teacherName: ['张老师', '李老师', '王老师'],
      averageScore: [85, 88, 90],
      attendance: [95, 92, 94],
    },
    {
      courseName: '英语',
      teacherName: ['刘老师', '赵老师', '陈老师', '钱老师'],
      averageScore: [78, 82, 85, 89],
      attendance: [90, 88, 91, 92],
    },
    {
      courseName: '物理',
      teacherName: ['杨老师', '吴老师', '钱老师'],
      averageScore: [88, 86, 89],
      attendance: [93, 91, 94],
    },
  ];
}

function courseSituationList() {
  return [
    { courseName: 'Math', averageScore: 85 },
    { courseName: 'Science', averageScore: 78 },
    { courseName: 'History', averageScore: 92 },
    { courseName: 'English', averageScore: 88 },
    { courseName: 'Physics', averageScore: 75 },
    { courseName: 'Chemistry', averageScore: 80 },
    { courseName: 'Biology', averageScore: 87 },
    { courseName: 'Computer Science', averageScore: 91 },
    { courseName: 'Art', averageScore: 70 },
    { courseName: 'Music', averageScore: 82 },
    { courseName: 'Physical Education', averageScore: 95 },
    { courseName: 'Geography', averageScore: 89 },
    { courseName: 'Economics', averageScore: 83 },
    { courseName: 'Literature', averageScore: 79 },
    { courseName: 'Foreign Language', averageScore: 93 },
    { courseName: 'Social Studies', averageScore: 86 },
    { courseName: 'Psychology', averageScore: 74 },
    { courseName: 'Sociology', averageScore: 77 },
    { courseName: 'Philosophy', averageScore: 90 },
    { courseName: 'Religion', averageScore: 84 },
  ];
}

function sectionSituationList() {
  return [
    {
      courseName: 'Math',
      lessonTitle: ['Introduction', 'Algebra', 'Geometry', 'Calculus'],
      averageScore: [88, 76, 92, 85],
      attendance: [95, 89, 97, 92],
    },
    {
      courseName: 'Science',
      lessonTitle: ['Physics', 'Chemistry', 'Biology', 'Astronomy'],
      averageScore: [78, 82, 89, 91],
      attendance: [90, 88, 95, 93],
    },
  ];
}

async function postFakeCourseDiscription(req: Request, res: Response) {
  return res.json({
    code: 0,
    data: [
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
  });
}

function postDonutChartData() {
  return {
    name: '上节课到课率',
    angleField: 'value',
    colorField: 'type',
    dataSource: [
      { type: '已签到', value: 45 },
      { type: '未签到', value: 8 },
    ],
    contentName: '到课率',
    contentValue: '84.9%',
  };
}

function postPieChartData() {
  return {
    name: '上节课作业情况',
    angleField: 'value',
    colorField: 'type',
    dataSource: [
      { type: '已批改', value: 32 },
      { type: '待批改', value: 18 },
      { type: '未提交', value: 3 },
    ],
  };
}

function postGaugeChartData() {
  return {
    name: '上次作业均分',
    value: 85,
    statisticText: '85_良',
  };
}

function postLiquidChartData() {
  return {
    name: '课程进度',
    value: 56.4,
  };
}

function postLineChartData() {
  return {
    name: '历史到课率',
    dataSource: [
      { chapter: 'Chapter 1', attendanceRate: 80 },
      { chapter: 'Chapter 2', attendanceRate: 75 },
      { chapter: 'Chapter 3', attendanceRate: 90 },
      { chapter: 'Chapter 4', attendanceRate: 85 },
    ],
    xField: 'chapter',
    yField: 'attendanceRate',
    xAxis: '章节名称',
    yAxis: '到课率(%)',
  };
}

function postGroupedColumnChartData() {
  return {
    name: '历史作业均分',
    dataSource: [
      { chapter: 'Chapter 1', task: 'Task 1', score: 85 },
      { chapter: 'Chapter 1', task: 'Task 2', score: 92 },
      { chapter: 'Chapter 2', task: 'Task 1', score: 78 },
      { chapter: 'Chapter 3', task: 'Task 1', score: 90 },
      { chapter: 'Chapter 3', task: 'Task 2', score: 88 },
      // 可以继续添加更多章节、任务和分数数据
    ],
    xField: 'chapter',
    yField: 'score',
    xAlias: 'Chapter',
    yAlias: 'Average Score',
    groupField: 'task',
  };
}

async function postTeacherChart(req: Request, res: Response) {
  return res.json({
    code: 0,
    data: {
      dountChartData: postDonutChartData(),
      pieChartData: postPieChartData(),
      gaugeChartData: postGaugeChartData(),
      liquidChartData: postLiquidChartData(),
      lineChartData: postLineChartData(),
      groupedColumnChartData: postGroupedColumnChartData(),
    },
  });
}

export default {
  'POST  /api/data-visualize/teacher-chart': postTeacherChart,
  'POST  /api/course/list-for-teacher': postFakeCourseDiscription,
};
