import { Col, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { TeacherStatisticsData } from '../../data';
import { queryTeacherStatistics } from '../../service';
import DonutCard from '../components/DonutCard';
import GaugeCard from '../components/GaugeCard';
import PieCard from '../components/PieCard';
import LineCard from '../components/LineCard';
import ColumnCard from '../components/ColumnCard';
interface TeacherStatisticsInterface {
  teacherID: string;
}
const TeacherStatistics: React.FC<TeacherStatisticsInterface> = ({ teacherID }) => {
  const [teacherStatisticsData, setTeacherStatisticsData] = useState<TeacherStatisticsData>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    queryTeacherStatisticsAdaptor();
  }, [teacherID]);

  async function queryTeacherStatisticsAdaptor() {
    setLoading(true);
    try {
      const result = await queryTeacherStatistics(teacherID);
      if (result.data.chartData) {
        message.success('表单数据拉取成功');
        setTeacherStatisticsData(result.data.chartData);
      }
    } catch {}
    setLoading(false);
  }

  const getRating = (score: number): string => {
    if (score >= 90) {
      return `${score}%-优`;
    } else if (score >= 80) {
      return `${score}%-良`;
    } else if (score >= 70) {
      return `${score}%-中`;
    } else if (score >= 60) {
      return `${score}%-及格`;
    } else {
      return `${score}%-不及格`;
    }
  };

  return (
    <>
      <Row gutter={24} className="card-row">
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <DonutCard
            data={{
              name: '学生分布',
              angleField: 'value',
              colorField: 'type',
              dataSource: teacherStatisticsData?.dountChartData
                ? teacherStatisticsData.dountChartData
                : [],
              contentName: '',
              contentValue: '',
            }}
            loading={loading}
          />
        </Col>

        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <GaugeCard
            data={{
              name: '总到课率',
              value: teacherStatisticsData?.gaugeChartData
                ? teacherStatisticsData.gaugeChartData
                : 0,
              statisticText: getRating(
                teacherStatisticsData?.gaugeChartData ? teacherStatisticsData.gaugeChartData : 0,
              ),
            }}
            loading={loading}
          />
        </Col>

        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <PieCard
            data={{
              name: '总作业等第',
              angleField: 'value',
              colorField: 'type',
              dataSource: teacherStatisticsData?.pieChartData
                ? teacherStatisticsData.pieChartData
                : [],
            }}
            loading={loading}
          />
        </Col>
      </Row>

      <Row gutter={24} className="card-row">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <LineCard
            data={{
              name: '各科到课率',
              dataSource: teacherStatisticsData?.lineChartData
                ? teacherStatisticsData.lineChartData
                : [],
              xField: 'course',
              yField: 'attendance',
              xAxis: '课程',
              yAxis: '到课率(%)',
            }}
            loading={loading}
          />
        </Col>
      </Row>

      <Row gutter={24} className="card-row">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <ColumnCard
            data={{
              name: '各科作业均分',
              dataSource: teacherStatisticsData?.columnChartData
                ? teacherStatisticsData.columnChartData
                : [],
              xField: 'course',
              yField: 'score',
              xAlias: '课程',
              yAlias: '均分',
            }}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default TeacherStatistics;
