import { Card } from 'antd';
import type { LiquidChartData } from '../../data';
import { Liquid } from '@ant-design/charts';

const LiquidCard = ({ data, loading }: { data: LiquidChartData | null; loading: boolean }) => (
  <Card loading={loading} title={data?.name}>
    <Liquid
      height={250}
      min={0}
      max={100}
      value={data?.value ? data?.value : 0}
      statistic={{ formatter: (value) => ((100 * value) / 100).toFixed(1) + '%' }}
      color={['#1080D8', '#F7D66D', '#F4EECA', '#AED6F9', '#E5F9FA']}
    />
  </Card>
);

export default LiquidCard;
