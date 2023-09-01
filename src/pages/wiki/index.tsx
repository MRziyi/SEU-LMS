import { Button, Space, Tag } from 'antd';
import { useState, type FC, ReactText, useEffect } from 'react';
import { queryWiki } from './service';
import { WikiData } from './data';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';

const Wiki: FC<Record<string, any>> = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<WikiData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [loadingForPagigation, setLoading] = useState<boolean>(false);

  useEffect(() => {
    changePage(1, pageSize);
  }, []);

  async function changePage(_page: number, _pageSize: number) {
    setLoading(true);
    try {
      const result = await queryWiki(_page, _pageSize);
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

  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);

  const paginationProps = {
    onChange: changePage,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [10, 15, 20],
    current: currentPage,
    pageSize: pageSize,
    total: totalNum,
    showTotal: showTotal,
  };

  return (
    <ProList<WikiData>
      loading={loadingForPagigation}
      dataSource={listData}
      rowKey="wikiID"
      headerTitle="使用帮助"
      pagination={paginationProps}
      showActions="hover"
      toolBarRender={() => {
        return [
          <Button key="3" type="primary">
            创建提问
          </Button>,
        ];
      }}
      metas={{
        avatar: {
          render: () => {
            return <QuestionCircleOutlined />;
          },
        },
        title: {
          dataIndex: 'question',
          search: false,
        },
        description: {
          dataIndex: 'answer',
          search: false,
        },
        content: {
          render: () => (
            <div
              style={{
                minWidth: 200,
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            ></div>
          ),
        },
        subTitle: {
          dataIndex: 'fromUserAccess',
          render: (_, row) => {
            return (
              <Space size={0}>
                {row.answer !== '待管理员解答' ? (
                  <Tag color="green" key="1">
                    已解答
                  </Tag>
                ) : (
                  <Tag color="red" key="2">
                    待解答
                  </Tag>
                )}
              </Space>
            );
          },
          search: false,
        },
      }}
      expandable={{
        expandedRowKeys,
        defaultExpandAllRows: false,
        onExpandedRowsChange: setExpandedRowKeys,
      }}
    />
  );
};

export default Wiki;