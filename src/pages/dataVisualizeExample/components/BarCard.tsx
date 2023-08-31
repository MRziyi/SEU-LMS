import { Card, Tabs } from 'antd';
import { Column } from '@ant-design/charts';

import type { BarChartData } from '../data';
import styles from '../style.less';

const { TabPane } = Tabs;

const BarCard = ({
  dataA,
  dataB,
  loading,
}: {
  dataA: BarChartData | null;
  dataB: BarChartData | null;
  loading: boolean;
}) => (
  <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
    <div className={styles.salesCard}>
      {dataA && dataB ? (
        <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
          <TabPane tab="Global" key="global">
            <div className={styles.salesBar}>
              <Column
                height={300}
                forceFit
                data={dataA.data as any}
                xField="x"
                yField="y"
                xAxis={{
                  visible: true,
                  title: {
                    visible: true,
                    text: dataA.xAxis,
                  },
                }}
                yAxis={{
                  visible: true,
                  title: {
                    visible: true,
                    text: dataA.yAxis,
                  },
                }}
                title={{
                  visible: true,
                  text: dataA.name,
                }}
                padding="auto"
                conversionTag={{ visible: true }}
                meta={{
                  y: {
                    alias: '销售量',
                  },
                }}
                description={{
                  visible: true,
                  text: dataA.source,
                }}
                label={{
                  visible: true,
                  position: 'middle',
                }}
              />
            </div>
          </TabPane>
          <TabPane tab="China's" key="china">
            <div className={styles.salesBar}>
              <Column
                height={300}
                forceFit
                data={dataB.data as any}
                xField="x"
                yField="y"
                xAxis={{
                  visible: true,
                  title: {
                    visible: true,
                    text: dataB.xAxis,
                  },
                }}
                yAxis={{
                  visible: true,
                  title: {
                    visible: true,
                    text: dataB.yAxis,
                  },
                }}
                title={{
                  visible: true,
                  text: dataB.name,
                }}
                padding="auto"
                conversionTag={{ visible: true }}
                meta={{
                  y: {
                    alias: '销售量',
                  },
                }}
                label={{
                  visible: true,
                  position: 'middle',
                }}
                description={{
                  visible: true,
                  text: dataB.source,
                }}
              />
            </div>
          </TabPane>
        </Tabs>
      ) : (
        <></>
      )}
    </div>
  </Card>
);

export default BarCard;
