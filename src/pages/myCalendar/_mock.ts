import type { Request, Response } from 'express';

async function postEventList(req: Request, res: Response) {
    return res.json({
      code: 0,
      data: [
        {
            date: new Date('2023-09-01'),
            content: 'Event 1',
            type: 'Examination',
          },
          {
            date: new Date('2023-09-01'),
            content: 'Event 2',
            type: 'success',
          },
          {
            date: new Date('2023-09-10'),
            content: 'Event 3',
            type: 'Examination',
          },
          {
            date: new Date('2023-09-10'),
            content: 'Event 4',
            type: 'success',
          },
          {
            date: new Date('2023-09-10'),
            content: 'Event 5',
            type: 'Assignment',
          },
          {
            date: new Date('2023-09-15'),
            content: 'Event 6',
            type: 'Examination',
          },
          {
            date: new Date('2023-09-15'),
            content: 'Event 7',
            type: 'success',
          },
      ],
    });
  }

export default {
  'POST  /api/myCalendar':postEventList,
};

