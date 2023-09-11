import { Avatar, Badge, Button, Col, Divider, Modal, Row, Space, Tag, message ,Input } from 'antd';
import { useState, type FC, useEffect } from 'react';
import { markMessage, queryMessageList } from './service';
import { MessageData } from './data';
import moment from 'moment';
import { ProList } from '@ant-design/pro-components';
import { sendPM } from '../profile/courseInfo/service';

const MyMessages: FC<Record<string, any>> = () => {
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<MessageData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [loadingForPagigation, setLoadingForPagigation] = useState<boolean>(false);
  const [loadingForMark, setLoadingForMark] = useState<string>('');
  const [visiable,setVisiable] = useState<boolean>(false);

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
        console.log(result.data);
      }
    } catch {}
    setLoadingForPagigation(false);
  }

  async function markMessageAdaptor(messageID: string, setTo: boolean) {
    setLoadingForMark(messageID);
    try {
      const result = await markMessage(messageID, setTo);
      if (result.code == 0) {
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
  //------------------------------下边是回复的弹窗----------------------------------

  const { TextArea } = Input;
  const [value, setValue] = useState('');
  const [targetUserName, setTargetUserName] = useState<string>('')//我要给谁发
  const [targetUserID, setTargetUserID] = useState<string>('')//目标用户的id
  const [content,setContent] = useState<string>('')

  const changeValue = (e: any) => {
    setValue(e.target.value);
  };
  async function sendPrivateMessageAdaptor() {
    try {
      const result = await sendPM(targetUserID, value, '私信');
      if (result.code == 0) {
        message.success('私信发送成功');
        setValue('');
        closeModal();
      }
    } catch {}
  }

  const onOk = () => {
    if(value!=''){
      sendPrivateMessageAdaptor();
    }else{
      closeModal();
    }
  };

  const handleRowClick = (item: MessageData) => {
    // 在这里触发回调函数，处理点击列表行的逻辑
    setTargetUserName(item.fromUserName);
    setTargetUserID(item.fromUserID)
    setContent(item.content);
    setVisiable(true);
  };

  const closeModal = () => {
    setVisiable(false);
  };

  return (
    <>
      <Modal
        title="回复用户"
        open={visiable}
        onOk={onOk}
        onCancel={closeModal}
        afterClose={closeModal}
      >
        <Row gutter={50}>
          <Col span={24}>
            <p>
              <div><b>回复对象</b>: {targetUserName}</div>
           
              <b>私信详情</b>: 
              <div>{content}</div>
            </p>
            <Divider />
            <TextArea
              rows={3}
              placeholder="请输入回复内容"
              maxLength={600} // 你可以根据需要调整最大长度
              value={value}
              onChange={changeValue}
            />
          </Col>
        </Row>
      </Modal>
    <ProList<MessageData>
      loading={loadingForPagigation}
      dataSource={listData}
      rowKey="messageID"
      onRow={(record) => ({
        onClick: () => {
          console.log('Clicked on row:', record.fromUserName);
          handleRowClick(record)
          if(!record.isRead){
            markMessageAdaptor(record.messageID, true);
          }
        } // 定义行点击事件处理程序
      })}
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
                  ) : row.fromUserAccess == 'student' ? (
                    <Tag color="green" key="2">
                      学生
                    </Tag>
                  ) : (
                    <Tag color="orange" key="3">
                      管理员
                    </Tag>
                  )}

                  <Tag color="purple" key="4">
                    来源：{row.sourceName}
                  </Tag>

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
    </>
    
  );
};

export default MyMessages;
