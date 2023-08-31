import { request } from 'umi';
import {  TeachingSituation, CourseSituation, SectionSituation } from './data';

export async function queryTeachingSituation():Promise<{data:TeachingSituation[]}>{
  return request('/api/datavisualize/teaching', {
    method: 'POST',
  });
}

export async function queryCourseSituation():Promise<{data:CourseSituation[]}>{
  return request('/api/datavisualize/course', {
    method: 'POST',
  });
}

export async function querySectionSituation(teacherID:string) 
:Promise<{data:SectionSituation[]}>{
  return request('/api/datavisualize/section', {
    method: 'POST',
  });
}