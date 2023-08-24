import { Card, message } from 'antd';
import { useRequest } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import styles from './style.less';

const Calendar: FC<Record<string, any>> = () => {
  return <PageContainer content="This page is a demo for Calendar"></PageContainer>;
};

export default Calendar;
