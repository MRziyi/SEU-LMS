import type { Request, Response } from 'express';

const nickNames = ['Joe', '小红', '小平', '小民'];

const ID = ['20001234', '20021568', '15648978', '11124445', '55151578'];

const access = ['教师', '学生'];

const phone = ['13132526464', '20021223568', '15644458978', '11124667445', '55151324578'];

const email = [
  '200012341655@mail.com',
  '20021568@mail.com',
  '15648@mail.com',
  '1112444@mail.com',
  '551@mail.com',
];
const imgUrl = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
async function postFakeUserList(req: Request, res: Response) {
  const { nickName, id, currentPage, pageSize } = req.body;
  const list = [];
  for (let i = 0; i < 25; i++) {
    list.push({
      key: i,
      nickName: nickNames[i % 4],
      id: ID[i % 5],
      access: access[i % 2],
      phone: phone[i % 5],
      email: email[i % 5],
      avatarUrl: imgUrl[i % 4],
    });
  }
  console.log('mock处理参数', nickName, id, currentPage, pageSize);

  let filteredItems = list; // 初始化为整个列表

  // 如果 paramName 不为空，则进行筛选
  if (nickName && id) {
    filteredItems = list.filter((item) => item.nickName.includes(nickName) && item.id.includes(id));
  } else if (nickName) {
    filteredItems = list.filter((item) => item.nickName.includes(nickName));
  } else if (id) {
    filteredItems = list.filter((item) => item.id.includes(id));
  }

  const startIndex = (currentPage - 1) * pageSize;
  console.log('Page: ' + startIndex + ' - ' + (startIndex + pageSize));

  let finalList = filteredItems.slice(startIndex, startIndex + pageSize);

  return res.json({
    code: 0,
    data: {
      list: finalList,
      totalNum: 25,
    },
  });
}

async function deleteUsers(req: Request, res: Response) {
  let list = [];
  list = req.body.deleteList;
  console.log('删除的元素：', list);
  return res.json({
    code: 0,
    deleteList: list,
  });
}

async function sendPM(req: Request, res: Response) {
  return res.json({
    code: 0,
  });
}

export default {
  'POST  /api/user/list-for-admin': postFakeUserList,
  'POST  /api/user/delete-users': deleteUsers,
  'POST  /api/user/sendPM': sendPM,
};
