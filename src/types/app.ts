export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  year: number;
  semester: number;
  type: 'theory' | 'lab' | 'project';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  whatYouLearn: string[];
  youtubeQuery: string;
  gfgQuery: string;
}

export interface Teacher {
  id: number;
  name: string;
  designation: string;
  email: string;
  phone: string;
  role: string;
  research?: string;
  profileUrl: string;
}

export interface Track {
  id: string;
  name: string;
  icon: string;
  color: string;
  tagline: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  whatYouLearn: string[];
  roadmap: { step: number; title: string; desc: string; link?: string }[];
  resources: { title: string; url: string; type: 'video' | 'docs' | 'practice' }[];
  projects: string[];
  jobs: { role: string; bdSalary: string; intlSalary: string }[];
}

export interface Platform {
  id: string;
  name: string;
  url: string;
  tagline: string;
  description: string;
  difficulty: string;
  bestFor: string[];
  features: string[];
  tips: string[];
  color: string;
}

export type SubjectStatus = 'none' | 'progress' | 'done';

export interface Settings {
  language: 'auto' | 'bn' | 'en';
  responseLength: 'detailed' | 'balanced' | 'concise';
  fontSize: 'small' | 'medium' | 'large';
  reduceMotion: boolean;
  showTimestamps: boolean;
  autoScroll: boolean;
  soundEnabled: boolean;
}
