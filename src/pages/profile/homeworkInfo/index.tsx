import React, { useEffect, useState } from 'react';
import { createWebSocketConnection, queryHomeworkCorrection, queryHomeworkList } from './service';
import { RouteChildrenProps, useParams } from 'react-router';
import { Button, Card, Col, Row, Space, Tag } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { HomeworkCorrection } from './data';
import './style.less';

const HomeWorkInfo: React.FC<RouteChildrenProps> = () => {
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<any[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [loadingForPagigation, setLoadingForPagigation] = useState<boolean>(false);
  const [homeworkNameData, setHomeworkNameData] = useState<string>();
  const [homeworkDescriptionData, setHomeworkDescriptionData] = useState<string>();
  const [hwCorrectionData, setHwCorrectionData] = useState<HomeworkCorrection>();

  //const { initialState } = useModel('@@initialState');
  //可能是不对的哦莫
  const syllabusID = useParams<string>();

  // 获取列表数据
  useEffect(() => {
    changePage(1, pageSize);
  }, []);

  async function changePage(_page: number, _pageSize: number) {
    setLoadingForPagigation(true);
    try {
      const result = await queryHomeworkList(syllabusID, _page, _pageSize);
      if (result.data) {
        setTotalNum(result.data.totalNum);
        setHomeworkNameData(result.data.homeworkName);
        setHomeworkDescriptionData(result.data.homeworkDescription);
        const list = result.data.list.map((item) => ({
          title: item.studentNickName,
          subTitle: (
            <Space size={0}>
              {item.status ? (
                <Tag color="green" key="1">
                  已批改
                </Tag>
              ) : (
                <Tag color="orange" key="2">
                  待批改
                </Tag>
              )}
            </Space>
          ),
          actions:
            item.status === 0 ? (
              <Button
              //onClick={handleScore}
              >
                评分
              </Button>
            ) : (
              <Button disabled>已评分</Button>
            ),
          avatar: item.studentAvatar,
          content: (
            <div
              style={{
                marginTop: '-10px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <FileOutlined style={{ fontSize: '16px' }} />
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: '8px' }}
              >
                <span>{item.fileName}</span>
              </a>
            </div>
          ),
        }));
        setListData(list);
        setCurrentPage(_page);
        setPageSize(_pageSize);
      }
    } catch {}
    setLoadingForPagigation(false);
  }

  const cardActionProps = 'actions';
  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 条`;
  }
  const paginationProps = {
    onChange: changePage,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [8, 12, 16, 24],
    current: currentPage,
    pageSize: pageSize,
    total: totalNum,
    showTotal: showTotal,
  };

  //实时更新数据
  useEffect(() => {
    // 在组件加载时获取初始批改数据
    async function fetchCheckInData() {
      try {
        const result = await queryHomeworkCorrection(syllabusID);
        setHwCorrectionData(result.data.correctionData);
      } catch (error) {
        console.error('Error fetching check-in data:', error);
      }
    }

    fetchCheckInData();

    // 建立WebSocket连接并处理消息
    const socket = createWebSocketConnection();

    socket.onopen = () => {
      console.log('WebSocket connected');
      // 向后端发送订阅请求，传递章节ID等信息
      const subscribeMessage = {
        type: 'subscribe',
        chapterID: syllabusID,
      };
      socket.send(JSON.stringify(subscribeMessage));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'checkin_update') {
        // 更新作业批改信息
        setHwCorrectionData(data.correctionData);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // 组件卸载时关闭WebSocket连接
    return () => {
      socket.close();
    };
  }, [syllabusID]);

  return (
    <>
      <Row gutter={24} className="card-row">
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card>
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <strong>作业名：</strong>
              {homeworkNameData}
            </div>
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <strong>描述：</strong>
              {homeworkDescriptionData}
            </div>
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card>
            <div>
              <strong>
                待批改人数：
                <span style={{ color: 'orange' }}>{hwCorrectionData?.toBeCorrectedNum}</span>
              </strong>
            </div>
            <div>
              <strong>
                未提交人数：
                <span style={{ color: 'red' }}>{hwCorrectionData?.uncommittedNum}</span>
              </strong>
            </div>
          </Card>
        </Col>
      </Row>

      <ProList<any>
        grid={{ gutter: 16, xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        headerTitle="作业批改"
        loading={loadingForPagigation}
        dataSource={listData}
        pagination={paginationProps}
        showActions="hover"
        showExtra="always"
        metas={{
          title: {},
          subTitle: {},
          type: {},
          avatar: {},
          content: {},
          actions: {
            cardActionProps,
          },
        }}
      />
    </>
  );
};

export default HomeWorkInfo;
