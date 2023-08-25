export type tabKeyType = '1' | '2' | '3' | '4';

export interface RouteParams {
  courseID: string;
}

export type SyllabusData = {
  syllabusID: string;
  title: string;
  materials: string[];
  homework: string[];
};
