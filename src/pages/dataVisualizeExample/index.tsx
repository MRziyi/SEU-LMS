import type { FC } from 'react';
import { Suspense } from 'react';
import { Col, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
import { getChartData } from './service';
import type { AnalysisData } from './data.d';

import BarCard from './components/BarCard';
import RadarCard from './components/RadarCard';
import PieCard from './components/PieCard';
import LineCard from './components/LineCard';
import ScatterCard from './components/ScatterCard';

type AnalysisProps = {
  dashboardAndanalysis: AnalysisData;
  loading: boolean;
};

const Analysis: FC<AnalysisProps> = () => {
  const { loading, data } = useRequest(getChartData, {
    onSuccess: () => {
      console.log(data?.globalRegionScaleData);
    },
  });

  return (
    <GridContent>
      <>
        <Suspense fallback={null}>
          <BarCard
            dataA={data?.globalScaleData || null}
            dataB={data?.localScaleData || null}
            loading={loading}
          />
        </Suspense>

        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <RadarCard loading={loading} data={data?.rankData || null} />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <PieCard loading={loading} data={data?.platformScaleData || null} />
            </Suspense>
          </Col>
        </Row>

        <div
          style={{
            marginTop: 24,
          }}
        >
          <Suspense fallback={null}>
            <LineCard loading={loading} data={data?.globalRegionScaleData || null} />
          </Suspense>
        </div>

        <div
          style={{
            marginTop: 24,
          }}
        >
          <Suspense fallback={null}>
            <ScatterCard loading={loading} data={data?.userScale || null} />
          </Suspense>
        </div>
      </>
    </GridContent>
  );
};

export default Analysis;
