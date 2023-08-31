import type { Request, Response } from 'express';

const courseName = [
  '数据结构',
  '离散数学',
  '操作系统',
  '软件工程导论',
  'Java程序设计',
  '编译原理',
  '数据库原理',
  '计算机网络与应用',
];
const ownerUrl = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

const imgUrl = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const description = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];
const ownerName = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

function fakeCourseList(currentPage: number, pageSize: number, keyword = '') {
  const list = [];
  for (let i = 0; i < 24; i += 1) {
    if (keyword === '')
      list.push({
        courseID: 'Course-' + i,
        courseName: courseName[i % 8],
        imgUrl: imgUrl[i % 4],
        teacherName: ownerName[i % 10],
        teacherAvatar: ownerUrl[i % 8],
        semester: '2023秋季学期',
      });
    else
      list.push({
        courseID: 'Course-' + i,
        courseName: keyword,
        imgUrl: imgUrl[i % 4],
        teacherName: ownerName[i % 10],
        teacherAvatar: ownerUrl[i % 8],
        semester: '2023秋季学期',
      });
  }
  const startIndex = (currentPage - 1) * pageSize;
  console.log('Page: ' + startIndex + ' - ' + (startIndex + pageSize));
  return list.slice(startIndex, startIndex + pageSize);
}

async function postFakeCourseList(req: Request, res: Response) {
  const { userID, currentPage, pageSize } = req.body;
  console.log('UserID: ' + userID);
  return res.json({
    code: 0,
    data: {
      totalNum: 24,
      list: fakeCourseList(currentPage, pageSize),
    },
  });
}

async function postFakeSearchedCourseList(req: Request, res: Response) {
  const { keyword, currentPage, pageSize } = req.body;
  console.log('Keyword: ' + keyword);
  return res.json({
    code: 0,
    data: {
      totalNum: 18,
      list: fakeCourseList(currentPage, pageSize, keyword),
    },
  });
}

export default {
  'POST  /api/course/list': postFakeCourseList,
  'POST  /api/course/search': postFakeSearchedCourseList,
};
