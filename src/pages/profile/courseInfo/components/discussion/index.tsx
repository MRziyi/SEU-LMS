import { Avatar, Card, List, Typography } from 'antd';
import { useRequest, Link } from 'umi';
import React, { useState } from 'react';
import styles from './index.less';
import { DiscussionData } from '@/pages/profile/data';
import { queryDiscussionList } from '../../service';

const { Paragraph } = Typography;

interface CourseIDParam {
  courseID: string;
}

const Discussion: React.FC<CourseIDParam> = ({ courseID }) => {
  const [pageSize, setPageSize] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<DiscussionData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [loadingForPagigation, setLoading] = useState<boolean>(false);
  // 获取列表数据
  const { loading } = useRequest(
    () => {
      return queryDiscussionList(courseID, 1, 6);
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
      const result = await queryDiscussionList(courseID, _page, _pageSize);
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
    <List<DiscussionData>
      className={styles.coverCardList}
      rowKey="discussionID"
      loading={loading && loadingForPagigation}
      grid={{ gutter: 24, xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
      pagination={paginationProps}
      dataSource={listData}
      renderItem={(discussion) => (
        <List.Item>
          <Link to={`/profile/dicussion-info/${discussion.discussionID}`}>
            <Card className={styles.card} hoverable>
              <Card.Meta
                title={discussion.title}
                description={<Paragraph className={styles.item}>{discussion.content}</Paragraph>}
              />
              <div className={styles.cardItemContent}>
                <span>{discussion.time}</span>
                <div className={styles.avatarList}>
                  <span style={{ marginRight: 10 }}>{discussion.fromUserName}</span>
                  <Avatar
                    size="small"
                    className={styles.avatar}
                    src={discussion.fromUserAvatar}
                    alt="avatar"
                  />
                </div>
              </div>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );
};

export default Discussion;
