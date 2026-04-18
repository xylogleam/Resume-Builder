export interface Resume {
  id: string;
  title: string;
  lastModified: number;
  templateId: string;
  themeColor: string;
  fontFamily: string;
  textSize: string;
  lineSpacing: string;
  personalInfo: PersonalInfo;
  about: string;
  qualifications: Qualification[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photoUrl?: string;
}

export interface Qualification {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  grade?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  technologies: string[];
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export const DEFAULT_RESUME: Resume = {
  id: '',
  title: 'Untitled Resume',
  lastModified: Date.now(),
  templateId: 'modern',
  themeColor: '#166534', // Green theme default
  fontFamily: 'Inter',
  textSize: '14px',
  lineSpacing: '1.5',
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    photoUrl: ''
  },
  about: '',
  qualifications: [],
  skills: [],
  projects: [],
  languages: []
};
