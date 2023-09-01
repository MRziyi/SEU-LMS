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
  dountChartData: DonutChartData;
  pieChartData: PieChartData;
  gaugeChartData: GaugeChartData;
  liquidChartData: LiquidChartData;
  lineChartData: LineChartData;
  groupedColumnChartData: GroupedColumnChartData;
};

export type GeneralOverviewData = {
  userDountChartData: DonutChartData;
  pieChartData: PieChartData;
  discussionDountChartData: DonutChartData;
  lineChartData: LineChartData;
  columnChartData: ColumnChartData;
};
