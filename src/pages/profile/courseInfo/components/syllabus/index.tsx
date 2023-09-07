import React, { useEffect, useState } from 'react';
import { Button, message, Space, Tag } from 'antd';
import { querySyllabus, sendCheckIn } from '../../service';
import { ProList } from '@ant-design/pro-components';
import { ClockCircleOutlined } from '@ant-design/icons';
import FileModal from './components/fileModal';
import HomeworkModal from './components/homeworkModal';
import { Link, useModel } from 'umi';
import UploadFileModal from './components/uploadFileModal';
import AddSyllabus from './components/addSyllabus';
import ModifySyllabus from './components/modifySyllabus';
import CheckInManageModal from './components/checkInManageModal';
import PublishHomeworkModal from './components/publishHomeworkModal';
import StudentCheckInModal from './components/studentCheckInModal';

interface CourseIDParam {
  courseID: string;
}

const Syllabus: React.FC<CourseIDParam> = ({ courseID }) => {
  const [loadingForCheckIn, setLoadingForCheckIn] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = useState<number>(6);

  const { initialState } = useModel('@@initialState');

  async function querySyllabusAdaptor(current: number, pageSize: number) {
    try {
      const result = await querySyllabus(courseID, current, pageSize);
      if (result.data) {
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
                <StudentCheckInModal
                  canCheckIn={item.isCheckedIn == 2}
                  syllabusID={item.syllabusID}
                />
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
                ) : (
                  <CheckInManageModal
                    syllabusID={item.syllabusID}
                    haveCheckedIn={item.isCheckedIn}
                    onClose={()=>{querySyllabusAdaptor(currentPage,currentPageSize)}}
                  />
                )}
              </Space>
            ),
          actions: (
            <Space
              direction="horizontal"
              size="large"
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {initialState?.currentUser?.access == 'student' ? (
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
                <ModifySyllabus syllabusID={item.syllabusID}></ModifySyllabus>
              )}
              {initialState?.currentUser?.access == 'teacher' ? (
                item.haveMaterial ? (
                  <FileModal syllabusID={item.syllabusID} isTeacher={true} />
                ) : (
                  <UploadFileModal syllabusID={item.syllabusID} isLarge={false} />
                )
              ) : item.haveHomework ? (
                <FileModal syllabusID={item.syllabusID} isTeacher={false} />
              ) : (
                <Button type="text" disabled>
                  课程资料待上传
                </Button>
              )}
              {initialState?.currentUser?.access === 'teacher' ? (
                item.haveHomework ? (
                  <Link to={`/profile/homework-info/${item.syllabusID}`}>
                    <Button type="text" style={{ marginRight: '5px' }}>
                      作业详情
                    </Button>
                  </Link>
                ) : (
                  <PublishHomeworkModal syllabusID={item.syllabusID} />
                )
              ) : item.haveHomework ? (
                <HomeworkModal syllabusID={item.syllabusID} />
              ) : (
                <Button style={{ marginRight: '5px' }} type="text" disabled onClick={() => {}}>
                  作业待发布
                </Button>
              )}
            </Space>
          ),
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
          content: (
            <div style={{ marginTop: '-10px' }}>
              <ClockCircleOutlined />
              <em style={{ marginLeft: '5px' }}>授课时间：{item.time}</em>
            </div>
          ),
        }));
        setCurrentPage(current);
        setCurrentPageSize(pageSize)
        return({list:list,total:result.data.totalNum,code:result.code})
      }
    } catch {}
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

  return (
    <>
      <ProList<any>
        toolbar={{
          actions: [
            initialState?.currentUser?.access == 'teacher' ? (
              <AddSyllabus courseID={courseID} />
            ) : (
              ''
            ),
          ],
        }}
        grid={{ gutter: 16, xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
        headerTitle="课程大纲"
        request={async (
          params:  {
            pageSize?: number;
            current?: number;
            keyword?: string;
          },
        ) => {
          const msg = await querySyllabusAdaptor(
            params.current?params.current:1,
            params.pageSize?params.pageSize:6,
          );
          return {
            data: msg?.list,
            success: msg?.code == 0,
            total: msg?.total,
          };
        }}
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [6, 12, 18, 24],
        showTotal: showTotal,}}
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
export default Syllabus;
