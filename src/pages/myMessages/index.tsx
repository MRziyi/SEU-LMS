import { Avatar, Button, Card, Input, List, Skeleton, message } from 'antd';
import { useModel, useRequest } from 'umi';
import { useState, type FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm, queryMessageList, queryUserAvatar} from './service';
import styles from './style.less';
import ProCard from '@ant-design/pro-card';
import { ProFormGroup, ProFormSwitch } from '@ant-design/pro-form';
import { MessageListData } from './data';
import moment from 'moment';

const MyMessages: FC<Record<string, any>> = () => {
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<MessageListData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [loadingForPagigation, setLoading] = useState<boolean>(false);

  //  获取用户信息
  const { initialState } = useModel('@@initialState');

  // 获取列表数据
  const { loading } = useRequest(
    () => {
      if (initialState && initialState.currentUser && initialState.currentUser.id)
        return queryMessageList(initialState.currentUser.id, 1, 8);
      else throw 'Please Login!';
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
    if (initialState && initialState.currentUser)
      try {
        const result = await queryMessageList(initialState.currentUser.id, _page, _pageSize);
        if (result.data) {
          setTotalNum(result.data.totalNum);
          setListData(result.data.list);
          setCurrentPage(_page);
          setPageSize(_pageSize);
          setLoading(false);
        } else throw 'Please Login!';
      } catch {}
  }

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 条`;
  }
  const paginationProps = {
    onChange: changePage,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [8, 12, 16, 20],
    currentPage: currentPage,
    pageSize: pageSize,
    total: totalNum,
    showTotal: showTotal,
  };

  return (
    <PageContainer 
      header={{
        title: '我的消息',
        ghost: true,
        extra: [
          <Input.Search
            placeholder="请输入消息发送人"
            enterButton="搜索"
            key="2"
            size="large"
            // onSearch={handleFormSubmit}}
          />,
        ],
      }}
    >
    
      <List
        loading={loading && loadingForPagigation}
        itemLayout="horizontal"
        dataSource={listData}
        pagination={paginationProps}
        renderItem={(item, index) => (
          <List.Item>
            
            <Card
              style={{width: '100%'}}
            >
              <Skeleton loading={loading} avatar active>
                <Card.Meta
                  avatar={<Avatar src={item.fromUserAvatar}/>}
                  title={<span>
                    <span className={styles.username}>{item.fromUserNickName}</span>
                    &nbsp;:&nbsp;
                    <span className={styles.event}>{item.content}</span>
                  </span>}
                  description={
                    <span>
                      {moment(item.time).fromNow()}
                    </span>
                  }
                />
              </Skeleton>
            </Card>
      </List.Item>
    )}
  />
    </PageContainer>
  );
};

export default MyMessages;
