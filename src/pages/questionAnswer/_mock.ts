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
const question = [
  '什么是React',
  'React的特点是什么',
  '什么是JSX',
  'React中如何处理状态',
  '什么是React Router',
  '如何在React中发送HTTP请求',
  '什么是React生命周期',
  'React中如何处理表单',
  'React中如何进行状态提升',
  'React如何创建组件',
];
const ownerName = [
  '111付小小',
  '111曲丽丽',
  '111林东东',
  '111周星星',
  '111吴加好',
  '朱111偏右',
  '鱼酱111',
  '乐111哥',
  '谭11小仪',
  '仲11尼',
];

function fakeMessageList(currentPage: number, pageSize: number) {
  const list = [];
  for (let i = 0; i < 24; i += 1) {
    list.push({
      fromUserName: ownerName[i % 10],
      fromUserAvatar: ownerUrl[i % 8],
      fromUserAccess: i < 5 ? 'teacher' : 'admin',
      wikiID: 'Reply - ' + i,
      question: question[i % 10],
      answer: i > 3 ? description[i % 5] : '',
      time: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).toLocaleString(),
    });
  }
  const startIndex = (currentPage - 1) * pageSize;
  console.log('Reply: ' + startIndex + ' - ' + (startIndex + pageSize));
  return list.slice(startIndex, startIndex + pageSize);
}

async function postFakeMessageList(req: Request, res: Response) {
  const { currentPage, pageSize } = req.body;
  console.log(currentPage, pageSize);
  return res.json({
    code: 0,
    data: {
      totalNum: 24,
      list: fakeMessageList(currentPage, pageSize),
    },
  });
}

export default {
  'POST  /api/wiki/admin-list': postFakeMessageList,
};
