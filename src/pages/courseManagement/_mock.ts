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

async function postFakeCourseList(req: Request, res: Response) {
  const { keyword, currentPage, pageSize } = req.body;

  console.log('mock处理参数', keyword, currentPage, pageSize);
  const list = [];
  for (let i = 0; i < 100; i += 1) {
    if (i % 2) {
      list.push({
        courseID: 'Course-' + i,
        courseName: courseName[i % 8],
        imgUrl: imgUrl[i % 4],
        teacherName: ownerName[i % 10],
        teacherAvatar: ownerUrl[i % 8],
        semester: '2023秋季学期',
        description: '俺是描述俺是描述',
      });
    } else {
      list.push({
        courseID: 'Course-' + i,
        courseName: courseName[i % 8],
        imgUrl: imgUrl[i % 4],
        teacherName: ownerName[i % 10],
        teacherAvatar: ownerUrl[i % 8],
        semester: '2023夏季学期',
        description: '俺是描述俺是描述',
      });
    }
  }

  let filteredItems = list; // 初始化为整个列表

  // 如果 paramName 不为空，则进行筛选
  if (keyword) {
    filteredItems = list.filter((item) => item.courseName.includes(keyword));
  }

  const startIndex = (currentPage - 1) * pageSize;
  console.log('Page: ' + startIndex + ' - ' + (startIndex + pageSize));

  let finalList = filteredItems.slice(startIndex, startIndex + pageSize);

  return res.json({
    code: 0,
    data: {
      list: finalList,
      totalNum: 1000,
      teacherList: ownerName,
    },
  });
}

async function deleteItem(req: Request, res: Response) {
  const deleteItem = req.body;
  return res.json({
    code: 0,
    data: { deleteItem },
  });
}

async function fakeTeacherInfo(req: Request, res: Response) {
  const { courseID } = req.body;
  const teacherData = {
    teacherPhone: '123456789',
    teacherEmail: 'teacher@example.com',
  };
  return res.json({
    code: 0,
    data: {
      teacherData,
    },
  });
}

async function addCourse(req: Request, res: Response) {
  return res.json({
    code: 0,
  });
}

export default {
  'POST  /api/course/admin-list': postFakeCourseList,
  'POST  /api/course/delete': deleteItem,
  'POST  /api/course/get-teacher-info': fakeTeacherInfo,
  'POST  /api/course/add': addCourse,
};
