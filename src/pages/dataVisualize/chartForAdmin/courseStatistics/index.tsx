import { Col, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { CourseStatisticsData } from '../../data';
import { queryCourseSiatistics } from '../../service';
import DonutCard from '../components/DonutCard';
import GaugeCard from '../components/GaugeCard';
import PieCard from '../components/PieCard';
import LineCard from '../components/LineCard';
import ColumnCard from '../components/ColumnCard';
interface CourseStatisticsInterface {
  courseID: string;
}
const CourseStatistics: React.FC<CourseStatisticsInterface> = ({ courseID }) => {
  const [courseStatisticsData, setCourseStatisticsData] = useState<CourseStatisticsData>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    queryCourseStatisticsAdaptor();
  }, [courseID]);

  async function queryCourseStatisticsAdaptor() {
    setLoading(true);
    try {
      const result = await queryCourseSiatistics(courseID);
      if (result.data.chartData) {
        message.success('表单数据拉取成功');
        setCourseStatisticsData(result.data.chartData);
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
              dataSource: courseStatisticsData?.dountChartData
                ? courseStatisticsData.dountChartData
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
              value: courseStatisticsData?.gaugeChartData ? courseStatisticsData.gaugeChartData : 0,
              statisticText: getRating(
                courseStatisticsData?.gaugeChartData ? courseStatisticsData.gaugeChartData : 0,
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
              dataSource: courseStatisticsData?.pieChartData
                ? courseStatisticsData.pieChartData
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
              name: '各教师到课率',
              dataSource: courseStatisticsData?.lineChartData
                ? courseStatisticsData.lineChartData
                : [],
              xField: 'teacher',
              yField: 'attendance',
              xAxis: '教师姓名',
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
              name: '各教师作业均分',
              dataSource: courseStatisticsData?.columnChartData
                ? courseStatisticsData.columnChartData
                : [],
              xField: 'teacher',
              yField: 'score',
              xAlias: '教师姓名',
              yAlias: '均分',
            }}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default CourseStatistics;
