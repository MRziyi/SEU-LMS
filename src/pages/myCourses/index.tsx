import { Avatar, Button, Card, List, Typography } from 'antd';
import type { FC } from 'react';
import { Link, useModel } from 'umi';
import styles from './style.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { CourseListData } from './data';
import {
  queryStudentCourseList,
  queryTeacherCourseList,
  searchStudentCourse,
  searchTeacherCourse,
} from './service';
import { queryTeacherChart } from '../dataVisualize/service';

const { Paragraph } = Typography;

const MyCourses: FC = () => {
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<CourseListData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [loadingForPagigation, setLoadingForPagigation] = useState<boolean>(false);
  const [loadingForSearch, setLoadingForSearch] = useState<boolean>(false);

  const searchContent = useRef<string>('');
  const preSearchContent = useRef<string>('');

  //  获取用户信息
  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    changePage(1, pageSize);
  }, []);

  async function changePage(_page: number, _pageSize: number) {
    setLoadingForPagigation(true);
    if (preSearchContent.current !== searchContent.current) _page = 1;
    if (initialState && initialState.currentUser)
      try {
        let result;
        if (searchContent.current == '') {
          if (initialState.currentUser.access == 'student')
            result = await queryStudentCourseList(_page, _pageSize);
          else result = await queryTeacherCourseList(_page, _pageSize);
        } else {
          if (initialState.currentUser.access == 'student')
            result = await searchStudentCourse(searchContent.current, _page, _pageSize);
          else result = await searchTeacherCourse(searchContent.current, _page, _pageSize);
        }
        preSearchContent.current = searchContent.current;
        if (result.data) {
          setTotalNum(result.data.totalNum);
          setListData(result.data.list);
          setPageSize(_pageSize);
          setCurrentPage(_page);
        }
      } catch {}
    setLoadingForPagigation(false);
  }

  async function onSearch(keyword: string) {
    setLoadingForSearch(true);
    try {
      searchContent.current = keyword;
      changePage(1, pageSize);
    } catch {}
    setLoadingForSearch(false);
  }

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 条`;
  }

  const cardList = listData && (
    <List<CourseListData>
      rowKey="courseID"
      loading={loadingForPagigation}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      pagination={{
        onChange: changePage,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [8, 12, 16, 20],
        current: currentPage,
        pageSize: pageSize,
        total: totalNum,
        showTotal: showTotal,
      }}
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
              defaultValue={searchContent.current}
              onSearch={onSearch}
              loading={loadingForSearch}
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
