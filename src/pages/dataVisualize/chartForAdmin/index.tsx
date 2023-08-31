import { Card } from 'antd';

interface ChartForTeacherInterface {
  value: string;
  loadingFather: boolean;
}

const ChartForAdmin: React.FC<ChartForTeacherInterface> = ({ value, loadingFather }) => {
  return <Card>管理员图表页面 :{value}</Card>;
};

export default ChartForAdmin;
