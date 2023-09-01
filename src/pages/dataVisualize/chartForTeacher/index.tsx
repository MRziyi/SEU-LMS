import { useEffect, useState } from 'react';
import { TeacherChartData } from '../data';
import { queryTeacherChart } from '../service';
import { Card, Col, Row, Tabs, message } from 'antd';
import './index.less';
import DonutCard from './components/DonutCard';
import PieCard from './components/PieCard';
import GaugeCard from './components/GaugeCard';
import LiquidCard from './components/LiquidCard';
import LineCard from './components/LineCard';
import GroupedColumnCard from './components/GroupedColumnCard';

interface ChartForTeacherInterface {
  courseID: string;
  loadingFather: boolean;
}

const ChartForTeacher: React.FC<ChartForTeacherInterface> = ({ courseID, loadingFather }) => {
  const [teacherChartData, setTeacherChartData] = useState<TeacherChartData>();
  const [loading, setLoding] = useState<boolean>(false);

  useEffect(() => {
    queryTeacherChartAdaptor();
  }, []);

  async function queryTeacherChartAdaptor() {
    setLoding(true);
    try {
      const result = await queryTeacherChart(courseID);
      if (result.data) {
        message.success('表单数据拉取成功');
        setTeacherChartData(result.data);
      }
    } catch {}
    setLoding(false);
  }

  return (
    <>
      <Row gutter={24} className="card-row">
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          {/* <Card loading={loadingFather || loading} title={'上节课到课率 - ' + courseID}> */}
          <DonutCard
            donutChartData={teacherChartData?.dountChartData || null}
            loading={loadingFather || loading}
          />
          {/* </Card> */}
        </Col>

        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <PieCard
            data={teacherChartData?.pieChartData || null}
            loading={loadingFather || loading}
          />
        </Col>

        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <GaugeCard
            data={teacherChartData?.gaugeChartData || null}
            loading={loadingFather || loading}
          />
        </Col>

        {/* <Col xl={6} lg={24} md={24} sm={24} xs={24}>
          <LiquidCard
            data={teacherChartData?.liquidChartData ||null}
            loading={loadingFather || loading}
          />
        </Col> */}
      </Row>

      <Row gutter={24} className="card-row">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <LineCard
            data={teacherChartData?.lineChartData || null}
            loading={loadingFather || loading}
          />
        </Col>
      </Row>

      <Row gutter={24} className="card-row">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <GroupedColumnCard
            data={teacherChartData?.groupedColumnChartData || null}
            loading={loadingFather || loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default ChartForTeacher;
