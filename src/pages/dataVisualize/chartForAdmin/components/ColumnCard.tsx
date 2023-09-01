import { Card } from "antd";
import { ColumnChartData } from "../../data";
import { Column } from "@ant-design/charts";

const ColumnCard = ({
    data,
    loading,
  }: {
    data: ColumnChartData | null;
    loading: boolean;
  }) =>
    data ? (
        <Card loading={loading} bordered={false} title={data.name}>
        <Column
          forceFit={true}
          padding="auto"
          xField={data.xField}
          yField={data.yField}
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
              fontSize: 12,
              fontWeight: 600,
              opacity: 0.6,
            },
          }}
          color={['#1080D8','#FEDA90','#C3D6DD','#F4EECA']}
        />
      </Card>
  ) : (
    <></>
  );

export default ColumnCard;
