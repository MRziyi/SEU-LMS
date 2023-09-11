import { Card } from 'antd';
import type { GaugeChartData } from '../../data';
import { Gauge } from '@ant-design/charts';

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
      range={[0, data?.value ? data?.value : 0]}
      format={(v) => {
        return v + '%';
      }}
      color={['l(0) 0:#C3D6DD 1:#1080D8']}
      statistic={{
        visible: true,
        text: data?.statisticText,
        //color: '',
      }}
    />
  </Card>
);

export default GaugeCard;
