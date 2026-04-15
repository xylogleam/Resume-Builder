import { Injectable, signal } from '@angular/core';
import { Resume, DEFAULT_RESUME } from '../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  resumes = signal<Resume[]>([]);
  currentResume = signal<Resume | null>(null);

  constructor() {
    this.loadResumes();
  }

  loadResumes() {
    const saved = localStorage.getItem('resumes');
    if (saved) {
      this.resumes.set(JSON.parse(saved));
    }
  }

  saveResumes(resumes: Resume[]) {
    localStorage.setItem('resumes', JSON.stringify(resumes));
    this.resumes.set(resumes);
  }

  createResume(): string {
    const newResume: Resume = {
      ...JSON.parse(JSON.stringify(DEFAULT_RESUME)),
      id: 'res_' + Math.random().toString(36).substr(2, 9),
      lastModified: Date.now()
    };
    
    const current = this.resumes();
    this.saveResumes([...current, newResume]);
    return newResume.id;
  }

  getResume(id: string): Resume | undefined {
    return this.resumes().find(r => r.id === id);
  }

  updateResume(resume: Resume) {
    resume.lastModified = Date.now();
    const current = this.resumes();
    const index = current.findIndex(r => r.id === resume.id);
    if (index !== -1) {
      current[index] = resume;
      this.saveResumes([...current]);
      
      if (this.currentResume()?.id === resume.id) {
        this.currentResume.set({ ...resume });
      }
    }
  }

  deleteResume(id: string) {
    const current = this.resumes();
    this.saveResumes(current.filter(r => r.id !== id));
  }
  
  setCurrentResume(id: string) {
    const resume = this.getResume(id);
    if (resume) {
      this.currentResume.set({ ...resume });
    } else {
      this.currentResume.set(null);
    }
  }
}
