import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import { Divider, Button, List, Typography } from 'antd';
import { useRequest } from 'umi';
import { querySyllabus } from '../../service';
import styles from './index.less';
import { SyllabusData } from '@/pages/profile/data';

interface CourseIDParam {
  courseID: string;
}

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const Syllabus: React.FC<CourseIDParam> = ({ courseID }) => {
  const [pageSize, setPageSize] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<SyllabusData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [loadingForPagigation, setLoading] = useState<boolean>(false);
  // 获取列表数据
  const { loading } = useRequest(
    () => {
      return querySyllabus(courseID, 1, 6);
    },
    {
      onSuccess: (result: any) => {
        setTotalNum(result.totalNum);
        setListData(result.list);
      },
    },
  );

  async function changePage(_page: number, _pageSize: number) {
    setLoading(true);
    try {
      const result = await querySyllabus(courseID, _page, _pageSize);
      if (result.data) {
        setTotalNum(result.data.totalNum);
        setListData(result.data.list);
        setCurrentPage(_page);
        setPageSize(_pageSize);
        setLoading(false);
      }
    } catch {}
  }

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 条`;
  }
  const paginationProps = {
    onChange: changePage,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [6, 12, 18, 24],
    currentPage: currentPage,
    pageSize: pageSize,
    total: totalNum,
    showTotal: showTotal,
  };






  return (
    

    <List<SyllabusData>
      className={styles.coverCardList}
      rowKey="syllabusID"
      loading={loading && loadingForPagigation}
      grid={{ gutter: 1, xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      pagination={paginationProps}
      dataSource={listData}
      renderItem={(syllabus) => (
        <List.Item>
          <ProCard
            title={syllabus.title}
            bordered
            headerBordered
            gutter={16}
            collapsible
            extra={
              <Button
                disabled={syllabus.isCheckedIn}
                type="primary"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                签到
              </Button>
            }
          >
            <ProCard title="课程视频" type="inner" bordered>
              课程视频按钮
            </ProCard>
            <ProCard title="课件资料" type="inner">
              {/* <a href={syllabus.homework[Number(syllabus.syllabusID)]}>TODO课件资料文件显示与下载</a> */}
              <List
              size="small"
              dataSource={syllabus.materials}
              renderItem={(item) => <List.Item><a href={item}>{item}</a></List.Item>}
              />             
            </ProCard>
            <ProCard title="作业" type="inner">
            <List
              size="small"
              dataSource={syllabus.homework}
              renderItem={(item) => <List.Item><a href={item}>{item}</a></List.Item>}
              />          
            </ProCard>
          </ProCard>
        </List.Item>
      )}
    />
  );
};
export default Syllabus;
