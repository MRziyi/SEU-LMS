import { Col, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { GeneralOverviewData } from '../../data';
import { queryGeneralOverview } from '../../service';
import DonutCard from '../components/DonutCard';
import PieCard from '../components/PieCard';
import LineCard from '../components/LineCard';
import ColumnCard from '../components/ColumnCard';
import './index.less';

const GeneralOverview: React.FC = () => {
  const [generalOverviewData, setGeneralOverviewData] = useState<GeneralOverviewData>();
  const [loading, setLoding] = useState<boolean>(false);

  useEffect(() => {
    queryGeneralOverviewAdaptor();
  }, []);

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

  return (
    <>
      <Row gutter={24} className="card-row">
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <DonutCard
            donutChartData={generalOverviewData?.userDountChartData || null}
            loading={loading}
          />
        </Col>

        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <PieCard
            data={generalOverviewData?.pieChartData || null}
            loading={loading}
          />
        </Col>

        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <DonutCard
            donutChartData={generalOverviewData?.discussionDountChartData || null}
            loading={loading}
          />
        </Col>
      </Row>

      <Row gutter={24} className="card-row">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <LineCard
            data={generalOverviewData?.lineChartData || null}
            loading={loading}
          />
        </Col>
      </Row>

      <Row gutter={24} className="card-row">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <ColumnCard
            data={generalOverviewData?.columnChartData || null}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default GeneralOverview;
