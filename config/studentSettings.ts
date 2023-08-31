import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#13C2C2',
  layout: 'top',
  contentWidth: 'Fixed',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'SEU-LMS',
  pwa: false,
  logo: 'https://pic.imgdb.cn/item/64e60c4a661c6c8e54319b65.png',
  headerHeight: 48,
  splitMenus: false,
};

export default Settings;
