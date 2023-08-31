import { Card } from 'antd';
import { Scatter } from '@ant-design/charts';
import type { ScatterChartData } from '../data';
import styles from '../style.less';

const ScatterCard = ({ loading, data }: { loading: boolean; data: ScatterChartData | null }) =>
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
        <Scatter
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
          colorField="label"
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
          label={{
            visible: true,
            type: 'point',
          }}
          trendline={{
            visible: true,
            type: 'quad',
            showConfidence: true,
          }}
        />
      </div>
    </Card>
  ) : (
    <></>
  );

export default ScatterCard;
