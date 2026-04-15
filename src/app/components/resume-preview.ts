import { Component, input, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resume } from '../models/resume.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  styles: [`
    .pdf-text-white { color: #ffffff; }
    .pdf-bg-white { background-color: #ffffff; }
    .pdf-border-white-20 { border-color: rgba(255, 255, 255, 0.2); }
    .pdf-bg-white-20 { background-color: rgba(255, 255, 255, 0.2); }
    
    .pdf-text-slate-400 { color: #94a3b8; }
    .pdf-text-slate-500 { color: #64748b; }
    .pdf-text-slate-600 { color: #475569; }
    .pdf-text-slate-700 { color: #334155; }
    .pdf-text-slate-800 { color: #1e293b; }
    .pdf-text-slate-900 { color: #0f172a; }
    
    .pdf-bg-slate-100 { background-color: #f1f5f9; }
    .pdf-bg-slate-400 { background-color: #94a3b8; }
    
    .pdf-border-slate-200 { border-color: #e2e8f0; }
    
    .pdf-text-blue-500 { color: #3b82f6; }
    .pdf-text-blue-600 { color: #2563eb; }
    
    .pdf-shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1); }
    .pdf-shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
  `],
  template: `
    <div class="bg-slate-100 h-full overflow-auto p-4 md:p-8 flex justify-center items-start">
      <!-- The A4 Page Container -->
      <div #resumePage id="resume-page" class="pdf-bg-white pdf-shadow-2xl w-[210mm] min-h-[297mm] shrink-0 relative overflow-hidden" 
           [ngStyle]="{'font-family': resume().fontFamily, 'font-size': resume().textSize, 'line-height': resume().lineSpacing}">
        
        @switch (resume().templateId) {
          @case ('modern') {
            <div class="flex h-full min-h-[297mm]">
              <!-- Left Column -->
              <div class="w-1/3 pdf-text-white p-8" [ngStyle]="{'background-color': resume().themeColor}">
                
                @if (resume().personalInfo.photoUrl) {
                  <div class="w-32 h-32 rounded-full overflow-hidden border-4 pdf-border-white-20 mx-auto mb-8 pdf-shadow-lg">
                    <img [src]="resume().personalInfo.photoUrl" alt="Profile Photo" class="w-full h-full object-cover">
                  </div>
                }

                <div class="space-y-6">
                  <!-- Contact -->
                  <div>
                    <h3 class="text-sm font-bold uppercase tracking-wider mb-3 border-b pdf-border-white-20 pb-1">Contact</h3>
                    <div class="space-y-2 text-sm opacity-90">
                      @if (resume().personalInfo.email) {
                        <div class="flex items-center gap-2"><mat-icon class="text-sm w-4 h-4 leading-4">email</mat-icon> <span class="break-all">{{ resume().personalInfo.email }}</span></div>
                      }
                      @if (resume().personalInfo.phone) {
                        <div class="flex items-center gap-2"><mat-icon class="text-sm w-4 h-4 leading-4">phone</mat-icon> {{ resume().personalInfo.phone }}</div>
                      }
                      @if (resume().personalInfo.location) {
                        <div class="flex items-center gap-2"><mat-icon class="text-sm w-4 h-4 leading-4">location_on</mat-icon> {{ resume().personalInfo.location }}</div>
                      }
                      @if (resume().personalInfo.linkedin) {
                        <div class="flex items-center gap-2"><mat-icon class="text-sm w-4 h-4 leading-4">link</mat-icon> {{ resume().personalInfo.linkedin }}</div>
                      }
                      @if (resume().personalInfo.github) {
                        <div class="flex items-center gap-2"><mat-icon class="text-sm w-4 h-4 leading-4">code</mat-icon> {{ resume().personalInfo.github }}</div>
                      }
                      @if (resume().personalInfo.website) {
                        <div class="flex items-center gap-2"><mat-icon class="text-sm w-4 h-4 leading-4">language</mat-icon> {{ resume().personalInfo.website }}</div>
                      }
                    </div>
                  </div>

                  <!-- Skills -->
                  @if (resume().skills.length > 0) {
                    <div>
                      <h3 class="text-sm font-bold uppercase tracking-wider mb-3 border-b pdf-border-white-20 pb-1">Skills</h3>
                      <div class="space-y-2">
                        @for (skill of resume().skills; track skill.id) {
                          <div>
                            <div class="flex justify-between text-sm mb-1">
                              <span>{{ skill.name }}</span>
                              <span class="opacity-75 text-xs">{{ skill.level }}</span>
                            </div>
                            <div class="w-full pdf-bg-white-20 rounded-full h-1.5">
                              <div class="pdf-bg-white h-1.5 rounded-full" [style.width]="getSkillWidth(skill.level)"></div>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  }

                  <!-- Languages -->
                  @if (resume().languages.length > 0) {
                    <div>
                      <h3 class="text-sm font-bold uppercase tracking-wider mb-3 border-b pdf-border-white-20 pb-1">Languages</h3>
                      <div class="space-y-2 text-sm opacity-90">
                        @for (lang of resume().languages; track lang.id) {
                          <div class="flex justify-between">
                            <span>{{ lang.name }}</span>
                            <span class="opacity-75">{{ lang.proficiency }}</span>
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- Right Column -->
              <div class="w-2/3 p-8 pdf-text-slate-800">
                <!-- Header -->
                <div class="mb-8">
                  <h1 class="text-4xl font-bold leading-tight mb-2 uppercase tracking-tight" [ngStyle]="{'color': resume().themeColor}">{{ resume().personalInfo.fullName || 'Your Name' }}</h1>
                  <h2 class="text-xl opacity-90 uppercase tracking-widest pdf-text-slate-500">{{ resume().personalInfo.jobTitle || 'Job Title' }}</h2>
                </div>

                <!-- Summary -->
                @if (resume().about) {
                  <div class="mb-8">
                    <h3 class="text-lg font-bold uppercase tracking-wider mb-3 border-b-2 pb-1 inline-block" [ngStyle]="{'border-color': resume().themeColor, 'color': resume().themeColor}">About Me</h3>
                    <p class="leading-relaxed pdf-text-slate-600 whitespace-pre-line">{{ resume().about }}</p>
                  </div>
                }

                <!-- Qualifications -->
                @if (resume().qualifications.length > 0) {
                  <div class="mb-8">
                    <h3 class="text-lg font-bold uppercase tracking-wider mb-4 border-b-2 pb-1 inline-block" [ngStyle]="{'border-color': resume().themeColor, 'color': resume().themeColor}">Qualifications</h3>
                    <div class="space-y-5">
                      @for (qual of resume().qualifications; track qual.id) {
                        <div class="relative pl-4 border-l-2" [ngStyle]="{'border-color': resume().themeColor}">
                          <div class="absolute w-3 h-3 rounded-full -left-[7px] top-1.5" [ngStyle]="{'background-color': resume().themeColor}"></div>
                          <div class="flex justify-between items-baseline mb-1">
                            <h4 class="font-bold pdf-text-slate-800">{{ qual.degree }} in {{ qual.fieldOfStudy }}</h4>
                            <span class="text-xs font-medium pdf-text-slate-500">{{ qual.startDate }} - {{ qual.current ? 'Present' : qual.endDate }}</span>
                          </div>
                          <div class="font-medium pdf-text-slate-600 mb-2">{{ qual.institution }}</div>
                          <p class="pdf-text-slate-600 leading-relaxed whitespace-pre-line">{{ qual.description }}</p>
                        </div>
                      }
                    </div>
                  </div>
                }

                <!-- Projects -->
                @if (resume().projects.length > 0) {
                  <div class="mb-8">
                    <h3 class="text-lg font-bold uppercase tracking-wider mb-4 border-b-2 pb-1 inline-block" [ngStyle]="{'border-color': resume().themeColor, 'color': resume().themeColor}">Projects</h3>
                    <div class="space-y-5">
                      @for (proj of resume().projects; track proj.id) {
                        <div>
                          <div class="flex justify-between items-baseline mb-1">
                            <h4 class="font-bold pdf-text-slate-800">{{ proj.name }}</h4>
                            @if (proj.url) {
                              <a [href]="proj.url" class="text-xs pdf-text-blue-600">{{ proj.url }}</a>
                            }
                          </div>
                          <p class="pdf-text-slate-600 leading-relaxed whitespace-pre-line">{{ proj.description }}</p>
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          @case ('professional') {
            <div class="p-12 pdf-text-slate-900 min-h-[297mm]">
              <!-- Header -->
              <div class="text-center mb-8 border-b-4 pb-6" [ngStyle]="{'border-color': resume().themeColor}">
                @if (resume().personalInfo.photoUrl) {
                  <div class="w-24 h-24 rounded-full overflow-hidden border-2 pdf-border-slate-200 mx-auto mb-4">
                    <img [src]="resume().personalInfo.photoUrl" alt="Profile Photo" class="w-full h-full object-cover">
                  </div>
                }
                <h1 class="text-4xl font-serif font-bold mb-2 uppercase tracking-wider" [ngStyle]="{'color': resume().themeColor}">{{ resume().personalInfo.fullName || 'Your Name' }}</h1>
                <h2 class="text-xl pdf-text-slate-600 mb-4 uppercase tracking-widest">{{ resume().personalInfo.jobTitle || 'Job Title' }}</h2>
                
                <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm pdf-text-slate-600">
                  @if (resume().personalInfo.email) { <span class="flex items-center gap-1"><mat-icon class="text-[16px] w-4 h-4 leading-4">email</mat-icon> {{ resume().personalInfo.email }}</span> }
                  @if (resume().personalInfo.phone) { <span class="flex items-center gap-1"><mat-icon class="text-[16px] w-4 h-4 leading-4">phone</mat-icon> {{ resume().personalInfo.phone }}</span> }
                  @if (resume().personalInfo.location) { <span class="flex items-center gap-1"><mat-icon class="text-[16px] w-4 h-4 leading-4">location_on</mat-icon> {{ resume().personalInfo.location }}</span> }
                  @if (resume().personalInfo.linkedin) { <span class="flex items-center gap-1"><mat-icon class="text-[16px] w-4 h-4 leading-4">link</mat-icon> {{ resume().personalInfo.linkedin }}</span> }
                  @if (resume().personalInfo.github) { <span class="flex items-center gap-1"><mat-icon class="text-[16px] w-4 h-4 leading-4">code</mat-icon> {{ resume().personalInfo.github }}</span> }
                  @if (resume().personalInfo.website) { <span class="flex items-center gap-1"><mat-icon class="text-[16px] w-4 h-4 leading-4">language</mat-icon> {{ resume().personalInfo.website }}</span> }
                </div>
              </div>

              <!-- Summary -->
              @if (resume().about) {
                <div class="mb-6">
                  <h3 class="text-lg font-bold uppercase tracking-wider mb-2 border-b pdf-border-slate-200 pb-1 flex items-center gap-2" [ngStyle]="{'color': resume().themeColor}">
                    <mat-icon>person</mat-icon> Professional Summary
                  </h3>
                  <p class="leading-relaxed pdf-text-slate-700 whitespace-pre-line">{{ resume().about }}</p>
                </div>
              }

              <!-- Qualifications -->
              @if (resume().qualifications.length > 0) {
                <div class="mb-6">
                  <h3 class="text-lg font-bold uppercase tracking-wider mb-3 border-b pdf-border-slate-200 pb-1 flex items-center gap-2" [ngStyle]="{'color': resume().themeColor}">
                    <mat-icon>school</mat-icon> Qualifications
                  </h3>
                  <div class="space-y-4">
                    @for (qual of resume().qualifications; track qual.id) {
                      <div>
                        <div class="flex justify-between items-baseline">
                          <h4 class="font-bold pdf-text-slate-900 text-base">{{ qual.degree }} in {{ qual.fieldOfStudy }}</h4>
                          <span class="text-sm font-medium pdf-text-slate-600">{{ qual.startDate }} - {{ qual.current ? 'Present' : qual.endDate }}</span>
                        </div>
                        <div class="font-medium pdf-text-slate-700 italic mb-1">{{ qual.institution }}</div>
                        <p class="pdf-text-slate-700 leading-relaxed whitespace-pre-line">{{ qual.description }}</p>
                      </div>
                    }
                  </div>
                </div>
              }

              <div class="grid grid-cols-2 gap-8 mb-6">
                <!-- Skills -->
                @if (resume().skills.length > 0) {
                  <div>
                    <h3 class="text-lg font-bold uppercase tracking-wider mb-3 border-b pdf-border-slate-200 pb-1 flex items-center gap-2" [ngStyle]="{'color': resume().themeColor}">
                      <mat-icon>psychology</mat-icon> Skills
                    </h3>
                    <div class="flex flex-wrap gap-2">
                      @for (skill of resume().skills; track skill.id) {
                        <span class="text-sm pdf-text-slate-700 pdf-bg-slate-100 px-2 py-1 rounded border pdf-border-slate-200">{{ skill.name }}</span>
                      }
                    </div>
                  </div>
                }

                <!-- Languages -->
                @if (resume().languages.length > 0) {
                  <div>
                    <h3 class="text-lg font-bold uppercase tracking-wider mb-3 border-b pdf-border-slate-200 pb-1 flex items-center gap-2" [ngStyle]="{'color': resume().themeColor}">
                      <mat-icon>language</mat-icon> Languages
                    </h3>
                    <ul class="space-y-2 pdf-text-slate-700">
                      @for (lang of resume().languages; track lang.id) {
                        <li class="flex justify-between border-b pdf-border-slate-200 pb-1">
                          <span class="font-medium">{{ lang.name }}</span>
                          <span class="pdf-text-slate-500">{{ lang.proficiency }}</span>
                        </li>
                      }
                    </ul>
                  </div>
                }
              </div>

              <!-- Projects -->
              @if (resume().projects.length > 0) {
                <div>
                  <h3 class="text-lg font-bold uppercase tracking-wider mb-3 border-b pdf-border-slate-200 pb-1 flex items-center gap-2" [ngStyle]="{'color': resume().themeColor}">
                    <mat-icon>code</mat-icon> Projects
                  </h3>
                  <div class="grid grid-cols-2 gap-6">
                    @for (proj of resume().projects; track proj.id) {
                      <div class="pdf-bg-slate-100 p-4 rounded-lg border pdf-border-slate-200">
                        <h4 class="font-bold pdf-text-slate-800 mb-1">{{ proj.name }}</h4>
                        <p class="pdf-text-slate-600 text-sm mb-2 whitespace-pre-line">{{ proj.description }}</p>
                        @if (proj.url) {
                          <a [href]="proj.url" class="text-xs pdf-text-blue-600 break-all">{{ proj.url }}</a>
                        }
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          }

          @case ('minimal') {
            <div class="p-14 pdf-text-slate-800 min-h-[297mm]">
              <div class="flex items-center gap-8 mb-12">
                @if (resume().personalInfo.photoUrl) {
                  <div class="w-28 h-28 rounded-xl overflow-hidden shrink-0">
                    <img [src]="resume().personalInfo.photoUrl" alt="Profile Photo" class="w-full h-full object-cover grayscale">
                  </div>
                }
                <div>
                  <h1 class="text-5xl font-light tracking-tight mb-2" [ngStyle]="{'color': resume().themeColor}">
                    {{ resume().personalInfo.fullName || 'Your Name' }}
                  </h1>
                  <h2 class="text-xl font-medium tracking-wide pdf-text-slate-500">{{ resume().personalInfo.jobTitle || 'Professional Title' }}</h2>
                </div>
              </div>

              <div class="grid grid-cols-12 gap-10">
                <!-- Left Sidebar -->
                <div class="col-span-4 space-y-8">
                  <div>
                    <h3 class="text-xs font-bold uppercase tracking-widest pdf-text-slate-400 mb-4">Contact</h3>
                    <ul class="space-y-3 text-sm pdf-text-slate-600">
                      @if (resume().personalInfo.email) { <li>{{ resume().personalInfo.email }}</li> }
                      @if (resume().personalInfo.phone) { <li>{{ resume().personalInfo.phone }}</li> }
                      @if (resume().personalInfo.location) { <li>{{ resume().personalInfo.location }}</li> }
                      @if (resume().personalInfo.linkedin) { <li>{{ resume().personalInfo.linkedin }}</li> }
                      @if (resume().personalInfo.github) { <li>{{ resume().personalInfo.github }}</li> }
                      @if (resume().personalInfo.website) { <li>{{ resume().personalInfo.website }}</li> }
                    </ul>
                  </div>

                  @if (resume().skills.length > 0) {
                    <div>
                      <h3 class="text-xs font-bold uppercase tracking-widest pdf-text-slate-400 mb-4">Skills</h3>
                      <ul class="space-y-2 text-sm pdf-text-slate-700 font-medium">
                        @for (skill of resume().skills; track skill.id) {
                          <li>{{ skill.name }} <span class="pdf-text-slate-400 font-normal text-xs ml-1">({{ skill.level }})</span></li>
                        }
                      </ul>
                    </div>
                  }

                  @if (resume().languages.length > 0) {
                    <div>
                      <h3 class="text-xs font-bold uppercase tracking-widest pdf-text-slate-400 mb-4">Languages</h3>
                      <ul class="space-y-2 text-sm pdf-text-slate-700">
                        @for (lang of resume().languages; track lang.id) {
                          <li>{{ lang.name }} <span class="pdf-text-slate-400 ml-1">{{ lang.proficiency }}</span></li>
                        }
                      </ul>
                    </div>
                  }
                </div>

                <!-- Main Content -->
                <div class="col-span-8 space-y-10">
                  @if (resume().about) {
                    <div>
                      <h3 class="text-xs font-bold uppercase tracking-widest pdf-text-slate-400 mb-4">About</h3>
                      <p class="pdf-text-slate-700 leading-relaxed whitespace-pre-line">{{ resume().about }}</p>
                    </div>
                  }

                  @if (resume().qualifications.length > 0) {
                    <div>
                      <h3 class="text-xs font-bold uppercase tracking-widest pdf-text-slate-400 mb-6">Qualifications</h3>
                      <div class="space-y-8">
                        @for (qual of resume().qualifications; track qual.id) {
                          <div class="relative">
                            <div class="absolute -left-4 top-2 w-1 h-1 rounded-full" [ngStyle]="{'background-color': resume().themeColor}"></div>
                            <div class="flex justify-between items-baseline mb-1">
                              <h4 class="font-semibold pdf-text-slate-900">{{ qual.degree }} - {{ qual.fieldOfStudy }}</h4>
                              <span class="text-xs pdf-text-slate-400">{{ qual.startDate }} — {{ qual.current ? 'Present' : qual.endDate }}</span>
                            </div>
                            <div class="font-medium mb-2" [ngStyle]="{'color': resume().themeColor}">{{ qual.institution }}</div>
                            <p class="text-sm pdf-text-slate-600 leading-relaxed whitespace-pre-line">{{ qual.description }}</p>
                          </div>
                        }
                      </div>
                    </div>
                  }

                  @if (resume().projects.length > 0) {
                    <div>
                      <h3 class="text-xs font-bold uppercase tracking-widest pdf-text-slate-400 mb-6">Projects</h3>
                      <div class="space-y-6">
                        @for (proj of resume().projects; track proj.id) {
                          <div>
                            <h4 class="font-semibold pdf-text-slate-900 mb-1">{{ proj.name }}</h4>
                            <p class="text-sm pdf-text-slate-600 leading-relaxed mb-1 whitespace-pre-line">{{ proj.description }}</p>
                            @if (proj.url) {
                              <a [href]="proj.url" class="text-xs pdf-text-blue-500 hover:underline">{{ proj.url }}</a>
                            }
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        }
      </div>
    </div>
  `
})
export class ResumePreviewComponent {
  resume = input.required<Resume>();
  @ViewChild('resumePage') resumePage!: ElementRef;

  getSkillWidth(level: string): string {
    switch (level) {
      case 'Beginner': return '25%';
      case 'Intermediate': return '50%';
      case 'Advanced': return '75%';
      case 'Expert': return '100%';
      default: return '50%';
    }
  }
}
