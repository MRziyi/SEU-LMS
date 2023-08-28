import type { Request, Response } from 'express';

async function postMessageList(req: Request, res: Response) {
    //const { userID, currentPage, pageSize } = req.body;
    //console.log('UserID: ' + userID);
    return res.json({
      code: 0,
      data: {
        totalNum: 2,
        list:[
            {
                fromUserID: '2',
                fromUserAvatar:`https://xsgames.co/randomusers/avatar.php?g=pixel&key=2}`,
                fromUserNickName:'user2',
                toUserID: '1',
                id: '1',
                content: 'Hello, how are you?',
                isRead: false,
                time: '2023-08-25T10:00:00Z',
              },
              {
                fromUserID: '3',
                fromUserAvatar:`https://xsgames.co/randomusers/avatar.php?g=pixel&key=3`,
                fromUserNickName:'user3',
                toUserID: '1',
                id: '2',
                content: 'I am doing well, thanks!',
                isRead: true,
                time: '2023-08-24T10:15:00Z',
              },
        ]
      },
    });
  }

  export default {
    'POST  /api/message/list': postMessageList,
  };