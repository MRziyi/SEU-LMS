import type { Request, Response } from 'express';
import { AnalysisData } from './data.d';

const data: AnalysisData = {
  globalScaleData: {
    name: 'Global E-commerce Market Scale',
    type: 'bar',
    xAxis: 'Year',
    yAxis: 'Trillion USD',
    data: [
      {
        x: '2019',
        y: 3.53,
      },
      {
        x: '2020',
        y: 4.28,
      },
      {
        x: '2021',
        y: 4.89,
      },
      {
        x: '2022',
        y: 5.43,
      },
      {
        x: '2023',
        y: 6.07,
      },
    ],
    source: 'Source: https://www.thepaper.cn/newsDetail_forward_18000936',
  },
  localScaleData: {
    name: "China's E-commerce Market Scale",
    type: 'bar',
    xAxis: 'Year',
    yAxis: 'Trillion RMB',
    data: [
      {
        x: '2019',
        y: 34.81,
      },
      {
        x: '2020',
        y: 41.13,
      },
      {
        x: '2021',
        y: 46.38,
      },
      {
        x: '2022',
        y: 51.97,
      },
      {
        x: '2023',
        y: 58.23,
      },
    ],
    source: 'Source: https://www.woshipm.com/it/5367270.html',
  },
  platformScaleData: {
    name: "China's E-commerce Platform User Scale",
    unit: 'User Scale (Billion People)',
    type: 'pie',
    data: [
      {
        x: 'Taobao',
        y: 7.85,
      },
      {
        x: 'JD',
        y: 5.43,
      },
      {
        x: 'PinDuoDuo',
        y: 8.62,
      },
      {
        x: 'TicTok',
        y: 6.01,
      },
      {
        x: 'Others',
        y: 4.09,
      },
    ],
    source: 'Source: https://zhuanlan.zhihu.com/p/180201988',
  },
  rankData: {
    name: 'China E-commerce Platform Ranking',
    type: 'radar',
    unit: 'Platform Ranking (0-1)',
    data: [
      {
        label: 'Throughput',
        name: 'TaoBao',
        value: 0.9,
      },
      {
        label: 'Throughput',
        name: 'JD',
        value: 0.7,
      },
      {
        label: 'Throughput',
        name: 'PinDuoDuo',
        value: 0.8,
      },
      {
        label: 'Throughput',
        name: 'TicTok',
        value: 0.6,
      },
      {
        label: 'Conversion Rate',
        name: 'TaoBao',
        value: 0.6,
      },
      {
        label: 'Conversion Rate',
        name: 'JD',
        value: 0.8,
      },
      {
        label: 'Conversion Rate',
        name: 'PinDuoDuo',
        value: 0.7,
      },
      {
        label: 'Conversion Rate',
        name: 'TicTok',
        value: 0.5,
      },
      {
        label: 'Repurchase Rate',
        name: 'TaoBao',
        value: 0.7,
      },
      {
        label: 'Repurchase Rate',
        name: 'JD',
        value: 0.8,
      },
      {
        label: 'Repurchase Rate',
        name: 'PinDuoDuo',
        value: 0.6,
      },
      {
        label: 'Repurchase Rate',
        name: 'TicTok',
        value: 0.4,
      },
      {
        label: 'Cost per Customer',
        name: 'TaoBao',
        value: 0.5,
      },
      {
        label: 'Cost per Customer',
        name: 'JD',
        value: 0.7,
      },
      {
        label: 'Cost per Customer',
        name: 'PinDuoDuo',
        value: 0.4,
      },
      {
        label: 'Cost per Customer',
        name: 'TicTok',
        value: 0.6,
      },
      {
        label: 'Customer Satisfaction',
        name: 'TaoBao',
        value: 0.8,
      },
      {
        label: 'Customer Satisfaction',
        name: 'JD',
        value: 0.9,
      },
      {
        label: 'Customer Satisfaction',
        name: 'PinDuoDuo',
        value: 0.7,
      },
      {
        label: 'Customer Satisfaction',
        name: 'TicTok',
        value: 0.6,
      },
    ],
    source:
      'Source: https://www.dataapplab.com/ecommerce-trend-report-the-state-of-the-industry-in-2022/',
  },
  globalRegionScaleData: {
    name: 'Global E-commerce Market Scale',
    type: 'scatter',
    unit: 'Market Scale (Trillion USD)',
    xAxis: 'Year',
    yAxis: 'Trillion USD',
    data: [
      { label: 'North America', x: 2019, y: 1870 },
      { label: 'North America', x: 2020, y: 2200 },
      { label: 'North America', x: 2021, y: 2600 },
      { label: 'North America', x: 2027, y: 4800 },
      { label: 'European', x: 2019, y: 1560 },
      { label: 'European', x: 2020, y: 1800 },
      { label: 'European', x: 2021, y: 2100 },
      { label: 'European', x: 2027, y: 3900 },
      { label: 'Asia-Pacific', x: 2019, y: 3200 },
      { label: 'Asia-Pacific', x: 2020, y: 3600 },
      { label: 'Asia-Pacific', x: 2021, y: 4200 },
      { label: 'Asia-Pacific', x: 2027, y: 7800 },
      { label: 'Other', x: 2019, y: 700 },
      { label: 'Other', x: 2020, y: 800 },
      { label: 'Other', x: 2021, y: 900 },
      { label: 'Other', x: 2027, y: 1700 },
    ],
    source: 'Source: https://www.grandviewresearch.com/press-release/global-e-commerce-market',
  },

  userScale: {
    name: "China's E-commerce Platform User Scale",
    type: 'line',
    unit: 'User Scale (Billion People)',
    xAxis: 'Year',
    yAxis: 'Billion People',
    data: [
      {
        label: 'Total E-Market User',
        x: 2016,
        y: 4.61,
      },
      {
        label: 'Total E-Market User',
        x: 2017,
        y: 5.13,
      },
      {
        label: 'Total E-Market User',
        x: 2018,
        y: 5.64,
      },
      {
        label: 'Total E-Market User',
        x: 2019,
        y: 6.07,
      },
      {
        label: 'Total E-Market User',
        x: 2020,
        y: 7.11,
      },
      {
        label: 'Mobile E-Market User',
        x: 2016,
        y: 4.51,
      },
      {
        label: 'Mobile E-Market User',
        x: 2017,
        y: 4.98,
      },
      {
        label: 'Mobile E-Market User',
        x: 2018,
        y: 5.45,
      },
      {
        label: 'Mobile E-Market User',
        x: 2019,
        y: 5.87,
      },
      {
        label: 'Mobile E-Market User',
        x: 2020,
        y: 6.88,
      },
    ],
    source: 'Source: https://www.chyxx.com/industry/202011/925321.html',
  },
};

export default {
  'GET /api/getChartData': (_: Request, res: Response) => {
    console.log('Gocha!');
    res.send({
      code: 0,
      data,
    });
  },
};
