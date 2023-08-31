import { Card } from 'antd';
import { Line } from '@ant-design/charts';
import type { LineChartData } from '../data';
import styles from '../style.less';

const LineCard = ({ loading, data }: { loading: boolean; data: LineChartData | null }) =>
  data ? (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title={data.name}
      style={{
        height: '100%',
      }}
    >
      <div style={{ marginTop: '-20px' }}>
        <Line
          title={{
            visible: true,
            text: data.unit,
          }}
          description={{
            visible: true,
            text: data.source,
          }}
          padding="auto"
          forceFit
          seriesField="label"
          xField="x"
          yField="y"
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
          data={data.data}
          responsive
          point={{ visible: true }}
        />
      </div>
    </Card>
  ) : (
    <></>
  );

export default LineCard;
