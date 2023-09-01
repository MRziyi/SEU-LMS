import { Avatar, Badge, Button, Space, Tag, message } from 'antd';
import { useState, type FC, useEffect } from 'react';
import { markMessage, queryMessageList } from './service';
import { MessageData } from './data';
import moment from 'moment';
import { ProList } from '@ant-design/pro-components';

const MyMessages: FC<Record<string, any>> = () => {
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<MessageData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [loadingForPagigation, setLoadingForPagigation] = useState<boolean>(false);
  const [loadingForMark, setLoadingForMark] = useState<string>('');

  useEffect(() => {
    changePage(1, pageSize);
  }, []);

  async function changePage(_page: number, _pageSize: number) {
    setLoadingForPagigation(true);
    try {
      const result = await queryMessageList(_page, _pageSize);
      if (result.data) {
        setTotalNum(result.data.totalNum);
        setListData(result.data.list);
        setCurrentPage(_page);
        setPageSize(_pageSize);
      }
    } catch {}
    setLoadingForPagigation(false);
  }

  async function markMessageAdaptor(messageID: string, setTo: boolean) {
    setLoadingForMark(messageID);
    try {
      const result = await markMessage(messageID, setTo);
      if (result.data) {
        message.success('标记成功！');
        changePage(currentPage, pageSize);
      }
    } catch {}
    setLoadingForMark('');
  }

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 条`;
  }
  const paginationProps = {
    onChange: changePage,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [8, 12, 16, 20],
    current: currentPage,
    pageSize: pageSize,
    total: totalNum,
    showTotal: showTotal,
  };

  return (
    <ProList<MessageData>
      loading={loadingForPagigation}
      dataSource={listData}
      rowKey="messageID"
      headerTitle="消息列表"
      pagination={paginationProps}
      showActions="hover"
      metas={{
        title: {
          dataIndex: 'fromUserName',
          search: false,
        },
        avatar: {
          render: (_, row) => {
            if (row.isRead) return <Avatar src={row.fromUserAvatar}></Avatar>;
            else
              return (
                <Badge dot>
                  <Avatar src={row.fromUserAvatar}></Avatar>
                </Badge>
              );
          },
          search: false,
        },
        description: {
          dataIndex: 'content',
          search: false,
        },
        subTitle: {
          dataIndex: 'fromUserAccess',
          render: (_, row) => {
            return (
              <>
                <Space size={0}>
                  {row.fromUserAccess == 'teacher' ? (
                    <Tag color="blue" key="1">
                      教师
                    </Tag>
                  ) : (
                    <Tag color="orange" key="1">
                      管理员
                    </Tag>
                  )}
                  <div style={{ marginLeft: '10px' }}>{moment(row.time).fromNow()}</div>
                </Space>
              </>
            );
          },
          search: false,
        },
        actions: {
          render: (_, row) => {
            if (row.isRead)
              return (
                <Button
                  style={{ marginRight: '10px' }}
                  loading={loadingForMark === row.messageID}
                  onClick={() => {
                    markMessageAdaptor(row.messageID, false);
                  }}
                >
                  标为未读
                </Button>
              );
            else {
              return (
                <Button
                  loading={loadingForMark === row.messageID}
                  style={{ marginRight: '10px' }}
                  type="primary"
                  onClick={() => {
                    markMessageAdaptor(row.messageID, true);
                  }}
                >
                  标为已读
                </Button>
              );
            }
          },
        },
      }}
    />
  );
};

export default MyMessages;
