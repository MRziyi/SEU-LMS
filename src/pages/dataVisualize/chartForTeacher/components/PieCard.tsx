import { Card } from 'antd';
import { Pie } from '@ant-design/charts';
import type { PieChartData } from '../../data';

//饼图组件
const PieCard = ({ loading, data }: { loading: boolean; data: PieChartData | null }) =>
  data ? (
    <Card
      loading={loading}
      //className={styles.salesCard}
      //bordered={false}
      title={data.name}
      //style={{height: '100%',}}
    >
      <Pie
        forceFit={true}
        //style={{ marginTop: '200px' }}
        height={250}
        radius={0.95}
        angleField={data.angleField}
        colorField={data.colorField}
        data={data.dataSource as any}
        //padding='auto'
        legend={{
          visible: true,
          position: 'bottom-center',
        }}
        label={{
          visible: true,
          type: 'spider',
        }}
        //color={['#856E8A','#C5D17F','#AF98B5','#E9E1E8']}
        color={['#9251C3', '#FCEBAC', '#E4C2D6', '#CAA1BA']}
      />
    </Card>
  ) : (
    <></>
  );

export default PieCard;
