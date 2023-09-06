import { Avatar, List } from 'antd';
import React, { useEffect, useState } from 'react';
import { queryReplyList } from '../../../service';
import { ReplyData } from '../../../data';

interface DiscussionIDParam {
  discussionID: string;
  refreshFlag: boolean;
}

const ReplyList: React.FC<DiscussionIDParam> = ({ discussionID, refreshFlag }) => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [replyList, setReplyList] = useState<ReplyData[]>([]);
  const [totalReplyNum, setTotalReplyNum] = useState<number>(0);
  const [loadingForPagigation, setLoadingForPagigation] = useState<boolean>(false);

  useEffect(() => {
    console.log('REFREASHING');
    changeReplyPage(currentPage, pageSize);
  }, [refreshFlag]);

  async function changeReplyPage(_page: number, _pageSize: number) {
    setLoadingForPagigation(true);
    try {
      const result = await queryReplyList(discussionID, _page, _pageSize);
      if (result.data) {
        setTotalReplyNum(result.data.totalNum);
        setReplyList(result.data.list);
        setCurrentPage(_page);
        setLoadingForPagigation(false);
      }
    } catch {}
  }

  function showPageFooter(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 条`;
  }
  const paginationProps = {
    onChange: changeReplyPage,
    current: currentPage,
    pageSize: pageSize,
    total: totalReplyNum,
    showTotal: showPageFooter,
    showSizeChanger: false,
  };

  return (
    <List
      key={discussionID}
      loading={loadingForPagigation}
      dataSource={replyList}
      pagination={paginationProps}
      renderItem={(messageItem) => (
        <List.Item key={messageItem.replyID}>
          <List.Item.Meta
            avatar={<Avatar src={messageItem.fromUserAvatar} />}
            title={messageItem.fromUserName}
            description={messageItem.content}
          />
          <div>{messageItem.time}</div>
        </List.Item>
      )}
    />
  );
};

export default ReplyList;
