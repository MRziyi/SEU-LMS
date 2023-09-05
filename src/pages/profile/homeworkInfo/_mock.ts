import type { Request, Response } from 'express';

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

function homeworkListData(currentPage: number, pageSize: number) {
  const list = [];
  for (let i = 0; i < 18; i += 1) {
    list.push({
      studentAvatar:'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
      studentNickName:ownerName[i % 10],
      fileName:itemName[i % 8],
      fileUrl:ownerUrl[i%8],
      status:i%2,
    });
  }
  const startIndex = (currentPage - 1) * pageSize;
  return list.slice(startIndex, startIndex + pageSize);
}

async function postHomeworkData(req: Request, res: Response) {
  const { courseID, currentPage, pageSize } = req.body;
  console.log('CourseID: ' + courseID);
  return res.json({
    code: 0,
    data: {
      totalNum: 18,
      list: homeworkListData(currentPage, pageSize),
      info:{
        homeworkName:'这是一份作业',
        homeworkDescription:'乱七八糟的描述balabala',
        toBeCorrectedNum:31,
        uncommittedNum:5,
      }
    },
  });
}

export default {
  'POST  /api/syllabus/homework': postHomeworkData,
};
