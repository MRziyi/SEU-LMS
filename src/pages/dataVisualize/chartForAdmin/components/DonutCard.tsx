import { Card } from 'antd';
import type { DonutChartData } from '../../data';
import { Donut } from '@ant-design/charts';

const DonutCard = ({ data, loading }: { data: DonutChartData | null; loading: boolean }) => (
  <Card loading={loading} title={data?.name}>
    {data ? (
      <Donut
        forceFit={true}
        height={250}
        radius={0.95}
        padding="auto"
        data={data?.dataSource}
        angleField={data.angleField}
        colorField={data.colorField}
        color={['#1080D8', '#F7D66D', '#F4EECA', '#AED6F9', '#E5F9FA']}
      />
    ) : (
      <></>
    )}
  </Card>
);

export default DonutCard;
