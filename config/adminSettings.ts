import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'SEU-LMS',
  pwa: false,
  logo: 'https://pic.imgdb.cn/item/64e60c4a661c6c8e54319b65.png',
  iconfontUrl: '',
};

export default Settings;
