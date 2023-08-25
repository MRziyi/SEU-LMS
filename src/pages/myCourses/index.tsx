import { Avatar, Button, Card, List, Typography } from 'antd';
import type { FC } from 'react';
import { Link, useModel, useRequest } from 'umi';
import styles from './style.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Input } from 'antd';
import { useState } from 'react';
import { CourseListData } from './data';
import { queryCourseList } from './service';

const { Paragraph } = Typography;

const MyCourses: FC = () => {
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<CourseListData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [loadingForPagigation, setLoading] = useState<boolean>(false);

  //  获取用户信息
  const { initialState } = useModel('@@initialState');

  // 获取列表数据
  const { loading } = useRequest(
    () => {
      if (initialState && initialState.currentUser && initialState.currentUser.id)
        return queryCourseList(initialState.currentUser.id, 1, 8);
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
        const result = await queryCourseList(initialState.currentUser.id, _page, _pageSize);
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
    pageSizeOptions: [8, 12, 16, 20],
    currentPage: currentPage,
    pageSize: pageSize,
    total: totalNum,
    showTotal: showTotal,
  };

  // const handleFormSubmit = async (value: string) => {
  //   const result = await searchList({ description: value });
  //   setListData(result.data.list);
  //   setTotalNum(result.data.totalNum);
  // };

  const cardList = listData && (
    <List<CourseListData>
      rowKey="courseID"
      loading={loading && loadingForPagigation}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      pagination={paginationProps}
      dataSource={listData}
      renderItem={(course) => (
        <List.Item>
          <Link to={`/profile/course-info/${course.courseID}`}>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={course.courseName} src={course.imgUrl} />}
            >
              <Card.Meta
                title={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <a>{course.courseName}</a>
                  </div>
                }
                description={
                  <div>
                    <Paragraph
                      style={{ marginTop: 10, whiteSpace: 'pre-wrap' }}
                      className={styles.item}
                      ellipsis={false}
                    ></Paragraph>
                  </div>
                }
              />
              <div className={styles.cardItemContent}>
                <span>{course.semester}</span>
                <div className={styles.avatarList}>
                  <span style={{ marginRight: 10 }}>{course.teacherName}</span>
                  <Avatar
                    size="small"
                    className={styles.avatar}
                    src={course.teacherAvatar}
                    alt="avatar"
                  />
                </div>
              </div>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );

  return (
    <div>
      <PageContainer
        header={{
          title: '我的课程',
          ghost: true,
          extra: [
            <Button key="1" type="primary" size="large" style={{ marginRight: '20px' }}>
              同步课程
            </Button>,
            <Input.Search
              placeholder="请输入欲搜索的已选课程"
              enterButton="搜索"
              key="2"
              size="large"
              // onSearch={handleFormSubmit}}
            />,
          ],
        }}
      >
        <div className={styles.coverCardList}>
          <div className={styles.cardList}>{cardList}</div>
        </div>
      </PageContainer>
    </div>
  );
};

export default MyCourses;
