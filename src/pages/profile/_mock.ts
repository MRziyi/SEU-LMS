import type { Request, Response } from 'express';
import user from 'mock/user';

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
const itemName = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
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
  '希望是一个好东西，也许是最好的，好东西是不会消亡的啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
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

function fakeSyllabusList(currentPage: number, pageSize: number) {
  const list = [];
  for (let i = 0; i < 18; i += 1) {
    list.push({
      syllabusID: 'Syllabus - ' + i,
      title: 'Lesson ' + (i + 1) + ': ' + itemName[i % 8],
      materials: ['URL1', 'URL2'],
      homework: ['URL3', 'URL4'],
      isCheckedIn: i < 3,
      time: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).toLocaleString(),
    });
  }
  const startIndex = (currentPage - 1) * pageSize;
  return list.slice(startIndex, startIndex + pageSize);
}

function fakeDiscussionList(currentPage: number, pageSize: number) {
  const list = [];
  for (let i = 0; i < 24; i += 1) {
    list.push({
      discussionID: 'Discussion - ' + i,
      fromUserName: ownerName[i % 8],
      fromUserAvatar: ownerUrl[i % 4],
      title: itemName[i % 8],
      content: description[i % 5],
      time: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).toLocaleString(),
    });
  }
  const startIndex = (currentPage - 1) * pageSize;
  return list.slice(startIndex, startIndex + pageSize);
}

async function postFakeSyllabusList(req: Request, res: Response) {
  const { courseID, currentPage, pageSize } = req.body;
  console.log('CourseID: ' + courseID);
  return res.json({
    code: 0,
    data: {
      totalNum: 18,
      list: fakeSyllabusList(currentPage, pageSize),
    },
  });
}

async function postFakeDiscussionList(req: Request, res: Response) {
  const { courseID, currentPage, pageSize } = req.body;
  console.log('CourseID: ' + courseID);
  return res.json({
    code: 0,
    data: {
      totalNum: 24,
      list: fakeDiscussionList(currentPage, pageSize),
    },
  });
}

async function postFakeCourseIntro(req: Request, res: Response) {
  const { courseID } = req.body;
  console.log('CourseID: ' + courseID);
  return res.json({
    code: 0,
    data: {
      courseData: {
        courseName: courseName[1],
        imgUrl: imgUrl[1],
        teacherName: ownerName[1],
        teacherAvatar: ownerUrl[1],
        semester: '2023秋季学期',
        description: {
          unit:'软件学院',
          credit:'4',
          teachingTime:'1-16周 星期二 3-5节',
          teachingLocation:'教1-301',
          teachingMethod:'讲授',
          introduction:'balabalabalalalalalalalalalalalalalallla',
        },
        teacherPhone: '18777777777',
        teacherEmail: 'teacher@seu.edu.cn',
      },
    },
  });
}

function fakeReplyList(discussionID: number, currentPage: number, pageSize: number) {
  const list = [];
  for (let i = 0; i < 100; i += 1) {
    list.push({
      fromUserName: ownerName[i % 10] + ' - ' + discussionID,
      fromUserAvatar: ownerUrl[i % 8],
      replyID: 'Reply - ' + i,
      content: description[i % 5],
      isRead: false,
      time: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).toLocaleString(),
    });
  }
  const startIndex = (currentPage - 1) * pageSize;
  console.log('Reply: ' + startIndex + ' - ' + (startIndex + pageSize));
  return list.slice(startIndex, startIndex + pageSize);
}

async function postFakeReplyList(req: Request, res: Response) {
  const { discussionID, currentPage, pageSize } = req.body;
  console.log('DiscussionID: ' + discussionID);
  return res.json({
    code: 0,
    data: {
      totalNum: 100,
      list: fakeReplyList(discussionID, currentPage, pageSize),
    },
  });
}

async function receiveFakeReply(req: Request, res: Response) {
  const { content, courseID, discussionID } = req.body;
  console.log(content + ', from:' + courseID + ', for:' + discussionID);
  return res.json({
    code: 0,
    data: {},
    description: 'ok',
  });
}

async function receiveFakeCheckIn(req: Request, res: Response) {
  const { syllabusID } = req.body;
  console.log('check in for: ' + syllabusID);
  return res.json({
    code: 0,
    data: {},
    description: 'ok',
  });
}

async function postFakeName(req: Request, res: Response) {
  const { syllabusID } = req.body;
  console.log('check in for: ' + syllabusID);
  return res.json({
    code: 0,
    data: {courseName:'离散数学'},
    description: 'ok',
  });
}


export default {
  'POST  /api/syllabus/list': postFakeSyllabusList,
  'POST  /api/discussion/list': postFakeDiscussionList,
  'POST  /api/course/get-intro': postFakeCourseIntro,
  'POST  /api/discussion/reply-list': postFakeReplyList,
  'POST  /api/discussion/reply-send': receiveFakeReply,
  'POST  /api/syllabus/check-in': receiveFakeCheckIn,
  'POST  /api/course/get-name': postFakeName,
};
