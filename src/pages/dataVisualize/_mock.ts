import type { Request, Response } from 'express';

async function postFakeCourseDiscription(req: Request, res: Response) {
  return res.json({
    code: 0,
    data: {
      tabList: [
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
    statisticText: '85-良',
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
      chartData: {
        dountChartData: postDonutChartData(),
        pieChartData: postPieChartData(),
        gaugeChartData: postGaugeChartData(),
        liquidChartData: postLiquidChartData(),
        lineChartData: postLineChartData(),
        groupedColumnChartData: postGroupedColumnChartData(),
      },
    },
  });
}

function postGOUserData() {
  return {
    name: '用户统计',
    angleField: 'value',
    colorField: 'type',
    dataSource: [
      { type: '学生', value: 1730 },
      { type: '教师', value: 180 },
      { type: '管理员', value: 20 },
    ],
    contentName: ' ',
    contentValue: ' ',
  };
}

function postGOPieChartData() {
  return {
    name: '课程规模统计',
    angleField: 'value',
    colorField: 'type',
    dataSource: [
      { type: '其他', value: 102 },
      { type: '20-30人', value: 32 },
      { type: '10-20人', value: 18 },
    ],
  };
}

function postGODiscussionData() {
  return {
    name: '讨论统计',
    angleField: 'value',
    colorField: 'type',
    dataSource: [
      { type: '回复', value: 168 },
      { type: '主贴', value: 42 },
    ],
    contentName: ' ',
    contentValue: ' ',
  };
}

function postGOLineChartData() {
  return {
    name: '出勤统计',
    dataSource: [
      { date: '2023-09-01', attendance: 800 },
      { date: '2023-09-02', attendance: 1100 },
      { date: '2023-09-03', attendance: 600 },
      { date: '2023-09-04', attendance: 1400 },
    ],
    xField: 'date',
    yField: 'attendance',
    xAxis: '日期',
    yAxis: '出勤人数',
  };
}

function postGOColumnChartData() {
  return {
    name: 'Daily Homework Scores',
    dataSource: [
      { date: '2023-09-01', score: 700 },
      { date: '2023-09-02', score: 900 },
      { date: '2023-09-03', score: 620 },
      { date: '2023-09-04', score: 1300 },
      // 可以继续添加更多日期和分数数据
    ],
    xField: 'date',
    yField: 'score',
    xAlias: '日期',
    yAlias: '作业份数',
  };
}

async function postGeneralOverview(req: Request, res: Response) {
  return res.json({
    code: 0,
    data: {
      chartData: {
        userDountChartData: postGOUserData(),
        pieChartData: postGOPieChartData(),
        discussionDountChartData: postGODiscussionData(),
        lineChartData: postGOLineChartData(),
        columnChartData: postGOColumnChartData(),
      },
    },
  });
}

export default {
  'POST  /api/data-visualize/teacher-chart': postTeacherChart,
  'POST  /api/course/list-for-teacher': postFakeCourseDiscription,
  'POST  /api/data-visualize/general-overview': postGeneralOverview,
};
