import { Avatar, Divider, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { ReplyData } from '@/pages/profile/data';
import { queryReplyList } from '../../../service';
import InfiniteScroll from 'react-infinite-scroll-component';

interface DiscussionIDParam {
  discussionID: string;
}

const EndlessScroll: React.FC<DiscussionIDParam> = ({ discussionID }) => {
  const scrollSize = 10;

  // const [loadingForReply, setLoadingForReply] = useState(false);
  const [currentReplyCnt, setCurrentReplyCnt] = useState<number>(0);
  const [totalReplyNum, setTotalReplyNum] = useState<number>(0);
  const [replyList, setReplyList] = useState<ReplyData[]>([]);

  useEffect(() => {
    loadMoreReply();
  }, []);

  async function loadMoreReply() {
    // setLoadingForReply(true);
    try {
      console.log(discussionID);
      const result = await queryReplyList(discussionID, currentReplyCnt, scrollSize);
      if (result.data) {
        setCurrentReplyCnt(currentReplyCnt + scrollSize);
        setReplyList([...replyList, ...result.data.list]);
        setTotalReplyNum(result.data.totalNum);
      }
      // setLoadingForReply(false);
    } catch {}
  }

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        key={discussionID}
        dataLength={replyList.length}
        next={() => loadMoreReply()}
        hasMore={replyList.length < totalReplyNum}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>🥰没有更多的回复啦</Divider>}
        scrollableTarget="scrollableDiv"
        onScroll={() => console.log('OnScroll:' + discussionID)}
      >
        <List
          key={discussionID}
          // loading={loadingForReply}
          dataSource={replyList}
          renderItem={(messageItem) => (
            <List.Item key={messageItem.ID}>
              <List.Item.Meta
                avatar={<Avatar src={messageItem.fromUserAvatar} />}
                title={messageItem.fromUserName}
                description={messageItem.content}
              />
              <div>{messageItem.time}</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default EndlessScroll;
