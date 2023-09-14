import { Card } from 'antd';
import type { GaugeChartData } from '../../data';
import { Gauge } from '@ant-design/charts';

//仪表盘组件
const GaugeCard = ({ data, loading }: { data: GaugeChartData | null; loading: boolean }) => (
  <Card loading={loading} title={data?.name}>
    <Gauge
      value={data?.value}
      height={250}
      //width={280}
      min={0}
      max={100}
      padding="auto"
      forceFit={true}
      range={[0, data?.value ? data?.value : 85]}
      format={(v) => {
        return v + '%';
      }}
      color={['l(0) 0:#E4C2D6 1:#9251C3']}
      statistic={{
        visible: true,
        text: data?.statisticText,
        //color: '',
      }}
    />
  </Card>
);

export default GaugeCard;
