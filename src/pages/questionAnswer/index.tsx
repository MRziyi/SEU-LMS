import { Avatar, Badge, Button, Col, Divider, Modal, Row, Space, Tag, message } from 'antd';
import { useState, type FC, useEffect } from 'react';
import { deleteWiki, postAnswer, queryMessageList } from './service';
import { wikiData } from './data';
import moment from 'moment';
import { ProList } from '@ant-design/pro-components';
import { Input } from 'antd';

const QuestionAnswer: FC<Record<string, any>> = () => {
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingForAnswer, setLoadingForAnswer] = useState<string>('');

  const [currentWikiID, setCurrentWikiID] = useState<string>('');
  const [fromUserName, setFromUserName] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState(''); // 使用状态管理 TextArea 的值

  const [refreshKey, setRefreshKey] = useState<number>(0);

  const { TextArea } = Input;

  async function queryMessageListAdaptor(current: number, pageSize: number) {
    try {
      const result = await queryMessageList(current, pageSize);
      if (result.data) {
        setCurrentPage(current);
        setPageSize(pageSize);
        return { list: result.data.list, total: result.data.totalNum, code: result.code };
      }
    } catch {}
  }

  //标记已读用的

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 条`;
  }

  const [visiable, setVisiable] = useState(false);

  async function postAnswerAdaptor() {
    setLoadingForAnswer(currentWikiID);
    try {
      const result = await postAnswer(currentWikiID, answer);
      if (result.code == 0) {
        message.success('回答成功');
        queryMessageListAdaptor(currentPage, pageSize);
        closeModal();
        setRefreshKey((prevKey) => prevKey + 1);
      }
    } catch {}
    setLoadingForAnswer('');
  }

  const onOk = () => {
    postAnswerAdaptor();
  };

  const closeModal = () => {
    setVisiable(false);
  };

  const handleRowClick = (item: wikiData) => {
    // 在这里触发回调函数，处理点击列表行的逻辑
    setVisiable(true);
    setCurrentWikiID(item.wikiID);
    setFromUserName(item.fromUserName);
    setQuestion(item.question);
    setAnswer(item.answer);
  };

  const handleDelete = (item:wikiData) => {
    deleteWiki(item.wikiID)
    setRefreshKey((prevKey) => prevKey + 1);
  }

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
          <Col span={24}>
            <p>
              <b>提问用户</b>: {fromUserName}
            </p>
            <p>
              <b>问题描述</b>: {question}
            </p>
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

      <ProList<wikiData>
        request={async (params: { pageSize?: number; current?: number; keyword?: string }) => {
          const msg = await queryMessageListAdaptor(
            params.current ? params.current : 1,
            params.pageSize ? params.pageSize : 6,
          );
          return {
            data: msg?.list,
            success: msg?.code == 0,
            total: msg?.total,
          };
        }}
        key={refreshKey} // 刷新列表的 key
        rowKey="wikiID"
        headerTitle="答疑列表"
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [8, 12, 16, 20],
          defaultPageSize: 8,
          showTotal: showTotal,
        }}
        showActions="hover"
        metas={{
          title: {
            dataIndex: 'question',
            search: false,
          },
          avatar: {
            render: (_, row) => {
              if (row.answer !== '') return <Avatar src={row.fromUserAvatar}></Avatar>;
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
            dataIndex: 'fromUserName',
            valueType: 'text',
            render: (_, row) => {
              return <div>提问者: {row.fromUserName}</div>;
            },
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
                    {row.answer ? (
                      <Tag color="green" key="1">
                        已解决
                      </Tag>
                    ) : (
                      <Tag color="red" key="1">
                        未解决
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
              if (row.answer)
                return (
                <>
                  <Button
                    loading={loadingForAnswer == row.wikiID}
                    style={{ marginRight: '10px' }}
                    onClick={() => handleRowClick(row)}
                  >
                    修改回答
                  </Button>
                  <Button
                  type='link'
                  danger
                  onClick={()=>handleDelete(row)}
                  >删除</Button>
                </>
                );
              else {
                return (
                <>
                  <Button
                    loading={loadingForAnswer == row.wikiID}
                    style={{ marginRight: '10px' }}
                    type="primary"
                    onClick={() => handleRowClick(row)}
                  >
                    进行回答
                  </Button>
                  <Button
                  type='link'
                  danger
                  onClick={()=>handleDelete(row)}
                  >删除</Button>
                </>
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
