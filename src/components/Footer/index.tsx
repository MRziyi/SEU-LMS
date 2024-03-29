// import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
const Footer: React.FC = () => {
  const defaultMessage = '东南大学Undefined小组出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'SEU-LMS',
          title: 'SEU-LMS',
          href: 'https://seu-lms.netlify.app',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/MRziyi/SEU-LMS',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
