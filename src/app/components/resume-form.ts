import { Component, input, output, inject, OnInit, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Resume, Qualification, Skill, Project, Language } from '../models/resume.model';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-resume-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, DragDropModule],
  template: `
    <div class="bg-white h-full flex flex-col border-r border-emerald-100">
      
      <!-- Step Indicator / Header -->
      <div class="p-5 border-b border-emerald-100 bg-emerald-50/30 shrink-0">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-xl font-bold text-emerald-950 flex items-center gap-2">
            <mat-icon class="text-emerald-600">{{ steps[currentStepIndex()].icon }}</mat-icon>
            {{ steps[currentStepIndex()].title }}
          </h2>
          <span class="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
            Step {{ currentStepIndex() + 1 }} of {{ steps.length }}
          </span>
        </div>
        
        <!-- Progress Bar -->
        <div class="w-full bg-emerald-100 h-2 rounded-full overflow-hidden mb-4">
          <div class="bg-yellow-400 h-full transition-all duration-300 ease-out" [style.width]="((currentStepIndex() + 1) / steps.length * 100) + '%'"></div>
        </div>
        
        <!-- Step Navigation Dots -->
        <div class="flex justify-between px-1 overflow-x-auto pb-2 gap-2 hide-scrollbar">
          @for (step of steps; track step.id; let i = $index) {
            <button type="button" (click)="currentStepIndex.set(i)" 
                    class="w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-200 border-2"
                    [class.bg-emerald-600]="i === currentStepIndex()"
                    [class.border-emerald-600]="i === currentStepIndex()"
                    [class.text-white]="i === currentStepIndex()"
                    [class.bg-white]="i !== currentStepIndex()"
                    [class.border-emerald-200]="i !== currentStepIndex()"
                    [class.text-emerald-400]="i !== currentStepIndex()"
                    [class.hover:border-emerald-400]="i !== currentStepIndex()"
                    [title]="step.title">
              <mat-icon class="text-[20px] w-5 h-5 leading-5">{{ step.icon }}</mat-icon>
            </button>
          }
        </div>
      </div>

      <!-- Form Content -->
      <div class="flex-1 overflow-y-auto p-6">
        <form [formGroup]="form" class="h-full">
        
        <!-- Document Settings -->
        <div [class.hidden]="currentStepIndex() !== 6" class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 class="text-lg font-semibold text-emerald-950 flex items-center gap-2 border-b border-emerald-100 pb-2">
            <mat-icon class="text-emerald-700">settings</mat-icon> Document Settings
          </h2>
          <div>
            <label class="block text-sm font-medium text-emerald-900 mb-1">Resume Title</label>
            <input type="text" formControlName="title" class="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-emerald-900 mb-1">Template</label>
              <select formControlName="templateId" class="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
                <option value="modern">Modern</option>
                <option value="professional">Professional</option>
                <option value="minimal">Minimalist</option>
                <option value="creative">Creative (Green/Dark)</option>
                <option value="elegant">Elegant (Peach)</option>
                <option value="corporate">Corporate (Teal)</option>
                <option value="modern-blue">Modern Blue</option>
                <option value="vibrant-yellow">Vibrant Yellow (Creative)</option>
                <option value="elegant-green">Elegant Green (Classic)</option>
                <option value="modern-pro">Modern Pro (Blue/Grey)</option>
                <option value="bold-teal">Bold Teal (Modern)</option>
                <option value="classic-cream">Classic Cream (Warm)</option>
                <option value="sharp-monochrome">Sharp Monochrome (Dark/Light)</option>
                <option value="dynamic-blue">Dynamic Blue (Geometric)</option>
                <option value="blush-minimal">Blush Minimal (Soft)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-emerald-900 mb-1">Theme Color</label>
              <div class="flex items-center gap-2">
                <input type="color" formControlName="themeColor" class="h-10 w-10 rounded cursor-pointer border-0 p-0">
                <span class="text-sm text-emerald-700">{{ form.get('themeColor')?.value }}</span>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-emerald-900 mb-1">Font Style</label>
              <select formControlName="fontFamily" class="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
                <option value="Inter">Inter (Sans)</option>
                <option value="Space Grotesk">Space Grotesk (Modern)</option>
                <option value="Playfair Display">Playfair (Serif)</option>
                <option value="JetBrains Mono">JetBrains (Mono)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-emerald-900 mb-1">Text Size</label>
              <select formControlName="textSize" class="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
                <option value="12px">Small</option>
                <option value="14px">Medium</option>
                <option value="16px">Large</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-emerald-900 mb-1">Line Spacing</label>
              <select formControlName="lineSpacing" class="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
                <option value="1.2">Tight</option>
                <option value="1.5">Normal</option>
                <option value="1.8">Relaxed</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Personal Info -->
        <div [class.hidden]="currentStepIndex() !== 0" class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300" formGroupName="personalInfo">
          <h2 class="text-lg font-semibold text-emerald-950 flex items-center gap-2 border-b border-emerald-100 pb-2">
            <mat-icon class="text-emerald-700">person</mat-icon> Personal Details
          </h2>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-emerald-900 mb-2">Profile Picture</label>
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-200 overflow-hidden flex items-center justify-center">
                @if (form.get('personalInfo.photoUrl')?.value) {
                  <img [src]="form.get('personalInfo.photoUrl')?.value" alt="Profile Photo" class="w-full h-full object-cover">
                } @else {
                  <mat-icon class="text-emerald-400">person</mat-icon>
                }
              </div>
              <input type="file" accept="image/*" (change)="onFileSelected($event)" class="text-sm text-emerald-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100">
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-emerald-900 mb-1">Full Name</label>
              <input type="text" formControlName="fullName" class="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-emerald-900 mb-1">Job Title</label>
              <input type="text" formControlName="jobTitle" class="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-emerald-900 mb-1">Email</label>
              <input type="email" formControlName="email" class="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-emerald-900 mb-1">Phone</label>
              <input type="text" formControlName="phone" class="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-emerald-900 mb-1">Location</label>
              <input type="text" formControlName="location" class="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-emerald-900 mb-1">LinkedIn</label>
              <input type="text" formControlName="linkedin" class="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-emerald-900 mb-1">GitHub / Website</label>
              <input type="text" formControlName="github" class="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
            </div>
          </div>
        </div>

        <!-- About -->
        <div [class.hidden]="currentStepIndex() !== 1" class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <div class="flex justify-between items-center border-b border-emerald-100 pb-2">
            <h2 class="text-lg font-semibold text-emerald-950 flex items-center gap-2">
              <mat-icon class="text-emerald-700">article</mat-icon> About
            </h2>
          </div>
          <div>
            <textarea formControlName="about" rows="4" class="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none resize-none placeholder-emerald-300" placeholder="Write a brief summary of your professional background..."></textarea>
          </div>
        </div>

        <!-- Qualifications -->
        <div [class.hidden]="currentStepIndex() !== 2" class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <div class="flex justify-between items-center border-b border-emerald-100 pb-2">
            <h2 class="text-lg font-semibold text-emerald-950 flex items-center gap-2">
              <mat-icon class="text-emerald-700">school</mat-icon> Qualifications
            </h2>
            <button type="button" (click)="addQualification()" class="text-sm text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1">
              <mat-icon class="text-sm w-4 h-4 leading-4">add</mat-icon> Add
            </button>
          </div>
          
          <div formArrayName="qualifications" cdkDropList (cdkDropListDropped)="dropQualification($event)" class="space-y-4">
            @for (qual of qualificationsControls; track qual; let i = $index) {
              <div [formGroupName]="i" cdkDrag class="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 relative group">
                <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div cdkDragHandle class="cursor-move text-emerald-400 hover:text-emerald-600">
                    <mat-icon>drag_indicator</mat-icon>
                  </div>
                  <button type="button" (click)="removeQualification(i)" class="text-red-400 hover:text-red-600">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pr-12">
                  <div>
                    <label class="block text-xs font-medium text-emerald-900 mb-1">Institution</label>
                    <input type="text" formControlName="institution" class="w-full px-3 py-1.5 text-sm border border-emerald-200 rounded focus:ring-1 focus:ring-yellow-400 outline-none">
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-emerald-900 mb-1">Degree</label>
                    <input type="text" formControlName="degree" class="w-full px-3 py-1.5 text-sm border border-emerald-200 rounded focus:ring-1 focus:ring-yellow-400 outline-none">
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-xs font-medium text-emerald-900 mb-1">Field of Study</label>
                    <input type="text" formControlName="fieldOfStudy" class="w-full px-3 py-1.5 text-sm border border-emerald-200 rounded focus:ring-1 focus:ring-yellow-400 outline-none">
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-emerald-900 mb-1">Start Date</label>
                    <input type="text" formControlName="startDate" class="w-full px-3 py-1.5 text-sm border border-emerald-200 rounded focus:ring-1 focus:ring-yellow-400 outline-none">
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-emerald-900 mb-1">End Date</label>
                    <input type="text" formControlName="endDate" class="w-full px-3 py-1.5 text-sm border border-emerald-200 rounded focus:ring-1 focus:ring-yellow-400 outline-none">
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-xs font-medium text-emerald-900 mb-1">Marks / CGPA / Grade</label>
                    <input type="text" formControlName="grade" placeholder="e.g. 3.8 CGPA, 85%, A+" class="w-full px-3 py-1.5 text-sm border border-emerald-200 rounded focus:ring-1 focus:ring-yellow-400 outline-none">
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Skills -->
        <div [class.hidden]="currentStepIndex() !== 3" class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <div class="flex justify-between items-center border-b border-emerald-100 pb-2">
            <h2 class="text-lg font-semibold text-emerald-950 flex items-center gap-2">
              <mat-icon class="text-emerald-700">psychology</mat-icon> Skills
            </h2>
            <button type="button" (click)="addSkill()" class="text-sm text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1">
              <mat-icon class="text-sm w-4 h-4 leading-4">add</mat-icon> Add
            </button>
          </div>
          
          <div formArrayName="skills" cdkDropList (cdkDropListDropped)="dropSkill($event)" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            @for (skill of skillsControls; track skill; let i = $index) {
              <div [formGroupName]="i" cdkDrag class="bg-emerald-50/50 border border-emerald-100 rounded p-2 flex items-center gap-2">
                <div cdkDragHandle class="cursor-move text-emerald-400 hover:text-emerald-600">
                  <mat-icon class="text-sm w-4 h-4 leading-4">drag_indicator</mat-icon>
                </div>
                <input type="text" formControlName="name" placeholder="Skill name" class="flex-1 px-2 py-1 text-sm border border-emerald-200 rounded focus:ring-1 focus:ring-yellow-400 outline-none">
                <button type="button" (click)="removeSkill(i)" class="text-red-400 hover:text-red-600">
                  <mat-icon class="text-sm w-4 h-4 leading-4">close</mat-icon>
                </button>
              </div>
            }
          </div>
        </div>

        <!-- Projects -->
        <div [class.hidden]="currentStepIndex() !== 4" class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <div class="flex justify-between items-center border-b border-emerald-100 pb-2">
            <h2 class="text-lg font-semibold text-emerald-950 flex items-center gap-2">
              <mat-icon class="text-emerald-700">code</mat-icon> Projects
            </h2>
            <button type="button" (click)="addProject()" class="text-sm text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1">
              <mat-icon class="text-sm w-4 h-4 leading-4">add</mat-icon> Add
            </button>
          </div>
          
          <div formArrayName="projects" cdkDropList (cdkDropListDropped)="dropProject($event)" class="space-y-4">
            @for (proj of projectsControls; track proj; let i = $index) {
              <div [formGroupName]="i" cdkDrag class="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 relative group">
                <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div cdkDragHandle class="cursor-move text-emerald-400 hover:text-emerald-600">
                    <mat-icon>drag_indicator</mat-icon>
                  </div>
                  <button type="button" (click)="removeProject(i)" class="text-red-400 hover:text-red-600">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pr-12">
                  <div>
                    <label class="block text-xs font-medium text-emerald-900 mb-1">Project Name</label>
                    <input type="text" formControlName="name" class="w-full px-3 py-1.5 text-sm border border-emerald-200 rounded focus:ring-1 focus:ring-yellow-400 outline-none">
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-emerald-900 mb-1">URL</label>
                    <input type="text" formControlName="url" class="w-full px-3 py-1.5 text-sm border border-emerald-200 rounded focus:ring-1 focus:ring-yellow-400 outline-none">
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-xs font-medium text-emerald-900 mb-1">Description</label>
                    <textarea formControlName="description" rows="2" class="w-full px-3 py-1.5 text-sm border border-emerald-200 rounded focus:ring-1 focus:ring-yellow-400 outline-none resize-none"></textarea>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Languages -->
        <div [class.hidden]="currentStepIndex() !== 5" class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <div class="flex justify-between items-center border-b border-emerald-100 pb-2">
            <h2 class="text-lg font-semibold text-emerald-950 flex items-center gap-2">
              <mat-icon class="text-emerald-700">language</mat-icon> Languages
            </h2>
            <button type="button" (click)="addLanguage()" class="text-sm text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1">
              <mat-icon class="text-sm w-4 h-4 leading-4">add</mat-icon> Add
            </button>
          </div>
          
          <div formArrayName="languages" cdkDropList (cdkDropListDropped)="dropLanguage($event)" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            @for (lang of languagesControls; track lang; let i = $index) {
              <div [formGroupName]="i" cdkDrag class="bg-emerald-50/50 border border-emerald-100 rounded p-2 flex items-center gap-2">
                <div cdkDragHandle class="cursor-move text-emerald-400 hover:text-emerald-600">
                  <mat-icon class="text-sm w-4 h-4 leading-4">drag_indicator</mat-icon>
                </div>
                <input type="text" formControlName="name" placeholder="Language" class="flex-1 px-2 py-1 text-sm border border-emerald-200 rounded focus:ring-1 focus:ring-yellow-400 outline-none">
                <button type="button" (click)="removeLanguage(i)" class="text-red-400 hover:text-red-600">
                  <mat-icon class="text-sm w-4 h-4 leading-4">close</mat-icon>
                </button>
              </div>
            }
          </div>
        </div>

      </form>
      </div>

      <!-- Footer Navigation -->
      <div class="p-5 border-t border-emerald-100 bg-white shrink-0 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button type="button" 
                (click)="prevStep()" 
                [disabled]="currentStepIndex() === 0"
                class="px-5 py-2.5 rounded-xl font-bold text-emerald-700 hover:bg-emerald-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1">
          <mat-icon class="text-[20px] w-5 h-5 leading-5">chevron_left</mat-icon> Previous
        </button>
        
        <button type="button" 
                (click)="nextStep()" 
                [disabled]="currentStepIndex() === steps.length - 1"
                class="px-8 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 shadow-md shadow-emerald-600/20">
          Next <mat-icon class="text-[20px] w-5 h-5 leading-5">chevron_right</mat-icon>
        </button>
      </div>

    </div>
  `
})
export class ResumeFormComponent implements OnInit {
  resume = input.required<Resume>();
  
  steps = [
    { id: 'personal', title: 'Personal Info', icon: 'person' },
    { id: 'about', title: 'About', icon: 'article' },
    { id: 'qualifications', title: 'Qualifications', icon: 'school' },
    { id: 'skills', title: 'Skills', icon: 'psychology' },
    { id: 'projects', title: 'Projects', icon: 'code' },
    { id: 'languages', title: 'Languages', icon: 'language' },
    { id: 'settings', title: 'Design', icon: 'palette' }
  ];
  
  currentStepIndex = signal(0);
  resumeChange = output<Resume>();
  
  fb = inject(FormBuilder);
  
  form: FormGroup = this.fb.group({
    title: [''],
    templateId: [''],
    themeColor: [''],
    fontFamily: [''],
    textSize: [''],
    lineSpacing: [''],
    personalInfo: this.fb.group({
      fullName: [''],
      jobTitle: [''],
      email: [''],
      phone: [''],
      location: [''],
      website: [''],
      linkedin: [''],
      github: [''],
      photoUrl: ['']
    }),
    about: [''],
    qualifications: this.fb.array([]),
    skills: this.fb.array([]),
    projects: this.fb.array([]),
    languages: this.fb.array([])
  });

  lastEmittedResumeStr: string | null = null;

  constructor() {
    effect(() => {
      const currentResume = this.resume();
      if (currentResume) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { lastModified, ...rest } = currentResume;
        const currentStr = JSON.stringify(rest);
        
        if (currentStr === this.lastEmittedResumeStr) {
          return;
        }
        
        this.lastEmittedResumeStr = currentStr;
        this.patchForm(currentResume);
      }
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(val => {
      if (this.form.valid) {
        const updatedResume = { ...this.resume(), ...val };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { lastModified, ...rest } = updatedResume;
        this.lastEmittedResumeStr = JSON.stringify(rest);
        this.resumeChange.emit(updatedResume);
      }
    });
  }

  nextStep() {
    if (this.currentStepIndex() < this.steps.length - 1) {
      this.currentStepIndex.update(i => i + 1);
    }
  }

  prevStep() {
    if (this.currentStepIndex() > 0) {
      this.currentStepIndex.update(i => i - 1);
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const updatedPhotoUrl = e.target?.result as string;
        this.form.get('personalInfo.photoUrl')?.setValue(updatedPhotoUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  private syncFormArray<T>(array: FormArray, data: T[], createGroupFn: (data: T) => FormGroup) {
    while (array.length > data.length) {
      array.removeAt(array.length - 1, { emitEvent: false });
    }
    while (array.length < data.length) {
      array.push(createGroupFn(data[array.length]), { emitEvent: false });
    }
  }

  patchForm(resume: Resume) {
    this.syncFormArray(this.qualificationsArray, resume.qualifications, this.createQualificationGroup.bind(this));
    this.syncFormArray(this.skillsArray, resume.skills, this.createSkillGroup.bind(this));
    this.syncFormArray(this.projectsArray, resume.projects, this.createProjectGroup.bind(this));
    this.syncFormArray(this.languagesArray, resume.languages, this.createLanguageGroup.bind(this));

    this.form.patchValue({
      title: resume.title,
      templateId: resume.templateId,
      themeColor: resume.themeColor,
      fontFamily: resume.fontFamily,
      textSize: resume.textSize,
      lineSpacing: resume.lineSpacing,
      personalInfo: resume.personalInfo,
      about: resume.about,
      qualifications: resume.qualifications,
      skills: resume.skills,
      projects: resume.projects,
      languages: resume.languages
    }, { emitEvent: false });
  }

  get qualificationsArray() { return this.form.get('qualifications') as FormArray; }
  get skillsArray() { return this.form.get('skills') as FormArray; }
  get projectsArray() { return this.form.get('projects') as FormArray; }
  get languagesArray() { return this.form.get('languages') as FormArray; }

  get qualificationsControls() { return this.qualificationsArray.controls; }
  get skillsControls() { return this.skillsArray.controls; }
  get projectsControls() { return this.projectsArray.controls; }
  get languagesControls() { return this.languagesArray.controls; }

  createQualificationGroup(qual?: Partial<Qualification>) {
    return this.fb.group({
      id: [qual?.id || 'qual_' + Math.random().toString(36).substr(2, 9)],
      institution: [qual?.institution || ''],
      degree: [qual?.degree || ''],
      fieldOfStudy: [qual?.fieldOfStudy || ''],
      startDate: [qual?.startDate || ''],
      endDate: [qual?.endDate || ''],
      current: [qual?.current || false],
      description: [qual?.description || ''],
      grade: [qual?.grade || '']
    });
  }

  createSkillGroup(skill?: Partial<Skill>) {
    return this.fb.group({
      id: [skill?.id || 'skill_' + Math.random().toString(36).substr(2, 9)],
      name: [skill?.name || ''],
      level: [skill?.level || 'Intermediate']
    });
  }

  createProjectGroup(proj?: Partial<Project>) {
    return this.fb.group({
      id: [proj?.id || 'proj_' + Math.random().toString(36).substr(2, 9)],
      name: [proj?.name || ''],
      description: [proj?.description || ''],
      url: [proj?.url || ''],
      technologies: [proj?.technologies || []]
    });
  }

  createLanguageGroup(lang?: Partial<Language>) {
    return this.fb.group({
      id: [lang?.id || 'lang_' + Math.random().toString(36).substr(2, 9)],
      name: [lang?.name || ''],
      proficiency: [lang?.proficiency || 'Fluent']
    });
  }

  addQualification() { this.qualificationsArray.push(this.createQualificationGroup()); }
  removeQualification(index: number) { this.qualificationsArray.removeAt(index); }
  
  addSkill() { this.skillsArray.push(this.createSkillGroup()); }
  removeSkill(index: number) { this.skillsArray.removeAt(index); }
  
  addProject() { this.projectsArray.push(this.createProjectGroup()); }
  removeProject(index: number) { this.projectsArray.removeAt(index); }
  
  addLanguage() { this.languagesArray.push(this.createLanguageGroup()); }
  removeLanguage(index: number) { this.languagesArray.removeAt(index); }

  dropQualification(event: CdkDragDrop<unknown[]>) {
    moveItemInArray(this.qualificationsArray.controls, event.previousIndex, event.currentIndex);
    this.qualificationsArray.updateValueAndValidity();
  }
  
  dropSkill(event: CdkDragDrop<unknown[]>) {
    moveItemInArray(this.skillsArray.controls, event.previousIndex, event.currentIndex);
    this.skillsArray.updateValueAndValidity();
  }
  
  dropProject(event: CdkDragDrop<unknown[]>) {
    moveItemInArray(this.projectsArray.controls, event.previousIndex, event.currentIndex);
    this.projectsArray.updateValueAndValidity();
  }
  
  dropLanguage(event: CdkDragDrop<unknown[]>) {
    moveItemInArray(this.languagesArray.controls, event.previousIndex, event.currentIndex);
    this.languagesArray.updateValueAndValidity();
  }
}
