import { useEffect, useState } from 'react';
import { DualLine, GroupedColumn, Line } from '@ant-design/charts';
import { TeacherChartData } from '../data';
import { queryTeacherChart } from '../service';
import { Card, Col, Row, Tabs, message } from 'antd';

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
      if (result.data.chartData) {
        message.success('表单数据拉取成功');
        setTeacherChartData(result.data.chartData);
      }
    } catch {}
    setLoding(false);
  }

  const config = {
    forceFit: true,
    data: teacherChartData?.courseSituation,
    padding: 'auto',
    xField: 'courseName',
    xAxis: {
      visible: true,
      label: {
        visible: true,
        autoHide: true,
      },
    },
    yAxis: {
      visible: true,
      formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
    },
    yField: 'averageScore',
    interactions: [
      {
        type: 'slider',
        cfg: {
          start: 0.4,
          end: 0.45,
        },
      },
    ],
  };

  return (
    <>
      <Row gutter={24} className="card-row">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card loading={loadingFather || loading} title={'课程均分统计 - ' + courseID}>
            <Line {...config} />
          </Card>
        </Col>
      </Row>

      <Row gutter={24} className="card-row">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card loading={loadingFather || loading} title="教学情况统计">
            <Tabs
              defaultActiveKey="1"
              tabPosition="left"
              style={{ height: 400 }}
              items={teacherChartData?.teachingSituationData.map((item, index) => {
                const combinedData = item.teacherName.flatMap((teacher, i) => [
                  { teacherName: teacher, indicator: '考勤率', value: item.attendance[i] },
                  { teacherName: teacher, indicator: '作业均分', value: item.averageScore[i] },
                ]);
                return {
                  label: item.courseName,
                  key: item.courseName,
                  children: (
                    <Row gutter={24}>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <GroupedColumn
                          forceFit={true}
                          padding="auto"
                          xField="teacherName"
                          yField="value"
                          colorField="indicator"
                          groupField="indicator"
                          meta={{
                            teacherName: { alias: '教师姓名' },
                            value: { alias: '考勤率(%) / 作业均分' },
                          }}
                          data={combinedData}
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
                          color={['#75AD5A', '#FFB824']}
                        />
                      </Col>
                    </Row>
                  ),
                };
              })}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={24} className="card-row">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card loading={loadingFather || loading} title="教学情况统计">
            <Tabs
              defaultActiveKey="1"
              tabPosition="left"
              style={{ height: 400 }}
              items={teacherChartData?.sectionSituation.map((item, index) => {
                const attendanceData = item.lessonTitle.flatMap((lesson, i) => [
                  { lessonTitle: lesson, attendance: item.attendance[i] },
                ]);
                const averageScoreData = item.lessonTitle.flatMap((lesson, i) => [
                  { lessonTitle: lesson, averageScore: item.averageScore[i] },
                ]);
                return {
                  label: item.courseName,
                  key: item.courseName,
                  children: (
                    <Row gutter={24}>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <DualLine
                          forceFit={true}
                          xField="lessonTitle"
                          yField={['attendance', 'averageScore']}
                          meta={{
                            lessonTitle: { alias: '章节名称' },
                            attendance: { alias: '考勤率(%)' },
                            averageScore: { alias: '作业均分' },
                          }}
                          data={[attendanceData, averageScoreData]}
                          lineConfigs={[
                            {
                              color: '#29cae4',
                              smooth: false,
                              lineSize: 3,
                              point: { visible: true },
                              label: { visible: true },
                              lineStyle: { opacity: 0.5 },
                            },
                            {
                              color: '#586bce',
                              smooth: false,
                              point: { visible: true },
                              label: { visible: true },
                              lineSize: 4,
                              lineStyle: { opacity: 0.5 },
                            },
                          ]}
                        />
                      </Col>
                    </Row>
                  ),
                };
              })}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ChartForTeacher;
