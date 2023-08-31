import { DataItem } from '@antv/g2plot/esm/interface/config';

export { DataItem };

export type RadarData = {
  name: string;
  label: string;
  value: number;
};

export type DataWithLabel = {
  label: string;
  x: number;
  y: number;
};

export type BarChartData = {
  name: string;
  type: string;
  xAxis: string;
  yAxis: string;
  data: DataItem[];
  source: string;
};

export type PieChartData = {
  name: string;
  type: string;
  unit: string;
  data: DataItem[];
  source: string;
};

export type RadarChartData = {
  name: string;
  type: string;
  unit: string;
  data: RadarData[];
  source: string;
};

export type LineChartData = {
  name: string;
  type: string;
  xAxis: string;
  yAxis: string;
  unit: string;
  data: DataWithLabel[];
  source: string;
};

export type ScatterChartData = {
  name: string;
  type: string;
  xAxis: string;
  yAxis: string;
  unit: string;
  data: DataWithLabel[];
  source: string;
};

export interface AnalysisData {
  globalScaleData: BarChartData;
  localScaleData: BarChartData;
  platformScaleData: PieChartData;
  rankData: RadarChartData;
  globalRegionScaleData: ScatterChartData;
  userScale: LineChartData;
}
consumerCapacity;
