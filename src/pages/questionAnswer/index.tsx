import { Avatar, Badge, Button, Col, Divider, Modal, Row, Space, Tag, message } from 'antd';
import { useState, type FC, useEffect } from 'react';
import { markMessage, postAnswer, queryMessageList } from './service';
import { QAData } from './data';
import moment from 'moment';
import { ProList } from '@ant-design/pro-components';
import { Input } from 'antd';

const QuestionAnswer: FC<Record<string, any>> = () => {
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<QAData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [loadingForPagigation, setLoadingForPagigation] = useState<boolean>(false);
  const [loadingForMark, setLoadingForMark] = useState<string>('');

  
  const [currentQAID,setCurrentQAID] = useState<string>('');
  const [fromUserName,setFromUserName] = useState<string>('');
  const [question,setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState(''); // 使用状态管理 TextArea 的值

  const { TextArea } = Input;


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

  //标记已读用的

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

  
  const [visiable, setVisiable] = useState(false);


  const onOk = () => {
    console.log('提交的回答内容:', answer);
    markMessage(currentQAID,true)//将状态设置为已完成
    postAnswer(currentQAID,answer);//将内容提交上去
    closeModal();
  };
 
  const closeModal = () => {
    setVisiable(false);
  };


  const handleRowClick = (item:QAData) => {
    // 在这里触发回调函数，处理点击列表行的逻辑
    console.log(`Clicked on item: ${item.question}`);
    setVisiable(true);
    setCurrentQAID(item.QAID);
    setFromUserName(item.fromUserName);
    setQuestion(item.question)

  };
  return (
    <>
    <Modal
      title="提交回复"
      open={visiable}
      onOk={onOk}
      onCancel={closeModal}
      afterClose={closeModal}
      width={600}
    >
      <Row gutter={50}>

        <Col span={24} >
          <p><b>提问用户</b>:&nbsp;&nbsp;&nbsp;{fromUserName}</p>
          <p><b>问题描述</b>:&nbsp;&nbsp;&nbsp;{question}</p>
          <Divider />
          <TextArea 
        rows={4}
        placeholder="请输入回答"
        maxLength={600} // 你可以根据需要调整最大长度
        value={answer} // 使用状态管理 TextArea 的值
        onChange={(e) => setAnswer(e.target.value)} // 在输入变化时更新状态
        />
        </Col>


      </Row>

    </Modal>

    <ProList<QAData>
      loading={loadingForPagigation}
      dataSource={listData}
      rowKey="QAID"
      headerTitle="答疑列表"
      pagination={paginationProps}
      showActions="hover"
      onRow={(item) => ({
        onClick: () => handleRowClick(item),//点击事件
      })}
    
      metas={{
        title: {
          dataIndex: 'fromUserName',
          search: false,
        },
        avatar: {
          render: (_, row) => {
            if (row.isSolved) return <Avatar src={row.fromUserAvatar}></Avatar>;
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
          dataIndex: 'question',
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
                      学生
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
            if (row.isSolved)
              return (
                <Button
                  style={{ marginRight: '10px' }}
                  loading={loadingForMark === row.QAID}
              
                >
                  已回答
                </Button>
              );
            else {
              return (
                <Button
                  loading={loadingForMark === row.QAID}
                  style={{ marginRight: '10px' }}
                  type="primary"
              
                >
                  未回答
                </Button>
              );
            }
          },
        },
      }}
      
    />
    </>
    
    
  );
};

export default QuestionAnswer;
