import { Card } from 'antd';
interface CourseStatisticsInterface {
  courseID: string;
}
const CourseStatistics: React.FC<CourseStatisticsInterface> = ({ courseID }) => {
  return <Card>管理员课程统计页面: {courseID}</Card>;
};

export default CourseStatistics;
