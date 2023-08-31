import { request } from 'umi';
import type { AnalysisData } from './data.d';

export async function getChartData(): Promise<{ data: AnalysisData }> {
  return request('/api/getChartData', {
    method: 'GET',
  });
}
