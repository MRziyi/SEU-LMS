import { Card } from 'antd';
import { Pie } from '@ant-design/charts';
import type { PieChartData } from '../data';
import styles from '../style.less';

const PieCard = ({ loading, data }: { loading: boolean; data: PieChartData | null }) =>
  data ? (
    <Card
      // loading={loading}
      className={styles.salesCard}
      bordered={false}
      title={data.name}
      style={{
        height: '100%',
      }}
    >
      <div style={{ marginTop: '-20px' }}>
        <Pie
          forceFit
          height={360}
          radius={0.8}
          angleField="y"
          colorField="x"
          data={data.data as any}
          legend={{
            visible: false,
          }}
          label={{
            visible: true,
            type: 'spider',
          }}
          title={{
            visible: true,
            text: data.unit,
          }}
          description={{
            visible: true,
            text: data.source,
          }}
        />
      </div>
    </Card>
  ) : (
    <></>
  );

export default PieCard;
