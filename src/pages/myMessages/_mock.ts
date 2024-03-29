import type { Request, Response } from 'express';
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

function fakeMessageList(currentPage: number, pageSize: number) {
  const list = [];
  for (let i = 0; i < 24; i += 1) {
    list.push({
      fromUserName: ownerName[i % 10],
      fromUserAvatar: ownerUrl[i % 8],
      fromUserAccess: i < 5 ? 'teacher' : 'admin',
      messageID: 'Reply - ' + i,
      content: description[i % 5],
      time: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).toLocaleString(),
      isRead: i > 3,
      sourceName: '离散数学私信',
    });
  }
  const startIndex = (currentPage - 1) * pageSize;
  console.log('Reply: ' + startIndex + ' - ' + (startIndex + pageSize));
  return list.slice(startIndex, startIndex + pageSize);
}

async function postFakeMessageList(req: Request, res: Response) {
  const { currentPage, pageSize } = req.body;
  return res.json({
    code: 0,
    data: {
      totalNum: 24,
      list: fakeMessageList(currentPage, pageSize),
    },
  });
}

export default {
  'POST  /api/message/list': postFakeMessageList,
};
