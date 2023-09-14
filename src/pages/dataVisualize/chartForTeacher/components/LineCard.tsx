import { Card } from 'antd';
import { LineChartData } from '../../data';
import { Line } from '@ant-design/charts';

//折线图组件
const LineCard = ({ loading, data }: { loading: boolean; data: LineChartData | null }) =>
  data ? (
    <Card loading={loading} bordered={false} title={data.name}>
      <div style={{ marginTop: '-20px' }}>
        <Line
          padding="auto"
          forceFit
          xField={data.xField}
          yField={data.yField}
          color={'#9251C3'}
          xAxis={{
            visible: true,
            title: {
              visible: true,
              text: data.xAxis,
            },
          }}
          yAxis={{
            visible: true,
            title: {
              visible: true,
              text: data.yAxis,
            },
          }}
          legend={{
            visible: true,
            position: 'right-top',
          }}
          data={data.dataSource}
          responsive
          point={{ visible: true }}
        />
      </div>
    </Card>
  ) : (
    <></>
  );

export default LineCard;
