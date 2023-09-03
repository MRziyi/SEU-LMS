import { Card } from 'antd';
import { Pie } from '@ant-design/charts';
import type { PieChartData } from '../../data';

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
        radius={0.85}
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
        //color={['#609DCC','#CD8599','#E0D5C3','#74B2BF']}
        color={['#1080D8', '#F7D66D', '#F4EECA', '#AED6F9', '#E5F9FA']}
        //color={['#1080D8','#64ACBF','#C68332','#EDAB63','#FAD9B5']}
        //color={['#296FC7','#F25B67','#F7E8E9','#CFE1F7']}//2
        //color={['#1943B8','#6267E7','#FEFFE0','#A8C9FD']}//3
        //color={['#3E7FB9','#F87A70','#FFCD83']}
      />
    </Card>
  ) : (
    <></>
  );

export default PieCard;
