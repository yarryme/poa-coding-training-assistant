
export type POACode = 'Y' | 'N' | 'U' | 'W' | 'E';

export interface QuizQuestion {
  id: number;
  difficulty: '기초' | '중급' | '심화';
  case: {
    title: string;
    details: string;
  };
  diagnoses: {
    primary: string;
    secondary?: string;
  };
  question: string;
  targetDiagnosis: string;
  options: POACode[];
  answer: POACode;
  explanation: Record<POACode, string> & { general: string };
}
