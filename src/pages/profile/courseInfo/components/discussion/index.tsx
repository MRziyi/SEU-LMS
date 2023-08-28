import { Avatar, Card, List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { DiscussionData } from '@/pages/profile/data';
import { queryDiscussionList } from '../../service';
import EndlessScroll from './scroll';
import ProCard from '@ant-design/pro-card';

const { Paragraph } = Typography;

interface CourseIDParam {
  courseID: string;
}

const Discussion: React.FC<CourseIDParam> = ({ courseID }) => {
  const [pageSize, setPageSize] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [discussionList, setDiscussionList] = useState<DiscussionData[]>([]);
  const [totalDiscussionNum, setTotalDiscussionNum] = useState<number>(0);
  const [loadingForPagigation, setLoadingForPagigation] = useState<boolean>(false);

  // 获取讨论区列表数据

  useEffect(() => {
    changeDiscussionPage(currentPage, pageSize);
  }, []);

  async function changeDiscussionPage(_page: number, _pageSize: number) {
    setLoadingForPagigation(true);
    try {
      const result = await queryDiscussionList(courseID, _page, _pageSize);
      if (result.data) {
        setTotalDiscussionNum(result.data.totalNum);
        setDiscussionList(result.data.list);
        setCurrentPage(_page);
        setPageSize(_pageSize);
        setLoadingForPagigation(false);
      }
    } catch {}
  }

  function showPageFooter(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 条`;
  }
  const paginationProps = {
    onChange: () => changeDiscussionPage(currentPage, pageSize),
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [6, 12, 18, 24],
    currentPage: currentPage,
    pageSize: pageSize,
    total: totalDiscussionNum,
    showTotal: showPageFooter,
  };

  return (
    <>
      <List<DiscussionData>
        className={styles.coverCardList}
        rowKey="discussionID"
        loading={loadingForPagigation}
        grid={{ gutter: 24, xxl: 2, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
        pagination={paginationProps}
        dataSource={discussionList}
        renderItem={(discussion) => (
          <List.Item>
            <Card className={styles.card} hoverable onClick={() => {}}>
              <Card.Meta title={discussion.title} />
              <Paragraph style={{ marginTop: '10px', fontSize: '10pt' }} className={styles.item}>
                {discussion.content}
              </Paragraph>
              <ProCard
                bordered
                size="small"
                title="回复"
                headerBordered
                collapsible
                defaultCollapsed
                onCollapse={(collapse) => console.log(collapse)}
              >
                <EndlessScroll
                  key={discussion.discussionID}
                  discussionID={discussion.discussionID}
                ></EndlessScroll>
              </ProCard>
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
          </List.Item>
        )}
      />
    </>
  );
};

export default Discussion;
