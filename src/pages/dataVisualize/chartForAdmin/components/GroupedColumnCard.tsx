import { Card } from 'antd';
import { GroupedColumnChartData } from '../../data';
import { GroupedColumn } from '@ant-design/charts';

//组合柱状图
const GroupedColumnCard = ({
  data,
  loading,
}: {
  data: GroupedColumnChartData | null;
  loading: boolean;
}) =>
  data ? (
    <Card loading={loading} bordered={false} title={data.name}>
      <GroupedColumn
        forceFit={true}
        padding="auto"
        xField={data.xField}
        yField={data.yField}
        colorField={data.groupField}
        groupField={data.groupField}
        color={['#1080D8','#FEDA90','#C3D6DD','#F4EECA']}
        xAxis={{
          visible: true,
          title: {
            visible: true,
            text: data.xAlias,
          },
        }}
        yAxis={{
          visible: true,
          title: {
            visible: true,
            text: data.yAlias,
          },
        }}
        data={data.dataSource}
        label={{
          visible: true,
          style: {
            fill: '#002B4B',
            //'#0D0E68',
            fontSize: 12,
            fontWeight: 600,
            opacity: 0.6,
          },
        }}
      />
    </Card>
  ) : (
    <></>
  );

export default GroupedColumnCard;
