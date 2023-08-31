import type { Request, Response } from 'express';

  async function postTeachingSituation(req: Request, res: Response) {
    return res.json({
      code: 0,
      data: [
        {
          courseName: '数学',
          teacherName: ['张老师', '李老师', '王老师'],
          averageScore: [85, 88, 90],
          attendance: [95, 92, 94],
        },
        {
          courseName: '英语',
          teacherName: ['刘老师', '赵老师', '陈老师','钱老师'],
          averageScore: [78, 82, 85,89],
          attendance: [90, 88, 91,92],
        },
        {
          courseName: '物理',
          teacherName: ['杨老师', '吴老师', '钱老师'],
          averageScore: [88, 86, 89],
          attendance: [93, 91, 94],
        },
      ],
    });
  }

  async function postCourseSituation(req: Request, res: Response) {
    return res.json({
      code: 0,
      data: [
        { courseName: 'Math', averageScore: 85 },
        { courseName: 'Science', averageScore: 78 },
        { courseName: 'History', averageScore: 92 },
        { courseName: 'English', averageScore: 88 },
        { courseName: 'Physics', averageScore: 75 },
        { courseName: 'Chemistry', averageScore: 80 },
        { courseName: 'Biology', averageScore: 87 },
        { courseName: 'Computer Science', averageScore: 91 },
        { courseName: 'Art', averageScore: 70 },
        { courseName: 'Music', averageScore: 82 },
        { courseName: 'Physical Education', averageScore: 95 },
        { courseName: 'Geography', averageScore: 89 },
        { courseName: 'Economics', averageScore: 83 },
        { courseName: 'Literature', averageScore: 79 },
        { courseName: 'Foreign Language', averageScore: 93 },
        { courseName: 'Social Studies', averageScore: 86 },
        { courseName: 'Psychology', averageScore: 74 },
        { courseName: 'Sociology', averageScore: 77 },
        { courseName: 'Philosophy', averageScore: 90 },
        { courseName: 'Religion', averageScore: 84 },
            
      ],
    });
  }

  async function postSectionSituation(req: Request, res: Response) {
    return res.json({
      code: 0,
      data: [
        {
          courseName: 'Math',
          lessonTitle: ['Introduction', 'Algebra', 'Geometry', 'Calculus'],
          averageScore: [88, 76, 92, 85],
          attendance: [95, 89, 97, 92],
        },
        {
          courseName: 'Science',
          lessonTitle: ['Physics', 'Chemistry', 'Biology', 'Astronomy'],
          averageScore: [78, 82, 89, 91],
          attendance: [90, 88, 95, 93],
        },
      ],
    });
  }
  

  export default {
    'POST  /api/datavisualize/teaching':postTeachingSituation,
    'POST  /api/datavisualize/course':postCourseSituation,
    'POST  /api/datavisualize/section':postSectionSituation,
  };


  