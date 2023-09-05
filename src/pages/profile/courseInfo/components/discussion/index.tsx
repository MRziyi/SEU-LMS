import { Avatar, Card, Input, List, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

import { queryDiscussionList, sendReply } from '../../service';
import ProCard from '@ant-design/pro-card';
import ReplyList from './reply';
import { DiscussionData } from '../../data';

const { Paragraph } = Typography;
const { Search } = Input;

interface CourseIDParam {
  courseID: string;
}

const Discussion: React.FC<CourseIDParam> = ({ courseID }) => {
  const [pageSize, setPageSize] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [discussionList, setDiscussionList] = useState<DiscussionData[]>([]);
  const [totalDiscussionNum, setTotalDiscussionNum] = useState<number>(0);
  const [loadingForPagigation, setLoadingForPagigation] = useState<boolean>(false);
  const [loadingForSendingReply, setLoadingForSendingReply] = useState<boolean>(false);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

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
      }
    } catch {}
    setLoadingForPagigation(false);
  }

  async function sendReplyAdaptor(value: string, discussionID: string) {
    setLoadingForSendingReply(true);
    try {
      let result = await sendReply(value, courseID, discussionID);
      if (result.code === 0) {
        message.success('回复成功！');
        if (refreshFlag) setRefreshFlag(false);
        else setRefreshFlag(true);
      }
    } catch {}
    setLoadingForSendingReply(false);
  }

  function showPageFooter(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 条`;
  }
  const paginationProps = {
    onChange: changeDiscussionPage,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [6, 12, 18, 24],
    current: currentPage,
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
                title="回复区"
                headerBordered
                collapsible
                defaultCollapsed
                onCollapse={(collapse) => console.log(collapse)}
                collapsed={false}
              >
                <ReplyList
                  key={discussion.discussionID}
                  discussionID={discussion.discussionID}
                  refreshFlag={refreshFlag}
                ></ReplyList>
              </ProCard>
              <Search
                style={{ marginTop: '15px' }}
                loading={loadingForSendingReply}
                placeholder="请友善发言～"
                enterButton="提交回复"
                size="large"
                onSearch={(value) => {
                  sendReplyAdaptor(value, discussion.discussionID);
                }}
              />
              <div className={styles.cardItemContent}>
                <span>{discussion.time}</span>
                <div className={styles.avatarList}>
                  <span>{discussion.fromUserName}</span>
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
