import { Avatar, Button, Card, Input, List, Skeleton, Space, Tag } from 'antd';
import { useModel, useRequest } from 'umi';
import { useState, type FC, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { queryMessageList } from './service';
import styles from './style.less';
import { MessageData } from './data';
import moment from 'moment';
import { ProList } from '@ant-design/pro-components';

const MyMessages: FC<Record<string, any>> = () => {
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<MessageData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [loadingForPagigation, setLoading] = useState<boolean>(false);

  useEffect(() => {
    changePage(1, pageSize);
  }, []);

  async function changePage(_page: number, _pageSize: number) {
    setLoading(true);
    try {
      const result = await queryMessageList(_page, _pageSize);
      if (result.data) {
        setTotalNum(result.data.totalNum);
        setListData(result.data.list);
        setCurrentPage(_page);
        setPageSize(_pageSize);
      }
    } catch {}
    setLoading(false);
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
          dataIndex: 'fromUserAvatar',
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
              </Space>
            );
          },
          search: false,
        },
        extra: {
          dataIndex: 'time',
          search: false,
        },
      }}
    />
  );
};

export default MyMessages;
