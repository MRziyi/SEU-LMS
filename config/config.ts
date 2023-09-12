// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './studentSettings';
export default defineConfig({
  hash: true,
  history: {
    type: 'hash',
  },
  base: './',
  publicPath: './',
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          component: '404',
        },
      ],
    },

    {
      path: '/profile',
      name: '详情',
      icon: 'profile',
      hideInMenu: true,
      routes: [
        {
          path: '/profile/course-info/:courseID',
          component: './profile/courseInfo',
          name: '课程详情',
        },
        {
          path: '/profile/homework-info/:syllabusID',
          component: './profile/homeworkInfo',
          name: '课程详情',
        },
      ],
    },

    {
      name: '课程中心',
      icon: 'read',
      path: '/myCourses',
      component: './myCourses',
    },
    {
      path: '/data-visualize',
      name: '数据可视化',
      icon: 'areaChart',
      access: 'canTA',
      component: './dataVisualize',
    },
    {
      path: '/course-manage',
      name: '课程管理',
      icon: 'appstore',
      access: 'canAdmin',
      component: './courseManagement',
    },
    {
      path: '/user-manage',
      name: '用户管理',
      icon: 'team',
      access: 'canAdmin',
      component: './userManagement',
    },
    {
      name: '我的日历',
      icon: 'calendar',
      path: '/my-calendar',
      access: 'canStudent',
      component: './myCalendar',
    },
    {
      name: '帮助中心',
      icon: 'questionCircle',
      path: '/wiki',
      access: 'canST',
      component: './wiki',
    },
    {
      name: '我的消息',
      icon: 'message',
      path: '/myMessages',
      component: './myMessages',
    },
    {
      path: '/question-answer',
      name: '问题解答',
      icon: 'edit',
      access: 'canAdmin',
      component: './questionAnswer',
    },
    {
      name: '账户设置',
      icon: 'tool',
      path: '/account-settings',
      component: './accountSettings',
    },
    {
      path: '/redirector',
      component: './redirector',
    },
    {
      path: '/',
      redirect: '/redirector',
    },
    {
      component: '404',
    },
  ],
  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: {
    '/api/': {
      target: 'http://10.203.249.127:8081',
      changeOrigin: true,
      secure: false,
    },
  },
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
