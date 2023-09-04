import type { Request, Response } from 'express';

const nickName =[
    "Joe",
    "小红",
    "小平",
    "小江",
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
    '20001234',
    '20021568',
    '15648978',
    '11124445',
    '55151578',
]

const email = [
    '20001234',
    '20021568',
    '15648978',
    '11124445',
    '55151578',
]

async function postFakeUserList(req: Request, res: Response){
    const queryParams = req.query;
    const list = [];
    for(let i = 0 ;i<25;i++){
        list.push({
            key:i,
            nickName:nickName[i%5],
            ID:ID[i%5],
            access:access[i%2],
            phone:phone[i%5],
            email:email[i%5],
        })
    }
    return res.json({
        code: 0,
        data: list,
      });

}

async function deleteUsers(req: Request, res: Response) {
     let list = [];
     list = req.body.deleteList;
     console.log('删除的第一个元素：',list)
    return res.json({
        code:0,
        deleteList: list,
    })
}
export default {
    'POST  /api/user/list-for-admin': postFakeUserList,
    'POST  /api/user/delete-users': deleteUsers,
  };
  