// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';

async function postWiki(req: Request, res: Response) {
  //const { currentPage, pageSize } = req.body;
  return res.json({
    code: 0,
    data: {
      totalNum: 10,
      list:[
          {
            question: "什么是React?",
            answer: "React是一个用于构建用户界面的JavaScript库。"
          },
          {
            question: "React的特点是什么?",
            answer: "React具有虚拟DOM、组件化、单向数据流等特点。"
          },
          {
            question: "React如何创建组件?",
            answer: "可以使用函数组件或类组件来创建React组件。"
          },
          {
            question: "什么是JSX?",
            answer: "JSX是一种JavaScript的语法扩展，用于在React中描述用户界面的结构。"
          },
          {
            question: "React中如何处理状态?",
            answer: "可以使用useState钩子（在函数组件中）或setState方法（在类组件中）来处理状态。"
          },
          {
            question: "什么是React Router?",
            answer: "React Router是一个用于处理路由的库，用于构建单页面应用。"
          },
          {
            question: "如何在React中发送HTTP请求?",
            answer: "可以使用fetch API或Axios等库来发送HTTP请求。"
          },
          {
            question: "什么是React生命周期?",
            answer: "React生命周期是组件在不同阶段执行的一系列方法，如componentDidMount、componentDidUpdate等。"
          },
          {
            question: "React中如何处理表单?",
            answer: "可以使用controlled组件或者React Hook Form等库来处理表单。"
          },
          {
            question: "React中如何进行状态提升?",
            answer: "状态提升是将组件的状态移动到它们的共同父组件，以便共享数据。"
          }
      ]
    },
  });
}

export default {
  'POST  /api/wiki': postWiki,
};