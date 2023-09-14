import { Card } from 'antd';
import type { DonutChartData } from '../../data';
import { Donut } from '@ant-design/charts';

//环形图组件
const DonutCard = ({ data, loading }: { data: DonutChartData | null; loading: boolean }) => (
  <Card loading={loading} title={data?.name}>
    {data ? (
      <Donut
        forceFit={true}
        height={250}
        radius={0.95}
        padding="auto"
        data={data?.dataSource}
        statistic={{
          visible: true,
          content: {
            value: data.contentValue,
            name: data.contentName,
          },
        }}
        angleField={data.angleField}
        colorField={data.colorField}
        color={['#9251C3', '#FCEBAC', '#E4C2D6', '#CAA1BA']}
      />
    ) : (
      <></>
    )}
  </Card>
);

export default DonutCard;
