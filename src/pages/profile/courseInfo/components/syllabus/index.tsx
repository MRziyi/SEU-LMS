import React, { ReactText, useEffect, useState } from 'react';
import { Divider, Button, List, Typography, message, Space, Tag } from 'antd';
import { querySyllabus, sendCheckIn } from '../../service';
import { ProList } from '@ant-design/pro-components';
import { ClockCircleOutlined } from '@ant-design/icons';
import FileModal from './components/fileModal';
import HomeworkModal from './components/homeworkModal';
import { Link, useModel } from 'umi';

interface CourseIDParam {
  courseID: string;
}

const Syllabus: React.FC<CourseIDParam> = ({ courseID }) => {
  const [pageSize, setPageSize] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<any[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [loadingForPagigation, setLoadingForPagigation] = useState<boolean>(false);
  const [openFileModal, setOpenFileModal] = useState<boolean>(false);
  const [openHomeworkModal, setOpenHomeworkModal] = useState<boolean>(false);
  const [loadingForCheckIn, setLoadingForCheckIn] = useState<string>('');
  const [currentSyllabusID, setCurrentSyllabusID] = useState<string>('');

  const { initialState } = useModel('@@initialState');
  // 获取列表数据
  useEffect(() => {
    changePage(1, pageSize);
  }, []);

  async function changePage(_page: number, _pageSize: number) {
    setLoadingForPagigation(true);
    try {
      const result = await querySyllabus(courseID, _page, _pageSize);
      if (result.data) {
        setTotalNum(result.data.totalNum);
        const list = result.data.list.map((item) => ({
          title: item.title,
          subTitle:
            initialState?.currentUser?.access == 'student' ? (
              <Space size={0}>
                {item.isCheckedIn == 0 ? (
                  <Tag color="blue" key="1">
                    签到未发起
                  </Tag>
                ) : item.isCheckedIn == 1 ? (
                  <Tag color="green" key="2">
                    已完成签到
                  </Tag>
                ) : item.isCheckedIn == 2 ? (
                  <Tag color="purple" key="3">
                    正在签到
                  </Tag>
                ) : (
                  <Tag color="red" key="3">
                    未按时签到
                  </Tag>
                )}
                <Button
                  style={{ marginLeft: '5px' }}
                  disabled={!(item.isCheckedIn === 2)}
                  type="primary"
                  size="small"
                  loading={loadingForCheckIn === item.syllabusID}
                  onClick={() => {
                    checkIn(item.syllabusID);
                  }}
                >
                  签到
                </Button>
              </Space>
            ) : (
              <Space size={0}>
                {item.isCheckedIn == 0 ? (
                  <Tag color="blue" key="1">
                    签到未发起
                  </Tag>
                ) : item.isCheckedIn == 1 ? (
                  <Tag color="green" key="2">
                    正在签到
                  </Tag>
                ) : item.isCheckedIn == 2 ? (
                  <Tag color="purple" key="3">
                    签到已停止
                  </Tag>
                ) : (
                  ''
                )}
                {initialState?.currentUser?.access == 'student' ? (
                  <Button
                    style={{ marginLeft: '5px' }}
                    disabled={!(item.isCheckedIn === 2)}
                    type="primary"
                    size="small"
                    loading={loadingForCheckIn === item.syllabusID}
                    onClick={() => {
                      checkIn(item.syllabusID);
                    }}
                  >
                    签到
                  </Button>
                ) : item.isCheckedIn == 0 ? (
                  <Button
                    style={{ marginLeft: '5px' }}
                    type="primary"
                    size="small"
                    loading={loadingForCheckIn === item.syllabusID}
                    onClick={() => {
                      checkIn(item.syllabusID);
                    }}
                  >
                    发起签到
                  </Button>
                ) : item.isCheckedIn == 1 ? (
                  <Button
                    style={{ marginLeft: '5px' }}
                    type="primary"
                    size="small"
                    loading={loadingForCheckIn === item.syllabusID}
                    onClick={() => {
                      checkIn(item.syllabusID);
                    }}
                  >
                    签到管理
                  </Button>
                ) : (
                  <Button
                    style={{ marginLeft: '5px' }}
                    type="primary"
                    size="small"
                    loading={loadingForCheckIn === item.syllabusID}
                    onClick={() => {
                      checkIn(item.syllabusID);
                    }}
                  >
                    再次发起签到
                  </Button>
                )}
              </Space>
            ),
          actions: [
            initialState?.currentUser?.access == 'student' ? (
              <Button
                style={{ marginLeft: '5px' }}
                onClick={() => {
                  window.open('https://cvs.seu.edu.cn/jy-application-vod-he-ui/#/home', '_blank');
                }}
                type="text"
              >
                课程直播
              </Button>
            ) : (
              ''
            ),
            initialState?.currentUser?.access == 'teacher' ? (
              item.haveHomework ? (
                <Button
                  type="text"
                  onClick={() => {
                    setCurrentSyllabusID(item.syllabusID);
                    setOpenFileModal(true);
                  }}
                >
                  修改课件资料
                </Button>
              ) : (
                <Button
                  type="text"
                  onClick={() => {
                    setCurrentSyllabusID(item.syllabusID);
                    setOpenFileModal(true);
                  }}
                >
                  上传课件资料
                </Button>
              )
            ) : item.haveHomework ? (
              <Button
                type="text"
                onClick={() => {
                  setCurrentSyllabusID(item.syllabusID);
                  setOpenFileModal(true);
                }}
              >
                查看课件资料
              </Button>
            ) : (
              <Button type="text" disabled>
                课程资料待上传
              </Button>
            ),
            initialState?.currentUser?.access === 'teacher' ? (
              item.haveHomework ? (
                <Link to={`/profile/homework-info/${item.syllabusID}`}>
                  <Button type="text" style={{ marginRight: '5px' }}>
                    作业详情
                  </Button>
                </Link>
              ) : (
                <Button
                  style={{ marginRight: '5px' }}
                  type="text"
                  onClick={() => {
                    setCurrentSyllabusID(item.syllabusID);
                  }}
                >
                  发布作业
                </Button>
              )
            ) : item.haveHomework ? (
              <Button
                style={{ marginRight: '5px' }}
                type="text"
                onClick={() => {
                  setCurrentSyllabusID(item.syllabusID);
                  setOpenHomeworkModal(true);
                }}
              >
                查看作业
              </Button>
            ) : (
              <Button style={{ marginRight: '5px' }} type="text" disabled onClick={() => {}}>
                作业待发布
              </Button>
            ),
          ],
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
          content: (
            <div style={{ marginTop: '-10px' }}>
              <ClockCircleOutlined />
              <em style={{ marginLeft: '5px' }}>授课时间：{item.time}</em>
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

  async function checkIn(syllabusID: string) {
    setLoadingForCheckIn(syllabusID);
    try {
      let result = await sendCheckIn(syllabusID);
      if (result.data === 0) {
        message.error('签到已停止');
      } else if (result.data == 1) {
        message.success('签到成功');
      } else {
        message.error('签到失败');
      }
    } catch {}
    setLoadingForCheckIn('');
  }
  const cardActionProps = 'actions';
  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 条`;
  }
  const paginationProps = {
    onChange: changePage,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [6, 12, 18, 24],
    current: currentPage,
    pageSize: pageSize,
    total: totalNum,
    showTotal: showTotal,
  };

  return (
    <>
      <ProList<any>
        grid={{ gutter: 16, xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
        headerTitle="课程大纲"
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
      <FileModal
        open={openFileModal}
        setOpen={setOpenFileModal}
        syllabusID={currentSyllabusID}
      ></FileModal>
      <HomeworkModal
        open={openHomeworkModal}
        setOpen={setOpenHomeworkModal}
        syllabusID={currentSyllabusID}
      ></HomeworkModal>
    </>
  );
};
export default Syllabus;
