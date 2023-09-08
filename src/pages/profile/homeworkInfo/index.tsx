import React, { useEffect, useState } from 'react';
import { queryHomeworkList } from './service';
import { RouteChildrenProps, useParams } from 'react-router';
import { Button, Card, Col, Row, Space, Tag } from 'antd';
import {
  FileExcelOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileTextOutlined,
  FileWordOutlined,
  FileZipOutlined,
} from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { HomeworkInfo } from './data';
import './style.less';
import FeedbackHomeworkModal from './components/feedbackHomeworkModal';

const HomeWorkInfo: React.FC<RouteChildrenProps> = () => {
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<any[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [loadingForPagigation, setLoadingForPagigation] = useState<boolean>(false);
  const [homeworkInfoData, setHomeworkInfoData] = useState<HomeworkInfo>();

  interface RouteParams {
    syllabusID: string;
  }

  //const { initialState } = useModel('@@initialState');
  //可能是不对的哦莫
  //嘿嘿修好啦！需要传类型
  const { syllabusID } = useParams<RouteParams>();

  function fileIcon(type: string) {
    if (type === 'xlsx')
      return <FileExcelOutlined style={{ fontSize: '20pt', marginRight: '10px' }} />;
    else if (type === 'ppt')
      return <FilePptOutlined style={{ fontSize: '20pt', marginRight: '10px' }} />;
    else if (type === 'pdf')
      return <FilePdfOutlined style={{ fontSize: '20pt', marginRight: '10px' }} />;
    else if (type === 'doc')
      return <FileWordOutlined style={{ fontSize: '20pt', marginRight: '10px' }} />;
    else if (type === 'zip' || type === 'rar')
      return <FileZipOutlined style={{ fontSize: '20pt', marginRight: '10px' }} />;
    else if (type === 'png' || type === 'jpg')
      return <FileImageOutlined style={{ fontSize: '20pt', marginRight: '10px' }} />;
    else return <FileTextOutlined style={{ fontSize: '20pt', marginRight: '10px' }} />;
  }

  // 获取列表数据
  useEffect(() => {
    changePage(1, pageSize);
  }, []);

  async function changePage(_page: number, _pageSize: number) {
    setLoadingForPagigation(true);
    try {
      console.log(syllabusID);
      const result = await queryHomeworkList(syllabusID, _page, _pageSize);
      if (result.data) {
        setTotalNum(result.data.totalNum);
        setHomeworkInfoData(result.data.info);
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
              <FeedbackHomeworkModal homeworkID={item.homeworkID} />
            ) : (
              <Button type="text" disabled>
                已评分
              </Button>
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
              {fileIcon(item.fileType)}
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: '8px', fontSize: '16px' }}
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

  return (
    <>
      <Row gutter={24} className="card-row">
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card>
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '18px',
              }}
            >
              <strong>作业名：</strong>
              {homeworkInfoData?.homeworkName}
            </div>
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '18px',
              }}
            >
              <strong>描述：</strong>
              {homeworkInfoData?.homeworkDescription}
            </div>
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card>
            <div style={{ fontSize: '18px' }}>
              <strong>
                待批改人数：
                <span style={{ color: 'orange' }}>{homeworkInfoData?.toBeCorrectedNum}</span>
              </strong>
            </div>
            <div style={{ fontSize: '18px' }}>
              <strong>
                未提交人数：
                <span style={{ color: 'red' }}>{homeworkInfoData?.uncommittedNum}</span>
              </strong>
            </div>
          </Card>
        </Col>
      </Row>

      <ProList<any>
        grid={{ gutter: 16, xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        headerTitle="作业批改"
        loading={loadingForPagigation}
        key={'homeworkID'}
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
