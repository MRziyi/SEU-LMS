import {  Collapse, Input, List, theme  } from 'antd';
import { useModel, useRequest } from 'umi';
import { useState, type FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {  queryWiki } from './service';
import { WikiListData } from './data';
import { CaretRightOutlined } from '@ant-design/icons';
import React from 'react';






const Wiki: FC<Record<string, any>> = () => {
  const [pageSize, setPageSize] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<WikiListData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [loadingForPagigation, setLoading] = useState<boolean>(false);



  
  //  获取用户信息
  const { initialState } = useModel('@@initialState');

  // 获取列表数据
  const { loading } = useRequest(
    () => {
      if (initialState && initialState.currentUser && initialState.currentUser.id)
        return queryWiki(1, 6);
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
        const result = await queryWiki( _page, _pageSize);
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
    pageSizeOptions: [4, 6, 8, 12],
    currentPage: currentPage,
    pageSize: pageSize,
    total: totalNum,
    showTotal: showTotal,
  };

  // const { token } = theme.useToken();
  // const panelStyle: React.CSSProperties = {
  //   marginBottom: 24,
  //   background: token.colorFillAlter,
  //   borderRadius: token.borderRadiusLG,
  //   border: 'none',
  // };

  return (
    <PageContainer 
      header={{
        title: '使用帮助',
        ghost: true,
        extra: [
          <Input.Search
            placeholder="请输入问题"
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
            <Collapse
              bordered={false}
              defaultActiveKey={['0']}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              style={{width:'100%'}}
              //style={{ background: token.colorBgContainer }}
            >
              <Collapse.Panel 
              key="1" 
              header={item.question} 
             // style={panelStyle}
              >
                <p>{item.answer}</p>
              </Collapse.Panel>
            </Collapse>
          </List.Item>
        )}
      />
    </PageContainer>
  );
};

export default Wiki;
