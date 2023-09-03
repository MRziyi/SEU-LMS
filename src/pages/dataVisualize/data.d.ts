import { DataItem } from '@antv/g2plot/esm/interface/config';

export type DonutChartData = {
  name: string;
  angleField: string;
  colorField: string;
  dataSource: DataItem[];
  contentName: string;
  contentValue: string;
};

export type PieChartData = {
  name: string;
  angleField: string;
  colorField: string;
  dataSource: DataItem[];
};

export type GaugeChartData = {
  name: string;
  value: number;
  statisticText: string;
};

export type LiquidChartData = {
  name: string;
  value: number;
};

export type LineChartData = {
  name: string;
  dataSource: DataItem[];
  xField: string;
  yField: string;
  xAxis: string;
  yAxis: string;
};

export type GroupedColumnChartData = {
  name: string;
  dataSource: DataItem[];
  xField: string;
  yField: string;
  xAlias: string;
  yAlias: string;
  groupField: string;
};

export type ColumnChartData = {
  name: string;
  dataSource: DataItem[];
  xField: string;
  yField: string;
  xAlias: string;
  yAlias: string;
};

export type CourseDiscription = {
  courseID: string;
  courseName: string;
};

export type TeacherDiscription = {
  teacherID: string;
  teacherName: string;
};

export type TeacherChartData = {
  dountChartData: DataItem[]; //必须包含“已签到”和“未签到”，{ type: '已签到', value: 45 },
  pieChartData: DataItem[]; //{ type: '已批改', value: 32 },
  gaugeChartData: number; //0~100之间的一个数字
  lineChartData: DataItem[]; //{ chapter: 'Chapter 1', attendanceRate: 80 },
  groupedColumnChartData: DataItem[]; //{ chapter: 'Chapter 1', task: 'Task 1', score: 85 },
};

export type GeneralOverviewData = {
  userDountChartData: DataItem[];
  pieChartData: DataItem[];
  discussionDountChartData: DataItem[];
  lineChartData: DataItem[];
  columnChartData: DataItem[];
};

export type TeacherStatisticsData = {
  dountChartData: DataItem[];
  gaugeChartData: number;
  pieChartData: DataItem[];
  lineChartData: DataItem[];
  columnChartData: DataItem[];
};

export type CourseStatisticsData = {
  dountChartData: DataItem[];
  gaugeChartData: number;
  pieChartData: DataItem[];
  lineChartData: DataItem[];
  columnChartData: DataItem[];
};
