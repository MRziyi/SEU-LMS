import { useEffect, useState } from 'react';
import { TeacherChartData } from '../data';
import { queryTeacherChart } from '../service';
import { Col, Row, message } from 'antd';
import './index.less';
import DonutCard from './components/DonutCard';
import PieCard from './components/PieCard';
import GaugeCard from './components/GaugeCard';
import LineCard from './components/LineCard';
import GroupedColumnCard from './components/GroupedColumnCard';
import { DataItem } from '@antv/g2plot/esm/interface/config';

//教师界面课程统计可视化
interface ChartForTeacherInterface {
  courseID: string;
  loadingFather: boolean;
}

const ChartForTeacher: React.FC<ChartForTeacherInterface> = ({ courseID, loadingFather }) => {
  const [teacherChartData, setTeacherChartData] = useState<TeacherChartData>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (courseID !== '') queryTeacherChartAdaptor();
  }, [courseID]);

  async function queryTeacherChartAdaptor() {
    setLoading(true);
    try {
      const result = await queryTeacherChart(courseID);
      if (result.data.chartData) {
        message.success('表单数据拉取成功');
        setTeacherChartData(result.data.chartData);
      }
    } catch {}
    setLoading(false);
  }

  const calculateAttendanceRate = (data: DataItem[]): string => {
    const attendedItem = data.find((item) => item.type === '已签到');
    const notAttendedItem = data.find((item) => item.type === '未签到');

    if (!attendedItem || !notAttendedItem) {
      return '数据不完整';
    }

    const attendedCount = attendedItem ? (attendedItem.value as number) : 0;
    const notAttendedCount = notAttendedItem ? (notAttendedItem.value as number) : 0;

    const rate = (attendedCount / (attendedCount + notAttendedCount)) * 100;

    return `${rate.toFixed(2)}%`;
  };

  const getRating = (score: number): string => {
    if (score >= 90) {
      return `${score}-优`;
    } else if (score >= 80) {
      return `${score}-良`;
    } else if (score >= 70) {
      return `${score}-中`;
    } else if (score >= 60) {
      return `${score}-及格`;
    } else {
      return `${score}-不及格`;
    }
  };

  return (
    <>
      <Row gutter={24} className="card-row">
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <DonutCard
            data={{
              name: '上节课到课率',
              angleField: 'value',
              colorField: 'type',
              dataSource: teacherChartData?.dountChartData ? teacherChartData.dountChartData : [],
              contentName: '到课率',
              contentValue: calculateAttendanceRate(
                teacherChartData?.dountChartData ? teacherChartData?.dountChartData : [],
              ),
            }}
            loading={loadingFather || loading}
          />
        </Col>

        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <PieCard
            data={{
              name: '上节课作业情况',
              angleField: 'value',
              colorField: 'type',
              dataSource: teacherChartData?.pieChartData ? teacherChartData.pieChartData : [],
            }}
            loading={loadingFather || loading}
          />
        </Col>

        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <GaugeCard
            data={{
              name: '上次作业均分',
              value: teacherChartData?.gaugeChartData ? teacherChartData.gaugeChartData : 0,
              statisticText: getRating(
                teacherChartData?.gaugeChartData ? teacherChartData.gaugeChartData : 0,
              ),
            }}
            loading={loadingFather || loading}
          />
        </Col>
      </Row>

      <Row gutter={24} className="card-row">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <LineCard
            data={{
              name: '历史到课率',
              dataSource: teacherChartData?.lineChartData ? teacherChartData.lineChartData : [],
              xField: 'chapter',
              yField: 'attendanceRate',
              xAxis: '章节名称',
              yAxis: '到课率(%)',
            }}
            loading={loadingFather || loading}
          />
        </Col>
      </Row>

      <Row gutter={24} className="card-row">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <GroupedColumnCard
            data={{
              name: '历史作业均分',
              dataSource: teacherChartData?.groupedColumnChartData
                ? teacherChartData.groupedColumnChartData
                : [],
              xField: 'chapter',
              yField: 'score',
              xAlias: '章节名称',
              yAlias: '平均分',
              groupField: 'task',
            }}
            loading={loadingFather || loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default ChartForTeacher;
