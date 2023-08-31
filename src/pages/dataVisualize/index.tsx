import { useState, type FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { DualLine, GroupedColumn, Line} from '@ant-design/charts';
import { TeachingSituation, CourseSituation, SectionSituation } from './data';
import { useRequest,useModel } from 'umi';
import { queryCourseSituation, querySectionSituation, queryTeachingSituation } from './service';
import { Card, Col, Row, Tabs } from 'antd';
import './index.less';

const DataVisualize: FC<Record<string, any>> = () => {
    const[teachingData,setTeachingData]=useState<TeachingSituation[]>([]);
    const[courseData,setCourseData]=useState<CourseSituation[]>([]);
    const[sectionData,setSectionData]=useState<SectionSituation[]>([]);

    const { initialState } = useModel('@@initialState');

    const { loadingTeaching } = useRequest(
      () => {
        if (initialState && initialState.currentUser && initialState.currentUser.id)
          return queryTeachingSituation();
        else throw 'Please Login!';
      },
      {
        onSuccess: (result: any) => {
          setTeachingData(result);
        },
      },
    );

    const { loadingCourse } = useRequest(
      () => {
        if (initialState && initialState.currentUser && initialState.currentUser.id)
          return queryCourseSituation();
        else throw 'Please Login!';
      },
      {
        onSuccess: (result: any) => {
          setCourseData(result);
        },
      },
    );

    const { loadingSection } = useRequest(
      () => {
        if (initialState && initialState.currentUser && initialState.currentUser.id)
          return querySectionSituation(initialState.currentUser.id);
        else throw 'Please Login!';
      },
      {
        onSuccess: (result: any) => {
          setSectionData(result);
        },
      },
    );

    const config = {
      forceFit: true,
      data:courseData,
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
  <PageContainer>
    <Row gutter={24} className="card-row">
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
      <Card 
        loading={loadingCourse}
        title='课程均分统计'
      >
        <Line {...config} />
      </Card>
      </Col>
    </Row>

    <Row gutter={24} className="card-row">
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
      <Card 
        loading={loadingTeaching}
        title='教学情况统计'
      >
        <Tabs
          defaultActiveKey="1"
          tabPosition='left'
          style={{ height:400 }}
          items={teachingData.map((item,index)=>{
            const combinedData = item.teacherName.flatMap((teacher, i) => [
              { teacherName: teacher, indicator: '考勤率', value: item.attendance[i] },
              { teacherName: teacher, indicator: '作业均分', value: item.averageScore[i] },
            ]);
            return{
              label:item.courseName,
              key:item.courseName,
              children:(
                <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <GroupedColumn
                    forceFit={true}
                    padding="auto"
                    xField="teacherName" 
                    yField="value"
                    colorField="indicator"
                    groupField= "indicator"
                    meta={{
                      teacherName: { alias: '教师姓名' },
                      value:{alias:'考勤率(%) / 作业均分'}
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
                    color={ ['#75AD5A', '#FFB824']}
                  />
                </Col>
              </Row>
              )
            }
          })}
        />
      </Card>
      </Col>
      </Row>

      <Row gutter={24} className="card-row">
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
      <Card 
        loading={loadingSection}
        title='教学情况统计'
      >
        <Tabs
          defaultActiveKey="1"
          tabPosition='left'
          style={{ height:400 }}
          items={sectionData.map((item,index)=>{
            const attendanceData = item.lessonTitle.flatMap((lesson, i) => [
              { lessonTitle:lesson,  attendance: item.attendance[i] },
            ]);
            const averageScoreData=item.lessonTitle.flatMap((lesson,i)=>[
              { lessonTitle:lesson,  averageScore: item.averageScore[i] },
            ]);
            return{
              label:item.courseName,
              key:item.courseName,
              children:(
                <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <DualLine
                    forceFit={true}
                    xField="lessonTitle" 
                    yField={['attendance','averageScore']}
                    meta={{
                      lessonTitle: { alias: '章节名称' },
                      attendance:{alias:'考勤率(%)'},
                      averageScore:{alias:'作业均分'},
                    }}
                    data={[attendanceData,averageScoreData]}
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
              )
            }
          })}
        />
      </Card>
      </Col>
      </Row>
  </PageContainer>
  );
};

export default DataVisualize;