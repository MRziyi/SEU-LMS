import { Card } from 'antd';
interface TeacherStatisticsInterface {
  teacherID: string;
}
const TeacherStatistics: React.FC<TeacherStatisticsInterface> = ({ teacherID }) => {
  return <Card>管理员教师统计页面 : {teacherID}</Card>;
};

export default TeacherStatistics;
