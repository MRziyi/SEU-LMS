import { Card, message } from 'antd';
import { useRequest } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import styles from './style.less';
import ProCard from '@ant-design/pro-card';
import { ProFormGroup, ProFormSwitch } from '@ant-design/pro-form';

const MyMessages: FC<Record<string, any>> = () => {
  return <PageContainer content="This is a demo for MyMessage"></PageContainer>;
};

export default MyMessages;
