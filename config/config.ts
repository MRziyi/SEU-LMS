// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './studentSettings';
export default defineConfig({
  hash: true,
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
      ],
    },

    {
      path: '/dashboard',
      name: '仪表盘',
      icon: 'dashboard',
      // access: 'canAdmin',
      hideInMenu: true,
      routes: [
        {
          path: '/dashboard',
          redirect: '/dashboard/analysis',
        },
        {
          name: 'analysis',
          icon: 'smile',
          path: '/dashboard/analysis',
          component: './dashboard/analysis',
        },
        {
          name: 'monitor',
          icon: 'smile',
          path: '/dashboard/monitor',
          component: './dashboard/monitor',
        },
        {
          name: 'workplace',
          icon: 'smile',
          path: '/dashboard/workplace',
          component: './dashboard/workplace',
        },
      ],
    },
    {
      path: '/data-visualize',
      name: '数据可视化',
      icon: 'areaChart',
      access: 'canAdmin',
      component: './dataVisualize',
    },
    {
      path: '/question-answer',
      name: '问题解答',
      icon: 'crown',
      access: 'canAdmin',
      component: './questionAnswer',
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
      name: '我的课程',
      icon: 'read',
      path: '/myCourses',
      access: 'canStudent' || 'canTeacher',
      component: './myCourses',
    },
    {
      name: '我的消息',
      icon: 'message',
      path: '/myMessages',
      component: './myMessages',
    },
    {
      name: '我的日历',
      icon: 'calendar',
      path: '/my-calendar',
      access: 'canStudent' || 'canTeacher',
      component: './myCalendar',
    },
    {
      name: '帮助中心',
      icon: 'questionCircle',
      path: '/wiki',
      component: './wiki',
    },
    {
      path: '/form',
      icon: 'form',
      name: '表单',
      hideInMenu: true,
      routes: [
        {
          path: '/form',
          redirect: '/form/basic-form',
        },
        {
          name: '基础表单',
          icon: 'smile',
          path: '/form/basic-form',
          component: './form/basic-form',
        },
        {
          name: '分步表单',
          icon: 'smile',
          path: '/form/step-form',
          component: './form/step-form',
        },
        {
          name: '进阶表单',
          icon: 'smile',
          path: '/form/advanced-form',
          component: './form/advanced-form',
        },
        {
          name: '总体表单预览',
          icon: 'smile',
          path: '/form/total-form',
          component: './form/total-form',
        },
      ],
    },
    {
      name: '账户设置',
      icon: 'tool',
      path: '/account-settings',
      component: './accountSettings',
    },
    {
      path: '/',
      redirect: '/myCourses',
      access: 'student' || 'teacher',
    },
    {
      path: '/',
      redirect: '/data-visualize',
      access: 'student' || 'teacher',
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
  // proxy: {
  //   '/api/': {
  //     target: 'http://123.60.24.195',
  //     changeOrigin: true,
  //   },
  // },
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
