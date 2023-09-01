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
    <div>
      {donutChartData ? (
        <Donut
          forceFit={true}
          height={250}
          radius={0.95}
          padding="auto"
          data={donutChartData?.dataSource}
          statistic={{
            visible: true,
            content: {
              value: donutChartData.contentValue,
              name: donutChartData.contentName,
            },
          }}
          angleField={donutChartData.angleField}
          colorField={donutChartData.colorField}
          color={['#9251C3', '#FCEBAC', '#E4C2D6', '#CAA1BA']}
        />
      ) : (
        <></>
      )}
    </div>
  </Card>
);

export default DonutCard;
