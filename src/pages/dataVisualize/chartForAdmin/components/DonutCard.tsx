import { Card } from 'antd';
import type { DonutChartData } from '../../data';
import { Donut } from '@ant-design/charts';

const DonutCard = ({
  donutChartData,
  loading,
}: {
  donutChartData: DonutChartData | null;
  loading: boolean;
}) => (
  <Card loading={loading} title={donutChartData?.name}>
      {donutChartData ? (
        <Donut
          forceFit={true}
          height={250}
          radius={0.95}
          padding="auto"
          data={donutChartData?.dataSource}
          angleField={donutChartData.angleField}
          colorField={donutChartData.colorField}
          color={['#1080D8','#FEDA90','#C3D6DD','#F4EECA']}
        />
      ) : (
        <></>
      )}
  </Card>
);

export default DonutCard;
