import { Col, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { GeneralOverviewData } from '../../data';
import { queryGeneralOverview } from '../../service';
import DonutCard from '../components/DonutCard';
import PieCard from '../components/PieCard';
import LineCard from '../components/LineCard';
import ColumnCard from '../components/ColumnCard';
import './index.less';

//管理员页面总体概览可视化
const GeneralOverview: React.FC = () => {
  const [generalOverviewData, setGeneralOverviewData] = useState<GeneralOverviewData>();
  const [loading, setLoding] = useState<boolean>(false);

  useEffect(() => {
    queryGeneralOverviewAdaptor();
  }, []);

  //数据获取
  async function queryGeneralOverviewAdaptor() {
    setLoding(true);
    try {
      const result = await queryGeneralOverview();
      if (result.data.chartData) {
        message.success('表单数据拉取成功');
        setGeneralOverviewData(result.data.chartData);
      }
    } catch {}
    setLoding(false);
  }

  //组合图表渲染
  return (
    <>
      <Row gutter={24} className="card-row">
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <DonutCard
            data={{
              name: '用户统计',
              angleField: 'value',
              colorField: 'type',
              dataSource: generalOverviewData?.userDountChartData
                ? generalOverviewData.userDountChartData
                : [],
              contentName: '',
              contentValue: '',
            }}
            loading={loading}
          />
        </Col>

        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <PieCard
            data={{
              name: '课程规模统计',
              angleField: 'value',
              colorField: 'type',
              dataSource: generalOverviewData?.pieChartData ? generalOverviewData.pieChartData : [],
            }}
            loading={loading}
          />
        </Col>

        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <DonutCard
            data={{
              name: '讨论统计',
              angleField: 'value',
              colorField: 'type',
              dataSource: generalOverviewData?.discussionDountChartData
                ? generalOverviewData.discussionDountChartData
                : [],
              contentName: '',
              contentValue: '',
            }}
            loading={loading}
          />
        </Col>
      </Row>

      <Row gutter={24} className="card-row">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <LineCard
            data={{
              name: '出勤统计',
              dataSource: generalOverviewData?.lineChartData
                ? generalOverviewData.lineChartData
                : [],
              xField: 'date',
              yField: 'attendance',
              xAxis: '日期',
              yAxis: '出勤人数',
            }}
            loading={loading}
          />
        </Col>
      </Row>

      <Row gutter={24} className="card-row">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <ColumnCard
            data={{
              name: '作业提交统计',
              dataSource: generalOverviewData?.columnChartData
                ? generalOverviewData.columnChartData
                : [],
              xField: 'date',
              yField: 'num',
              xAlias: '日期',
              yAlias: '作业份数',
            }}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default GeneralOverview;
