// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';

const answer = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
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

function fakeWikiList(currentPage: number, pageSize: number) {
  const list = [];
  for (let i = 0; i < 24; i += 1) {
    list.push({
      wikiID: 'Wiki - ' + i,
      question: question[i % 10],
      answer: i > 2 ? answer[i % 5] : '待管理员解答',
    });
  }
  const startIndex = (currentPage - 1) * pageSize;
  console.log('Reply: ' + startIndex + ' - ' + (startIndex + pageSize));
  return list.slice(startIndex, startIndex + pageSize);
}

async function postFakeWikiList(req: Request, res: Response) {
  const { currentPage, pageSize } = req.body;
  return res.json({
    code: 0,
    data: {
      totalNum: 30,
      list: fakeWikiList(currentPage, pageSize),
    },
  });
}
export default {
  'POST  /api/wiki': postFakeWikiList,
};
