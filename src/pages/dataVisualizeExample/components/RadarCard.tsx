import { Card } from 'antd';
import { Radar } from '@ant-design/charts';
import type { RadarChartData } from '../data';
import styles from '../style.less';

const RadarCard = ({ loading, data }: { loading: boolean; data: RadarChartData | null }) =>
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
        <Radar
          title={{
            visible: true,
            text: data.unit,
          }}
          description={{
            visible: true,
            text: data.source,
          }}
          angleField="label"
          radiusField="value"
          seriesField="name"
          radiusAxis={{ grid: { line: { type: 'line' } } }}
          line={{ visible: true }}
          point={{
            visible: true,
            shape: 'circle',
          }}
          legend={{
            visible: true,
            position: 'bottom-center',
          }}
          data={data.data}
        />
      </div>
    </Card>
  ) : (
    <></>
  );

export default RadarCard;
