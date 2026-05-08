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
  experiences: WorkExperience[];
  qualifications: Qualification[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  references: Reference[];
  lastStep?: number;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
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

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
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
  experiences: [],
  qualifications: [],
  skills: [],
  projects: [],
  languages: [],
  references: []
};

export interface TemplateStyle {
  themeColor: string;
  fontFamily: string;
  textSize: string;
  lineSpacing: string;
}

export const TEMPLATE_STYLES: Record<string, TemplateStyle> = {
  'modern': { themeColor: '#166534', fontFamily: 'Inter', textSize: '14px', lineSpacing: '1.5' },
  'professional': { themeColor: '#1e3a8a', fontFamily: 'Inter', textSize: '14px', lineSpacing: '1.4' },
  'minimalist': { themeColor: '#000000', fontFamily: 'Playfair Display', textSize: '15px', lineSpacing: '1.6' },
  'creative': { themeColor: '#064e3b', fontFamily: 'Inter', textSize: '14px', lineSpacing: '1.5' },
  'elegant': { themeColor: '#9d174d', fontFamily: 'Playfair Display', textSize: '16px', lineSpacing: '1.6' },
  'corporate': { themeColor: '#134e4a', fontFamily: 'Inter', textSize: '14px', lineSpacing: '1.4' },
  'modern-blue': { themeColor: '#2563eb', fontFamily: 'Inter', textSize: '14px', lineSpacing: '1.5' },
  'vibrant-yellow': { themeColor: '#eab308', fontFamily: 'Space Grotesk', textSize: '14px', lineSpacing: '1.5' },
  'elegant-green': { themeColor: '#166534', fontFamily: 'Playfair Display', textSize: '15px', lineSpacing: '1.6' },
  'modern-pro': { themeColor: '#1e293b', fontFamily: 'Inter', textSize: '14px', lineSpacing: '1.5' },
  'bold-teal': { themeColor: '#0d9488', fontFamily: 'Space Grotesk', textSize: '14px', lineSpacing: '1.5' },
  'classic-cream': { themeColor: '#78350f', fontFamily: 'Playfair Display', textSize: '15px', lineSpacing: '1.7' },
  'sharp-monochrome': { themeColor: '#000000', fontFamily: 'JetBrains Mono', textSize: '13px', lineSpacing: '1.5' },
  'dynamic-blue': { themeColor: '#1d4ed8', fontFamily: 'Space Grotesk', textSize: '14px', lineSpacing: '1.5' },
  'blush-minimal': { themeColor: '#be185d', fontFamily: 'Inter', textSize: '14px', lineSpacing: '1.6' }
};

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: 'Modern' | 'Professional' | 'Creative' | 'Minimalist';
  previewColor: string;
}

export const TEMPLATE_METADATA: TemplateMetadata[] = [
  { id: 'modern', name: 'Modern Classic', description: 'Clean layout with a green sidebar.', category: 'Modern', previewColor: '#166534' },
  { id: 'professional', name: 'Professional Blue', description: 'Traditional header-first corporate layout.', category: 'Professional', previewColor: '#1e3a8a' },
  { id: 'minimalist', name: 'Minimalist Airy', description: 'Pure typography focused layout.', category: 'Minimalist', previewColor: '#000000' },
  { id: 'creative', name: 'Creative Emerald', description: 'Bold dark sidebar for high impact.', category: 'Creative', previewColor: '#064e3b' },
  { id: 'elegant', name: 'Elegant Rose', description: 'Sophisticated serif fonts and warm tones.', category: 'Minimalist', previewColor: '#9d174d' },
  { id: 'corporate', name: 'Corporate Teal', description: 'Strict and organized for business roles.', category: 'Professional', previewColor: '#134e4a' },
  { id: 'modern-blue', name: 'Modern Royal', description: 'Vibrant blue sidebar with clear sections.', category: 'Modern', previewColor: '#2563eb' },
  { id: 'vibrant-yellow', name: 'Vibrant Pulse', description: 'Creative yellow accents for unique profiles.', category: 'Creative', previewColor: '#eab308' },
  { id: 'elegant-green', name: 'Classic Ivy', description: 'Serif fonts with a deep green header.', category: 'Professional', previewColor: '#166534' },
  { id: 'modern-pro', name: 'Modern Charcoal', description: 'Professional grey tones for experienced users.', category: 'Modern', previewColor: '#1e293b' },
  { id: 'bold-teal', name: 'Bold Horizon', description: 'Modern teal aesthetic with geometric feel.', category: 'Creative', previewColor: '#0d9488' },
  { id: 'classic-cream', name: 'Traditional Parchment', description: 'Warm cream tones and classic serifs.', category: 'Professional', previewColor: '#78350f' },
  { id: 'sharp-monochrome', name: 'Sharp Modern', description: 'Monospaced fonts for technical roles.', category: 'Minimalist', previewColor: '#000000' },
  { id: 'dynamic-blue', name: 'Dynamic Flow', description: 'Geometric blue layout for modern industries.', category: 'Modern', previewColor: '#1d4ed8' },
  { id: 'blush-minimal', name: 'Blush Soft', description: 'Subtle pink tones for a soft professional look.', category: 'Minimalist', previewColor: '#be185d' }
];
