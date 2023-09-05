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
const imgUrl = [
    'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
    'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
    'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
    'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
  ];
async function postFakeUserList(req: Request, res: Response){
    const { keyword1, keyword2, currentPage, pageSize } = req.body;
    const list = [];
    for(let i = 0 ;i<25;i++){
        list.push({
            key:i,
            nickName:nickName[i%5],
            id:ID[i%5],
            access:access[i%2],
            phone:phone[i%5],
            email:email[i%5],
            avatarUrl:imgUrl[i%4],
            
        })
    }
    console.log('mock处理参数',keyword1,keyword2,currentPage,pageSize)

    let filteredItems = list; // 初始化为整个列表

    // 如果 paramName 不为空，则进行筛选
    if (keyword1) {
      filteredItems = list.filter((item) => item.nickName.includes(keyword1));
    }
  
    if (keyword2) {
        filteredItems = list.filter((item) => item.id.includes(keyword1));
    }
  
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

async function deleteUsers(req: Request, res: Response) {
     let list = [];
     list = req.body.deleteList;
     console.log('删除的元素：',list)
    return res.json({
        code:0,
        deleteList: list,
    })
}
export default {
    'POST  /api/user/list-for-admin': postFakeUserList,
    'POST  /api/user/delete-users': deleteUsers,
  };
  