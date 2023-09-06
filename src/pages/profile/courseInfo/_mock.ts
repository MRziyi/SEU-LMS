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
      haveHomework: i % 2 == 0,
      isCheckedIn: i < 4 ? i : 0,
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
          unit: '软件学院',
          credit: '4',
          teachingTime: '1-16周 星期二 3-5节',
          teachingLocation: '教1-301',
          teachingMethod: '讲授',
          introduction: 'balabalabalalalalalalalalalalalalalallla',
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
    data: { courseName: '离散数学' },
    description: 'ok',
  });
}
async function postFakeFileList(req: Request, res: Response) {
  const { syllabusID } = req.body;
  console.log('file list for: ' + syllabusID);
  return res.json({
    code: 0,
    data: {
      fileList: [
        {
          type: 'pdf',
          name: 'Introduction to Biology',
          description: 'A comprehensive guide to the basics of biology',
          status: 1,
          url: 'https://example.com/files/intro_biology.pdf',
          time: new Date(new Date().getTime() - 1000 * 60 * 60 * 2).toLocaleString(),
        },
        {
          type: 'doc',
          name: 'Chemistry Formulas',
          description: 'A collection of important chemistry formulas',
          status: 1,
          url: 'https://example.com/files/chemistry_formulas.doc',
          time: new Date(new Date().getTime() - 1000 * 60 * 60 * 2).toLocaleString(),
        },
        {
          type: 'ppt',
          name: 'History of World War II',
          description: 'A presentation on the events and impact of World War II',
          status: 1,
          url: 'https://example.com/files/world_war_ii.ppt',
          time: new Date(new Date().getTime() - 1000 * 60 * 60 * 2).toLocaleString(),
        },
      ],
    },
    description: 'ok',
  });
}

async function postCheckInData(req: Request, res: Response) {
  //const { syllabusID } = req.body;
  //console.log('check in for: ' + syllabusID);
  return res.json({
    code: 0,
    data: {
      checkInData:{isCheckedIn:32,
      notCheckedIn:6,
      }
    },
  });
}




const nickName =[
  "Joe",
  "小红",
  "小平",
  "小民",
]

const ID = [
  '20001234',
  '20021568',
  '15648978',
  '11124445',
  '55151578',
]

const access = [
  "教师",
  "学生"
]

const phone = [
  '13132526464',
  '20021223568',
  '15644458978',
  '11124667445',
  '55151324578',
]

const email = [
  '200012341655@mail.com',
  '20021568@mail.com',
  '15648@mail.com',
  '1112444@mail.com',
  '551@mail.com',
]

async function postFakeStudentList(req: Request, res: Response){
  const { nickName, id, courseID, currentPage, pageSize } = req.body;
  const list = [];
  for(let i = 0 ;i<25;i++){
      list.push({
          name:nickName[i%4],
          id:ID[i%5],
          phone:phone[i%5],
          email:email[i%5],
          avatarUrl:imgUrl[i%4],
          
      })
  }
  console.log('mock处理参数',nickName,id,currentPage,pageSize,courseID)

  let filteredItems = list; // 初始化为整个列表

  // 如果 paramName 不为空，则进行筛选
  // if (name && id) {
  //   filteredItems = list.filter((item) => item.name.includes(name) && item.id.includes(id));
  // }else if(name){
  //     filteredItems = list.filter((item) => item.name.includes(name)) ;     
  // }else if(id){
  //     filteredItems = list.filter((item) => item.id.includes(id));
  // }

  const startIndex = (currentPage - 1) * pageSize;
  console.log('Page: ' + startIndex + ' - ' + (startIndex + pageSize));
  

  let finalList = filteredItems.slice(startIndex, startIndex + pageSize);



  return res.json({
      code: 0,
      data:{
        list:finalList,
        totalNum:25,
      }
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
  'POST  /api/syllabus/material-list': postFakeFileList,
  'POST  /api/syllabus/check-in-data':postCheckInData,
  'POST  /api/syllabus/student-list': postFakeStudentList,
};
