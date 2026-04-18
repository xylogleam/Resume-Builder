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
      <div #resumePage id="resume-page" class="pdf-bg-white pdf-shadow-2xl w-[210mm] min-h-[297mm] shrink-0 relative overflow-hidden break-words" 
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
                      <div class="flex flex-wrap gap-2">
                        @for (skill of resume().skills; track skill.id) {
                          <span class="text-sm px-2 py-1 rounded pdf-bg-white-20">{{ skill.name }}</span>
                        }
                      </div>
                    </div>
                  }

                  <!-- Languages -->
                  @if (resume().languages.length > 0) {
                    <div>
                      <h3 class="text-sm font-bold uppercase tracking-wider mb-3 border-b pdf-border-white-20 pb-1">Languages</h3>
                      <div class="flex flex-wrap gap-2">
                        @for (lang of resume().languages; track lang.id) {
                          <span class="text-sm px-2 py-1 rounded pdf-bg-white-20">{{ lang.name }}</span>
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
                          <div class="font-medium pdf-text-slate-600 mb-2">
                            {{ qual.institution }}
                            @if (qual.grade) {
                              <span class="ml-2 text-xs font-semibold px-2 py-0.5 rounded pdf-bg-slate-100 border pdf-border-slate-200">{{ qual.grade }}</span>
                            }
                          </div>
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
                        <div class="font-medium pdf-text-slate-700 italic mb-1 flex justify-between items-baseline">
                          <span>{{ qual.institution }}</span>
                          @if (qual.grade) {
                            <span class="not-italic text-sm font-semibold opacity-75">Grade: {{ qual.grade }}</span>
                          }
                        </div>
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
                    <div class="flex flex-wrap gap-2">
                       @for (lang of resume().languages; track lang.id) {
                        <span class="text-sm pdf-text-slate-700 pdf-bg-slate-100 px-2 py-1 rounded border pdf-border-slate-200">{{ lang.name }}</span>
                      }
                    </div>
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

          @case ('creative') {
            <div class="flex h-full min-h-[297mm]">
              <!-- Left Column -->
              <div class="w-[35%] p-8 flex flex-col" [ngStyle]="{'background-color': '#333333'}">
                @if (resume().personalInfo.photoUrl) {
                  <div class="w-40 h-40 rounded-full overflow-hidden border-8 mx-auto mb-6" [ngStyle]="{'border-color': resume().themeColor}">
                    <img [src]="resume().personalInfo.photoUrl" alt="Profile Photo" class="w-full h-full object-cover">
                  </div>
                }
                <div class="text-center mb-8">
                  <h1 class="text-3xl font-bold text-white uppercase tracking-wider leading-tight mb-1">{{ resume().personalInfo.fullName || 'YOUR NAME' }}</h1>
                  <h2 class="text-sm text-gray-400 font-light">{{ resume().personalInfo.jobTitle || 'Professional Title' }}</h2>
                </div>

                <div class="space-y-8 flex-grow">
                  @if (resume().languages.length > 0) {
                    <div>
                      <div class="px-4 py-2 font-bold mb-4 rounded" [ngStyle]="{'background-color': resume().themeColor, 'color': '#333333'}">LANGUAGE SKILL</div>
                      <div class="space-y-1 text-white text-sm list-inside list-disc px-2 py-1">
                        @for (lang of resume().languages; track lang.id) {
                          <li class="uppercase font-semibold tracking-wide flex-wrap">{{ lang.name }}</li>
                        }
                      </div>
                    </div>
                  }

                  @if (resume().skills.length > 0) {
                    <div>
                      <div class="px-4 py-2 font-bold mb-4 rounded" [ngStyle]="{'background-color': resume().themeColor, 'color': '#333333'}">KEY SKILLS</div>
                      <ul class="list-disc list-inside space-y-1 px-2 text-white text-sm">
                        @for (skill of resume().skills; track skill.id) {
                          <li>{{ skill.name }}</li>
                        }
                      </ul>
                    </div>
                  }
                  
                  @if (resume().projects.length > 0) {
                    <div>
                      <div class="px-4 py-2 font-bold mb-4 rounded" [ngStyle]="{'background-color': resume().themeColor, 'color': '#333333'}">PROJECTS</div>
                      <ul class="list-disc list-inside space-y-1 px-2 text-white text-sm">
                        @for (proj of resume().projects; track proj.id) {
                          <li>{{ proj.name }}</li>
                        }
                      </ul>
                    </div>
                  }
                </div>

                <div class="pt-8 mt-8 border-t border-gray-600 space-y-3 text-white text-xs">
                  @if (resume().personalInfo.phone) { <div class="flex items-center gap-3"><mat-icon class="text-[18px] w-5 h-5 rounded-full p-0.5 text-black" [ngStyle]="{'background-color': resume().themeColor}">phone</mat-icon> {{ resume().personalInfo.phone }}</div> }
                  @if (resume().personalInfo.email) { <div class="flex items-center gap-3"><mat-icon class="text-[18px] w-5 h-5 rounded-full p-0.5 text-black" [ngStyle]="{'background-color': resume().themeColor}">email</mat-icon> <span class="break-all">{{ resume().personalInfo.email }}</span></div> }
                  @if (resume().personalInfo.location) { <div class="flex items-center gap-3"><mat-icon class="text-[18px] w-5 h-5 rounded-full p-0.5 text-black" [ngStyle]="{'background-color': resume().themeColor}">location_on</mat-icon> {{ resume().personalInfo.location }}</div> }
                  @if (resume().personalInfo.linkedin) { <div class="flex items-center gap-3"><mat-icon class="text-[18px] w-5 h-5 rounded-full p-0.5 text-black" [ngStyle]="{'background-color': resume().themeColor}">link</mat-icon> <span class="break-all">{{ resume().personalInfo.linkedin }}</span></div> }
                </div>
              </div>

              <!-- Right Column -->
              <div class="w-[65%] p-10 bg-white space-y-8">
                @if (resume().about) {
                  <div>
                    <div class="px-6 py-2 py-3 rounded-full font-bold text-white inline-block mb-4" [ngStyle]="{'background-color': '#333333'}">PROFESSIONAL SUMMARY</div>
                    <p class="text-sm text-gray-700 leading-relaxed">{{ resume().about }}</p>
                  </div>
                }

                @if (resume().qualifications.length > 0) {
                  <div>
                    <div class="px-6 py-2 py-3 rounded-full font-bold text-white inline-block mb-6" [ngStyle]="{'background-color': '#333333'}">EDUCATION</div>
                    <div class="space-y-4">
                      @for (qual of resume().qualifications; track qual.id) {
                        <div class="text-center w-full">
                          <div class="font-bold text-gray-900 text-md">({{ qual.startDate }} — {{ qual.current ? 'Present' : qual.endDate }}) {{ qual.institution }} </div>
                          <div class="text-sm text-gray-600">
                            {{ qual.degree }} in {{ qual.fieldOfStudy }}
                            @if (qual.grade) { <span class="ml-1 font-semibold text-gray-800">| {{ qual.grade }}</span> }
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          @case ('elegant') {
            <div class="flex h-full min-h-[297mm]">
              <!-- Left Column -->
              <div class="w-[30%] p-8 bg-orange-50 border-r border-orange-100 flex flex-col items-center">
                @if (resume().personalInfo.photoUrl) {
                  <div class="w-40 h-40 rounded-full overflow-hidden border border-gray-300 shadow-md mb-8">
                    <img [src]="resume().personalInfo.photoUrl" alt="Profile Photo" class="w-full h-full object-cover">
                  </div>
                }
                
                <div class="w-full space-y-8 mt-4">
                  @if (resume().skills.length > 0) {
                    <div>
                      <h3 class="font-bold text-lg mb-3 uppercase tracking-wider text-gray-900">SKILLS</h3>
                      <ul class="space-y-2 text-sm text-gray-700">
                        @for (skill of resume().skills; track skill.id) {
                          <li class="flex items-start gap-2">
                            <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-900 shrink-0"></span>
                            <span>{{ skill.name }}</span>
                          </li>
                        }
                      </ul>
                    </div>
                  }

                  @if (resume().qualifications.length > 0) {
                    <div>
                      <h3 class="font-bold text-lg mb-3 uppercase tracking-wider text-gray-900">EDUCATION</h3>
                      <div class="space-y-4">
                        @for (qual of resume().qualifications; track qual.id) {
                          <div>
                            <div class="font-bold text-sm uppercase text-gray-800">{{ qual.institution }}</div>
                            <div class="text-sm text-gray-700">
                                <span class="w-1 h-1 bg-gray-600 rounded-full inline-block mr-1"></span>
                                {{ qual.degree }} in {{ qual.fieldOfStudy }}
                                @if(qual.grade) { <span class="font-semibold text-gray-800 ml-1">[{{ qual.grade }}]</span> }
                                <br/><span class="ml-3">{{ qual.startDate }} - {{ qual.current ? 'Present' : qual.endDate }}</span>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  }
                  
                  @if (resume().languages.length > 0) {
                    <div>
                      <h3 class="font-bold text-lg mb-3 uppercase tracking-wider text-gray-900">LANGUAGES</h3>
                      <div class="flex flex-wrap gap-2">
                        @for (lang of resume().languages; track lang.id) {
                          <span class="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">{{ lang.name }}</span>
                        }
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- Right Column -->
              <div class="w-[70%] p-10 bg-white">
                <div class="mb-10">
                  <h1 class="text-5xl font-light mb-2 text-gray-900">{{ resume().personalInfo.fullName || 'Your Name' }}</h1>
                  <h2 class="text-xl tracking-widest uppercase mb-6 text-gray-700">{{ resume().personalInfo.jobTitle || 'Professional Title' }}</h2>
                  
                  <div class="space-y-1 text-sm text-gray-700">
                    @if (resume().personalInfo.phone) { <div class="flex items-center gap-2"><mat-icon class="text-[16px] w-4 h-4 text-black">phone</mat-icon> {{ resume().personalInfo.phone }}</div> }
                    @if (resume().personalInfo.email) { <div class="flex items-center gap-2"><mat-icon class="text-[16px] w-4 h-4 text-black">location_on</mat-icon> <span class="break-all">{{ resume().personalInfo.email }}</span></div> }
                    @if (resume().personalInfo.location) { <div class="flex items-center gap-2"><mat-icon class="text-[16px] w-4 h-4 text-black">email</mat-icon> {{ resume().personalInfo.location }}</div> }
                  </div>
                </div>

                <div class="space-y-8">
                  @if (resume().about) {
                    <div>
                      <h3 class="font-bold text-xl mb-3 uppercase tracking-wider text-gray-900">SUMMARY</h3>
                      <p class="text-sm text-gray-700 leading-relaxed text-justify">{{ resume().about }}</p>
                    </div>
                  }
                </div>
              </div>
            </div>
          }

          @case ('corporate') {
            <div class="flex h-full min-h-[297mm]">
              <!-- Left Column -->
              <div class="w-[35%] flex flex-col bg-teal-50" [ngStyle]="{'background-color': 'rgba(15, 118, 110, 0.1)'}">
                <div class="px-8 pt-12 pb-8 w-full flex justify-center bg-teal-600" [ngStyle]="{'background-color': resume().themeColor}">
                  @if (resume().personalInfo.photoUrl) {
                    <div class="w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img [src]="resume().personalInfo.photoUrl" alt="Profile Photo" class="w-full h-full object-cover">
                    </div>
                  } @else {
                    <div class="w-44 h-44 rounded-full border-4 border-white bg-gray-200"></div>
                  }
                </div>

                <div class="p-8 space-y-8">
                  <div>
                    <h3 class="text-sm font-bold text-white mb-4 pl-3 py-1 uppercase border-l-2 border-white" [ngStyle]="{'background-color': resume().themeColor}">CONTACT</h3>
                    <div class="space-y-3 text-sm text-gray-800">
                      @if (resume().personalInfo.email) { <div class="flex items-center gap-3"><mat-icon class="text-[18px] w-5 h-5 rounded-full text-white p-0.5 bg-teal-600" [ngStyle]="{'background-color': resume().themeColor}">email</mat-icon> <span class="break-all">{{ resume().personalInfo.email }}</span></div> }
                      @if (resume().personalInfo.phone) { <div class="flex items-center gap-3"><mat-icon class="text-[18px] w-5 h-5 rounded-full text-white p-0.5 bg-teal-600" [ngStyle]="{'background-color': resume().themeColor}">phone</mat-icon> {{ resume().personalInfo.phone }}</div> }
                      @if (resume().personalInfo.location) { <div class="flex items-center gap-3"><mat-icon class="text-[18px] w-5 h-5 rounded-full text-white p-0.5 bg-teal-600" [ngStyle]="{'background-color': resume().themeColor}">public</mat-icon> {{ resume().personalInfo.location }}</div> }
                    </div>
                  </div>

                  @if (resume().skills.length > 0) {
                    <div>
                      <h3 class="text-sm font-bold text-white mb-4 pl-3 py-1 uppercase border-l-2 border-white bg-teal-600" [ngStyle]="{'background-color': resume().themeColor}">SKILLS</h3>
                      <ul class="space-y-2 text-sm text-gray-800 pl-2">
                        @for (skill of resume().skills; track skill.id) {
                          <li class="flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-teal-600" [ngStyle]="{'background-color': resume().themeColor}"></span>
                            {{ skill.name }}
                          </li>
                        }
                      </ul>
                    </div>
                  }

                  @if (resume().projects.length > 0) {
                    <div>
                      <h3 class="text-sm font-bold text-white mb-4 pl-3 py-1 uppercase border-l-2 border-white bg-teal-600" [ngStyle]="{'background-color': resume().themeColor}">PROJECTS</h3>
                      <div class="space-y-4 text-sm text-gray-800 pl-2">
                        @for (proj of resume().projects; track proj.id) {
                          <div>
                            <div class="font-bold text-white mb-1 px-1 rounded-sm bg-teal-600" [ngStyle]="{'background-color': resume().themeColor}">{{ proj.name }}</div>
                            <p class="text-xs mb-1">{{ proj.description }}</p>
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- Right Column -->
              <div class="w-[65%] p-10 bg-white">
                <div class="mb-10">
                  <h1 class="text-4xl font-bold mb-2 text-teal-600" [ngStyle]="{'color': resume().themeColor}">{{ resume().personalInfo.fullName || 'Your Name' }}</h1>
                  <h2 class="text-xl italic text-teal-600/80 font-light" [ngStyle]="{'color': resume().themeColor}">{{ resume().personalInfo.jobTitle || 'Professional Title' }}</h2>
                </div>

                <div class="space-y-8">
                  @if (resume().about) {
                    <div>
                      <div class="px-6 py-2 rounded-r-full font-bold text-gray-900 inline-block mb-4 bg-teal-100" [ngStyle]="{'background-color': 'rgba(15, 118, 110, 0.2)'}">PROFESSIONAL SUMMARY</div>
                      <p class="text-sm text-gray-700 leading-relaxed text-justify">{{ resume().about }}</p>
                    </div>
                  }

                  @if (resume().qualifications.length > 0) {
                    <div>
                      <div class="px-6 py-2 rounded-r-full font-bold text-gray-900 inline-block mb-4 bg-teal-100" [ngStyle]="{'background-color': 'rgba(15, 118, 110, 0.2)'}">EDUCATION</div>
                      <div class="space-y-4">
                        @for (qual of resume().qualifications; track qual.id) {
                          <div class="flex justify-between items-baseline">
                            <div>
                              <h4 class="font-bold text-teal-600" [ngStyle]="{'color': resume().themeColor}">
                                {{ qual.degree }}
                                @if(qual.grade) { <span class="bg-teal-100 text-teal-800 text-xs px-2 py-0.5 rounded ml-2 font-medium" [ngStyle]="{'background-color': 'rgba(15, 118, 110, 0.1)'}">{{qual.grade}}</span> }
                              </h4>
                              <div class="text-sm text-gray-700 italic">{{ qual.institution }}</div>
                            </div>
                            <span class="text-sm text-gray-600">{{ qual.endDate || 'Present' }}</span>
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          }

          @case ('modern-blue') {
            <div class="flex h-full min-h-[297mm] relative overflow-hidden bg-white">
              <!-- Decorative Angles Section -->
              <!-- I'll use fixed shapes instead of multiple complex shapes to render reliably in html-to-image -->
              <div class="flex w-full min-h-[297mm]">
                
                <!-- Left Column -->
                <div class="w-[35%] bg-slate-100 p-8 flex flex-col border-r border-slate-200 z-10">
                  <div class="space-y-8 mt-48"> 
                    @if (resume().about) {
                      <div>
                        <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2"><mat-icon class="text-gray-600">person</mat-icon> About Me</h3>
                        <p class="text-sm text-gray-600 leading-relaxed">{{ resume().about }}</p>
                      </div>
                    }

                    <div>
                      <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2"><mat-icon class="text-gray-600">contact_page</mat-icon> Contact</h3>
                      <div class="space-y-3 text-sm text-gray-600">
                        @if (resume().personalInfo.phone) { <div class="flex items-center gap-3"><mat-icon class="text-[18px] w-5 h-5 text-gray-500">phone</mat-icon> {{ resume().personalInfo.phone }}</div> }
                        @if (resume().personalInfo.email) { <div class="flex items-center gap-3"><mat-icon class="text-[18px] w-5 h-5 text-gray-500">email</mat-icon> <span class="break-all">{{ resume().personalInfo.email }}</span></div> }
                        @if (resume().personalInfo.location) { <div class="flex items-center gap-3"><mat-icon class="text-[18px] w-5 h-5 text-gray-500">location_on</mat-icon> {{ resume().personalInfo.location }}</div> }
                      </div>
                    </div>

                    @if (resume().skills.length > 0) {
                      <div>
                        <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2"><mat-icon class="text-gray-600">settings</mat-icon> Skills</h3>
                        <ul class="space-y-2 text-sm text-gray-600 px-2">
                          @for (skill of resume().skills; track skill.id) {
                            <li class="flex items-center gap-2">
                              <span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                              {{ skill.name }}
                            </li>
                          }
                        </ul>
                      </div>
                    }

                    @if (resume().languages.length > 0) {
                      <div>
                        <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2"><mat-icon class="text-gray-600">language</mat-icon> Language</h3>
                        <ul class="space-y-2 text-sm text-gray-600 border-l border-gray-300 ml-2 pl-4">
                          @for (lang of resume().languages; track lang.id) {
                            <li class="relative">
                              <span class="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-gray-500"></span>
                              {{ lang.name }}
                            </li>
                          }
                        </ul>
                      </div>
                    }
                  </div>
                </div>

                <!-- Right Column -->
                <div class="w-[65%] p-10 bg-transparent z-10">
                  <div class="mb-12 flex items-center gap-6">
                    @if (resume().personalInfo.photoUrl) {
                      <div class="w-48 h-48 rounded-full overflow-hidden border-8 border-gray-100 shadow-md shrink-0">
                        <img [src]="resume().personalInfo.photoUrl" alt="Profile Photo" class="w-full h-full object-cover">
                      </div>
                    }
                    <div>
                      <h1 class="text-5xl font-bold mb-2 text-gray-800">{{ resume().personalInfo.fullName || 'Your Name' }}</h1>
                      <h2 class="text-2xl text-gray-600">{{ resume().personalInfo.jobTitle || 'Professional Title' }}</h2>
                    </div>
                  </div>

                  <div class="space-y-10 pl-4 border-l-2 border-slate-300 ml-4 relative mt-10">
                    @if (resume().qualifications.length > 0) {
                      <div class="relative">
                        <div class="absolute -left-[23px] top-1 px-1 bg-white">
                          <mat-icon class="text-gray-800">school</mat-icon>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-6 ml-6">Qualifications</h3>
                        <div class="space-y-6 ml-6">
                          @for (qual of resume().qualifications; track qual.id) {
                            <div class="relative border-l-2 border-slate-300 pl-4">
                              <div class="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-slate-400"></div>
                              <div class="font-bold text-gray-800">{{ qual.startDate }} - {{ qual.current ? 'Present' : qual.endDate }}</div>
                              <div class="font-bold uppercase tracking-wider text-gray-900">{{ qual.institution }}</div>
                              <div class="text-sm text-gray-600">
                                {{ qual.degree }} in {{ qual.fieldOfStudy }}
                                @if (qual.grade) { <span class="bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded ml-2 font-medium">{{qual.grade}}</span> }
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>

              </div>
              
              <!-- Decorator background image matching image 4 -->
              <div class="absolute top-0 right-0 left-0 h-48 -z-0 bg-blue-500 overflow-hidden" [ngStyle]="{'background-color': resume().themeColor}">
                 <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-900 transform rotate-12 translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <div class="absolute bottom-0 left-0 right-0 h-16 -z-0 overflow-hidden" [ngStyle]="{'background-color': resume().themeColor}">
              </div>
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
                          <li>{{ skill.name }}</li>
                        }
                      </ul>
                    </div>
                  }

                  @if (resume().languages.length > 0) {
                    <div>
                      <h3 class="text-xs font-bold uppercase tracking-widest pdf-text-slate-400 mb-4">Languages</h3>
                      <ul class="space-y-2 text-sm pdf-text-slate-700 font-medium">
                        @for (lang of resume().languages; track lang.id) {
                          <li>{{ lang.name }}</li>
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
                              <h4 class="font-semibold pdf-text-slate-900">
                                {{ qual.degree }} - {{ qual.fieldOfStudy }}
                                @if (qual.grade) { <span class="text-xs font-normal ml-2 py-0.5 px-2 bg-slate-100 rounded-sm">{{qual.grade}}</span> }
                              </h4>
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

          @case ('vibrant-yellow') {
            <div class="flex h-[297mm] overflow-hidden bg-white text-slate-800">
              <!-- Left Column: yellow top, dark bottom -->
              <div class="w-[40%] flex flex-col h-full bg-[#2d313a] text-white">
                 <div class="h-64 flex items-center justify-center p-6 relative" [ngStyle]="{'background-color': resume().themeColor}">
                    @if (resume().personalInfo.photoUrl) {
                      <div class="w-40 h-40 rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-white/20">
                        <img [src]="resume().personalInfo.photoUrl" alt="Profile" class="w-full h-full object-cover" crossorigin="anonymous" referrerpolicy="no-referrer">
                      </div>
                    }
                 </div>
                 <div class="p-8 space-y-10">
                    @if (resume().about) {
                      <div>
                        <h3 class="font-bold text-2xl tracking-wide mb-4">About me</h3>
                        <p class="text-[13px] font-light text-gray-300 leading-relaxed text-justify">{{ resume().about }}</p>
                      </div>
                    }
                    <div>
                      <h3 class="font-bold text-2xl tracking-wide mb-4">Contact Me</h3>
                      <div class="space-y-4 text-sm font-light text-gray-300">
                        @if (resume().personalInfo.phone) { <div class="flex items-center gap-3"><div class="p-1 rounded-full flex items-center justify-center" [ngStyle]="{'background-color': resume().themeColor}"><mat-icon class="text-black text-[16px] w-4 h-4 text-center">phone</mat-icon></div> {{ resume().personalInfo.phone }}</div> }
                        @if (resume().personalInfo.email) { <div class="flex items-center gap-3"><div class="p-1 rounded-full flex items-center justify-center" [ngStyle]="{'background-color': resume().themeColor}"><mat-icon class="text-black text-[16px] w-4 h-4 text-center">email</mat-icon></div> <span class="break-all">{{ resume().personalInfo.email }}</span></div> }
                        @if (resume().personalInfo.location) { <div class="flex items-center gap-3"><div class="p-1 rounded-full flex items-center justify-center" [ngStyle]="{'background-color': resume().themeColor}"><mat-icon class="text-black text-[16px] w-4 h-4 text-center">location_on</mat-icon></div> {{ resume().personalInfo.location }}</div> }
                      </div>
                    </div>
                 </div>
              </div>
              <!-- Right Column -->
              <div class="w-[60%] p-10 flex flex-col">
                 <div class="mb-10 text-right mt-6">
                    <h1 class="text-5xl font-black uppercase text-[#1a1a1a] leading-tight tracking-tighter">{{ resume().personalInfo.fullName || 'Your Name' }}</h1>
                    <h2 class="text-2xl font-light italic mt-1 text-gray-600 tracking-wider">{{ resume().personalInfo.jobTitle || 'Creative Designer' }}</h2>
                 </div>
                 
                 <div class="space-y-8 pl-4">
                    @if (resume().skills.length > 0) {
                      <div>
                        <h3 class="text-3xl font-extrabold text-[#2d313a] mb-4">Expertise Skill</h3>
                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                           @for (skill of resume().skills; track skill.id) {
                             <li class="font-light text-lg">{{ skill.name }}</li>
                           }
                        </ul>
                      </div>
                    }
                    @if (resume().qualifications.length > 0) {
                      <div>
                        <h3 class="text-3xl font-extrabold text-[#2d313a] mb-6">Education</h3>
                        <div class="space-y-6">
                           @for (qual of resume().qualifications; track qual.id) {
                             <div class="flex gap-4">
                               <div class="flex flex-col items-center mt-1.5"><div class="w-3 h-3 rounded-full bg-[#2d313a] shrink-0"></div><div class="w-0.5 h-full bg-gray-300"></div></div>
                               <div class="pb-2">
                                  <div class="text-gray-500 font-light mb-1">{{ qual.startDate }} - {{ qual.current ? 'Present' : qual.endDate }}</div>
                                  <div class="text-gray-800 font-medium text-lg">{{ qual.institution }}</div>
                                  <div class="text-gray-600 font-light">{{ qual.degree }} in {{ qual.fieldOfStudy }}</div>
                                  @if(qual.grade) { <div class="text-sm font-semibold text-gray-800 mt-1">Grade: {{ qual.grade }}</div> }
                               </div>
                             </div>
                           }
                        </div>
                      </div>
                    }
                    @if (resume().projects.length > 0) {
                      <div>
                        <h3 class="text-3xl font-extrabold text-[#2d313a] mb-6">Work Experience</h3>
                         <div class="space-y-6">
                           @for (proj of resume().projects; track proj.id) {
                             <div class="flex gap-4">
                               <div class="flex flex-col items-center mt-1.5"><div class="w-3 h-3 rounded-full bg-[#2d313a] shrink-0"></div><div class="w-0.5 h-full bg-gray-300"></div></div>
                               <div class="pb-2">
                                  <div class="text-gray-800 font-medium text-lg">{{ proj.name }}</div>
                                  <p class="text-gray-600 font-light text-sm mt-1 mb-2 whitespace-pre-line">{{ proj.description }}</p>
                                  @if (proj.url) { <a [href]="proj.url" class="text-blue-600 text-xs">{{ proj.url }}</a> }
                               </div>
                             </div>
                           }
                        </div>
                      </div>
                    }
                 </div>
              </div>
            </div>
          }

          @case ('elegant-green') {
            <div class="flex h-[297mm] overflow-hidden bg-[#f4ece3] font-sans text-slate-800">
               <div class="w-[35%] bg-teal-800 text-white p-8 flex flex-col" [ngStyle]="{'background-color': resume().themeColor}">
                   @if(resume().personalInfo.photoUrl){
                     <div class="w-44 h-44 rounded-full mx-auto my-6 overflow-hidden outline outline-teal-800 outline-4 ring-8 ring-[#e6c18a] shrink-0">
                        <img [src]="resume().personalInfo.photoUrl" alt="Profile" class="w-full h-full object-cover" crossorigin="anonymous" referrerpolicy="no-referrer">
                     </div>
                   }
                   
                   <div class="space-y-8 mt-10">
                      <!-- CONTACT -->
                      <div>
                         <h3 class="text-xl font-bold tracking-widest uppercase mb-4 text-white border-b border-white/30 pb-2">Contact</h3>
                         <div class="space-y-3 text-sm text-gray-100 font-medium">
                            @if(resume().personalInfo.phone){ <div class="grid grid-cols-[24px_1fr] items-center"><mat-icon class="w-4 h-4 text-[16px]">phone</mat-icon> <span class="break-words">{{resume().personalInfo.phone}}</span></div> }
                            @if(resume().personalInfo.email){ <div class="grid grid-cols-[24px_1fr] items-center"><mat-icon class="w-4 h-4 text-[16px]">email</mat-icon> <span class="break-all">{{resume().personalInfo.email}}</span></div> }
                            @if(resume().personalInfo.location){ <div class="grid grid-cols-[24px_1fr] items-center"><mat-icon class="w-4 h-4 text-[16px]">location_on</mat-icon> <span class="break-words">{{resume().personalInfo.location}}</span></div> }
                         </div>
                      </div>

                      <!-- EDUCATION -->
                      @if(resume().qualifications.length > 0){
                        <div>
                           <h3 class="text-xl font-bold tracking-widest uppercase mb-4 text-white border-b border-white/30 pb-2">Education</h3>
                           <div class="space-y-5">
                             @for(qual of resume().qualifications; track qual.id) {
                               <div>
                                  <h4 class="font-bold text-white text-md">{{ qual.institution }}</h4>
                                  <div class="text-sm text-gray-200 mt-1 leading-tight">{{ qual.degree }} in {{ qual.fieldOfStudy }}</div>
                                  <div class="text-xs text-gray-300 mt-1">{{ qual.startDate }} - {{ qual.current ? 'Present' : qual.endDate }}
                                    @if(qual.grade) { <span class="ml-2 px-1.5 py-0.5 bg-white/20 rounded">{{ qual.grade }}</span> }
                                  </div>
                               </div>
                             }
                           </div>
                        </div>
                      }

                      <!-- SKILLS -->
                      @if(resume().skills.length > 0){
                        <div>
                           <h3 class="text-xl font-bold tracking-widest uppercase mb-4 text-white border-b border-white/30 pb-2">Skills</h3>
                           <ul class="list-disc pl-4 space-y-2 text-sm text-gray-100 font-medium">
                             @for(skill of resume().skills; track skill.id){ <li>{{skill.name}}</li> }
                           </ul>
                        </div>
                      }
                      
                      <!-- LANGUAGE -->
                      @if(resume().languages.length > 0){
                        <div>
                           <h3 class="text-xl font-bold tracking-widest uppercase mb-4 text-white border-b border-white/30 pb-2">Language</h3>
                           <ul class="list-disc pl-4 space-y-2 text-sm text-gray-100 font-medium">
                             @for(lang of resume().languages; track lang.id){ <li>{{lang.name}}</li> }
                           </ul>
                        </div>
                      }
                   </div>
               </div>

               <div class="w-[65%] p-12 flex flex-col pt-16">
                  <div class="mb-14">
                      <h1 class="text-6xl font-light text-teal-900 leading-tight tracking-widest uppercase" [ngStyle]="{'color': resume().themeColor}">
                         @if(resume().personalInfo.fullName) {
                           @for(word of resume().personalInfo.fullName.split(' '); track $index; let last = $last) {
                              <span [class.font-bold]="last">{{word}}</span>
                              @if(!last) { <br/> }
                           }
                         } @else {
                           YOUR<br><span class="font-bold">NAME</span>
                         }
                      </h1>
                      <h2 class="text-2xl text-gray-700 mt-2 tracking-wide font-medium">{{ resume().personalInfo.jobTitle || 'Job Title' }}</h2>
                  </div>

                  <div class="space-y-12">
                     @if(resume().about){
                       <div>
                         <h3 class="text-xl font-bold tracking-[0.2em] text-teal-900 mb-4 uppercase" [ngStyle]="{'color': resume().themeColor}">About Me</h3>
                         <p class="text-[14px] leading-relaxed text-gray-800 text-justify">{{ resume().about }}</p>
                       </div>
                     }

                     @if(resume().projects.length > 0) {
                      <div>
                        <h3 class="text-xl font-bold tracking-[0.2em] text-teal-900 mb-6 uppercase border-b border-gray-300 pb-2 inline-block w-full" [ngStyle]="{'color': resume().themeColor}">Experience</h3>
                        <div class="space-y-8">
                           @for(proj of resume().projects; track proj.id) {
                              <div>
                                <div class="flex justify-between items-baseline mb-2">
                                  <h4 class="font-bold text-gray-900 text-lg">{{ proj.name }}</h4>
                                </div>
                                @if (proj.url) { <a [href]="proj.url" class="text-blue-600 text-xs mb-2 block">{{ proj.url }}</a> }
                                <p class="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line">{{ proj.description }}</p>
                              </div>
                           }
                        </div>
                      </div>
                     }
                  </div>
               </div>
            </div>
          }

          @case ('modern-pro') {
            <div class="flex flex-col h-[297mm] overflow-hidden bg-white font-sans">
                <!-- Header -->
                <div class="h-44 flex items-center px-12 border-b-8 border-slate-700 relative z-10 bg-white" [ngStyle]="{'border-color': resume().themeColor}">
                    <div class="w-[30%] flex justify-center relative">
                        @if(resume().personalInfo.photoUrl){
                           <div class="w-40 h-40 rounded-full overflow-hidden absolute -bottom-16 z-20 border-[8px] border-white shadow-lg bg-white">
                             <img [src]="resume().personalInfo.photoUrl" alt="Profile" class="w-full h-full object-cover" crossorigin="anonymous" referrerpolicy="no-referrer">
                           </div>
                        }
                    </div>
                    <div class="w-[70%] pl-8 pt-4">
                        <h1 class="text-5xl font-light text-slate-800 mb-4 uppercase tracking-wider">
                           <span class="font-bold text-blue-800" [ngStyle]="{'color': resume().themeColor}">{{ resume().personalInfo.fullName.split(' ')[0] || 'FIRST' }}</span> 
                           {{ resume().personalInfo.fullName.substring(resume().personalInfo.fullName.indexOf(' ') + 1) || 'LASTNAME' }}
                        </h1>
                        <div class="flex items-center gap-4">
                           <div class="w-12 h-1.5 bg-slate-800 rounded-full" [ngStyle]="{'background-color': resume().themeColor}"></div>
                           <h2 class="text-xl tracking-widest text-slate-600 uppercase">{{ resume().personalInfo.jobTitle || 'Professional Title' }}</h2>
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="flex flex-1 z-0 relative">
                   <!-- Left Col -->
                   <div class="w-[35%] bg-slate-100 p-8 pt-24 flex flex-col text-slate-800 border-r border-slate-200">
                      <div class="space-y-5 mb-10 pb-8 border-b-2 border-slate-300">
                         @if(resume().personalInfo.phone){ <div class="flex items-center gap-3"><mat-icon class="w-5 h-5 text-slate-600 text-[20px]">phone</mat-icon> <span class="text-[13px] font-medium">{{resume().personalInfo.phone}}</span></div> }
                         @if(resume().personalInfo.email){ <div class="flex items-center gap-3"><mat-icon class="w-5 h-5 text-slate-600 text-[20px]">email</mat-icon> <span class="text-[13px] font-medium break-all">{{resume().personalInfo.email}}</span></div> }
                         @if(resume().personalInfo.location){ <div class="flex items-center gap-3"><mat-icon class="w-5 h-5 text-slate-600 text-[20px]">location_on</mat-icon> <span class="text-[13px] font-medium">{{resume().personalInfo.location}}</span></div> }
                      </div>

                      @if(resume().qualifications.length > 0){
                         <div class="mb-10">
                            <div class="border-b-2 border-slate-300 pb-2 mb-6 w-full flex">
                               <h3 class="text-lg font-bold tracking-[0.2em] text-slate-700 uppercase" [ngStyle]="{'color': resume().themeColor}">Education</h3>
                            </div>
                            <div class="space-y-8">
                               @for(qual of resume().qualifications; track qual.id) {
                                  <div>
                                     <div class="font-bold text-slate-800 tracking-wider mb-2 text-sm">{{ qual.startDate }} - {{ qual.current ? 'Present' : qual.endDate }}</div>
                                     <div class="font-bold uppercase text-slate-900 text-[15px] leading-tight mb-1" [ngStyle]="{'color': resume().themeColor}">{{ qual.institution }}</div>
                                     <div class="text-[13px] text-slate-700 flex items-start gap-2">
                                       <div class="w-1.5 h-1.5 bg-slate-800 rounded-full mt-1.5 shrink-0" [ngStyle]="{'background-color': resume().themeColor}"></div>
                                       <span>{{ qual.degree }} in {{ qual.fieldOfStudy }}</span>
                                     </div>
                                     @if(qual.grade) {
                                        <div class="text-[13px] text-slate-700 flex items-start gap-2 mt-1">
                                          <div class="w-1.5 h-1.5 bg-slate-800 rounded-full mt-1.5 shrink-0" [ngStyle]="{'background-color': resume().themeColor}"></div>
                                          <span class="font-bold">Grade: {{ qual.grade }}</span>
                                        </div>
                                     }
                                  </div>
                               }
                            </div>
                         </div>
                      }

                      @if(resume().skills.length > 0){
                         <div class="mb-10">
                           <div class="border-b-2 border-slate-300 pb-2 mb-6 w-full flex">
                              <h3 class="text-lg font-bold tracking-[0.2em] text-slate-700 uppercase" [ngStyle]="{'color': resume().themeColor}">Skills</h3>
                           </div>
                           <ul class="space-y-3">
                             @for(skill of resume().skills; track skill.id){ 
                               <li class="flex items-center gap-3"><div class="w-1.5 h-1.5 bg-slate-600 rounded-full"></div> <span class="text-sm font-medium">{{skill.name}}</span></li>
                             }
                           </ul>
                         </div>
                      }
                      
                      @if(resume().languages.length > 0){
                         <div>
                           <div class="border-b-2 border-slate-300 pb-2 mb-6 w-full flex">
                              <h3 class="text-lg font-bold tracking-[0.2em] text-slate-700 uppercase" [ngStyle]="{'color': resume().themeColor}">Languages</h3>
                           </div>
                           <ul class="space-y-3">
                             @for(lang of resume().languages; track lang.id){ 
                               <li class="flex items-center gap-3"><div class="w-1.5 h-1.5 bg-slate-600 rounded-full"></div> <span class="text-sm font-medium">{{lang.name}}</span></li>
                             }
                           </ul>
                         </div>
                      }
                   </div>

                   <!-- Right Col -->
                   <div class="w-[65%] p-10 pt-16">
                     <div class="bg-slate-700 p-8 rounded shadow-lg mb-12 text-white" [ngStyle]="{'background-color': resume().themeColor}">
                         <h3 class="text-xl font-bold tracking-[0.2em] uppercase mb-4 border-b border-white/20 pb-2">Profile</h3>
                         <p class="text-[14px] text-slate-50 leading-relaxed text-justify">{{ resume().about || 'A professional summary goes here.' }}</p>
                     </div>

                     @if(resume().projects.length > 0){
                         <div>
                            <div class="flex items-center gap-4 mb-8">
                               <h3 class="text-2xl font-bold tracking-[0.2em] text-slate-800 uppercase">Experience</h3>
                               <div class="flex-1 h-0.5 bg-slate-200"></div>
                            </div>
                            <div class="space-y-8 pl-1">
                               @for(proj of resume().projects; track proj.id) {
                                  <div class="relative border-l-2 border-slate-300 pl-6 pb-2">
                                     <div class="absolute -left-[8px] top-1.5 w-3.5 h-3.5 bg-slate-700 shadow" [ngStyle]="{'background-color': resume().themeColor}"></div>
                                     <div class="flex justify-between items-baseline mb-1">
                                        <h4 class="font-bold text-lg text-slate-900">{{ proj.name }}</h4>
                                     </div>
                                     @if(proj.url) { <a [href]="proj.url" class="text-[13px] text-blue-600 block mb-3">{{proj.url}}</a> }
                                     <p class="text-[14px] text-slate-700 leading-relaxed whitespace-pre-line">{{ proj.description }}</p>
                                  </div>
                               }
                            </div>
                         </div>
                     }
                   </div>
                </div>
            </div>
          }

          @case ('bold-teal') {
            <div class="flex h-[297mm] overflow-hidden bg-white font-sans text-slate-800">
                <div class="w-[35%] bg-teal-800 text-white flex flex-col relative overflow-hidden" [ngStyle]="{'background-color': resume().themeColor}">
                    <div class="absolute top-0 left-0 right-0 h-48 bg-black/20 transform -skew-y-6 -translate-y-10 z-0"></div>
                    <div class="z-10 p-8 flex flex-col items-center mt-6 border-b border-white/20 pb-8">
                       @if(resume().personalInfo.photoUrl){
                         <div class="w-40 h-40 rounded-full border-[6px] border-white/20 shadow-xl overflow-hidden mb-6 filter grayscale sepia-0">
                           <img [src]="resume().personalInfo.photoUrl" alt="Profile" class="w-full h-full object-cover" crossorigin="anonymous" referrerpolicy="no-referrer">
                         </div>
                       }
                       <h3 class="text-xl font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2 mb-6 w-full">
                          <mat-icon class="w-5 h-5 text-[20px]">quick_contacts_mail</mat-icon> Contact
                       </h3>
                       <div class="w-full space-y-4 text-[13px] font-medium text-center">
                          <div class="break-words">{{resume().personalInfo.phone}}</div>
                          <div class="break-all">{{resume().personalInfo.email}}</div>
                          <div class="break-words">{{resume().personalInfo.location}}</div>
                       </div>
                    </div>
                    
                    <div class="flex-1 p-8 z-10 space-y-12">
                       @if(resume().qualifications.length > 0){
                          <div>
                            <h3 class="text-xl font-bold uppercase tracking-widest flex items-center gap-2 mb-6">
                               <mat-icon class="w-5 h-5 text-[20px]">school</mat-icon> Education
                            </h3>
                            <div class="space-y-6">
                               @for(qual of resume().qualifications; track qual.id) {
                                  <div class="relative pl-6">
                                     <div class="absolute w-2 h-2 bg-yellow-400 rounded-full -left-0.5 top-1.5"></div>
                                     <div class="font-bold text-white text-[15px] mb-1">{{ qual.institution }}</div>
                                     <div class="text-[13px] text-teal-100 italic">{{ qual.degree }} in {{ qual.fieldOfStudy }}</div>
                                     <div class="text-[12px] text-white/70 mt-1">Completed in {{ qual.endDate || 'Present' }}
                                        @if(qual.grade) { <span class="bg-white/20 text-white px-1.5 py-0.5 rounded font-bold ml-2">{{qual.grade}}</span> }
                                     </div>
                                  </div>
                               }
                            </div>
                          </div>
                       }
                       
                       @if(resume().skills.length > 0){
                          <div>
                            <h3 class="text-xl font-bold uppercase tracking-widest flex items-center gap-2 mb-6">
                               <mat-icon class="w-5 h-5 text-[20px]">extension</mat-icon> Skill
                            </h3>
                            <ul class="space-y-3">
                               @for(skill of resume().skills; track skill.id) {
                                  <li class="flex items-center gap-3 text-[14px] text-teal-50"><div class="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div> {{skill.name}}</li>
                               }
                            </ul>
                          </div>
                       }
                    </div>
                </div>

                <div class="w-[65%] p-12 bg-white flex flex-col">
                   <div class="mb-14 mt-4">
                      <h1 class="text-6xl font-black text-slate-800 leading-none mb-3 tracking-tight">{{ resume().personalInfo.fullName.split(' ')[0] || 'FIRST' }}<br/>{{ resume().personalInfo.fullName.substring(resume().personalInfo.fullName.indexOf(' ') + 1) || 'LASTNAME' }}</h1>
                      <h2 class="text-2xl text-slate-500 font-light tracking-widest mt-4">{{ resume().personalInfo.jobTitle || 'Professional Title' }}</h2>
                   </div>

                   <div class="space-y-12 pr-4">
                      @if(resume().about){
                         <div>
                            <h3 class="text-2xl font-bold text-slate-800 mb-4 text-justify">Profile</h3>
                            <p class="text-[15px] text-slate-600 leading-relaxed text-justify">{{ resume().about }}</p>
                         </div>
                      }

                      @if(resume().projects.length > 0){
                         <div>
                            <h3 class="text-2xl font-bold text-slate-800 mb-8">Work Experience</h3>
                            <div class="space-y-8 relative border-l-2 border-slate-300 ml-2">
                               @for(proj of resume().projects; track proj.id) {
                                  <div class="pl-8 relative">
                                     <div class="absolute w-4 h-4 bg-white border-4 border-teal-800 rounded-full -left-[9px] top-1.5" [ngStyle]="{'border-color': resume().themeColor}"></div>
                                     <h4 class="font-bold text-xl text-slate-800 mb-1">{{ proj.name }}</h4>
                                     @if(proj.url){ <a [href]="proj.url" class="text-[13px] text-blue-600 block mb-2">{{proj.url}}</a> }
                                     <p class="text-slate-600 text-[14px] mt-2 leading-relaxed whitespace-pre-line">{{ proj.description }}</p>
                                  </div>
                               }
                            </div>
                         </div>
                      }
                      
                      @if(resume().languages.length > 0){
                         <div class="pt-4">
                            <h3 class="text-2xl font-bold text-slate-800 mb-6">Languages</h3>
                            <div class="flex flex-wrap gap-3">
                               @for(lang of resume().languages; track lang.id) {
                                  <span class="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-[14px] font-medium border border-slate-200">{{lang.name}}</span>
                               }
                            </div>
                         </div>
                      }
                   </div>
                </div>
            </div>
          }

          @case ('classic-cream') {
            <div class="flex h-[297mm] overflow-hidden bg-[#fafcf0] font-sans">
                <!-- Col 1 -->
                <div class="w-[33%] bg-[#f4e8d8] p-8 flex flex-col items-center border-r-4 border-white pb-12 pt-12">
                   @if(resume().personalInfo.photoUrl){
                       <div class="w-48 h-48 rounded-full overflow-hidden shadow-xl mb-10 border-[6px] border-white shrink-0">
                         <img [src]="resume().personalInfo.photoUrl" alt="Profile" class="w-full h-full object-cover" crossorigin="anonymous" referrerpolicy="no-referrer">
                       </div>
                   }
                   <h1 class="text-4xl font-black text-slate-800 text-center uppercase leading-tight tracking-tight mb-3" [ngStyle]="{'color': resume().themeColor}">
                      {{ resume().personalInfo.fullName || 'YOUR NAME' }}
                   </h1>
                   <h2 class="text-lg font-bold text-slate-500 uppercase tracking-widest text-center mb-12">{{ resume().personalInfo.jobTitle || 'JOB TITLE' }}</h2>

                   <div class="w-full text-left space-y-4">
                     @if(resume().about){
                        <div class="bg-slate-700 text-white px-4 py-1.5 font-bold text-[11px] tracking-widest uppercase inline-block mb-2 rounded-md" [ngStyle]="{'background-color': resume().themeColor}">ABOUT ME</div>
                        <p class="text-[13px] text-slate-700 leading-relaxed text-justify">{{resume().about}}</p>
                     }
                   </div>
                </div>

                <!-- Col 2 -->
                <div class="w-[33%] p-8 pt-12 bg-[#fdfaf5] border-r-4 border-[#eedcce] flex flex-col space-y-12">
                   <div>
                       <div class="bg-slate-700 text-white px-4 py-1.5 font-bold text-[11px] tracking-widest uppercase inline-block mb-6 rounded-md shadow-sm" [ngStyle]="{'background-color': resume().themeColor}">CONTACT</div>
                       <div class="space-y-4 text-slate-700 text-[13px] font-medium border-l border-slate-300 pl-4 py-1">
                          @if(resume().personalInfo.phone){ <div>{{resume().personalInfo.phone}}</div> }
                          @if(resume().personalInfo.email){ <div class="break-all">{{resume().personalInfo.email}}</div> }
                          @if(resume().personalInfo.location){ <div>{{resume().personalInfo.location}}</div> }
                       </div>
                   </div>

                   @if(resume().skills.length > 0){
                     <div>
                       <div class="bg-slate-700 text-white px-4 py-1.5 font-bold text-[11px] tracking-widest uppercase inline-block mb-6 rounded-md shadow-sm" [ngStyle]="{'background-color': resume().themeColor}">SKILLS</div>
                       <ul class="list-none space-y-2 text-slate-700 text-[13px] font-medium border-l border-slate-300 pl-4 py-1">
                          @for(skill of resume().skills; track skill.id) { 
                            <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-slate-400"></div>{{skill.name}}</li> 
                          }
                       </ul>
                     </div>
                   }
                   
                   @if(resume().languages.length > 0){
                     <div>
                       <div class="bg-slate-700 text-white px-4 py-1.5 font-bold text-[11px] tracking-widest uppercase inline-block mb-6 rounded-md shadow-sm" [ngStyle]="{'background-color': resume().themeColor}">LANGUAGES</div>
                       <ul class="list-none space-y-2 text-slate-700 text-[13px] font-medium border-l border-slate-300 pl-4 py-1">
                          @for(lang of resume().languages; track lang.id) { 
                            <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-slate-400"></div>{{lang.name}}</li> 
                          }
                       </ul>
                     </div>
                   }

                   @if(resume().qualifications.length > 0){
                     <div>
                       <div class="bg-slate-700 text-white px-4 py-1.5 font-bold text-[11px] tracking-widest uppercase inline-block mb-6 rounded-md shadow-sm" [ngStyle]="{'background-color': resume().themeColor}">EDUCATION</div>
                       <div class="space-y-6 border-l border-slate-300 pl-4 py-1 relative">
                          @for(qual of resume().qualifications; track qual.id) {
                             <div class="relative">
                                <div class="absolute -left-[21px] top-1.5 w-2 h-2 bg-slate-400 rounded-full"></div>
                                <h4 class="font-bold text-slate-800 text-[14px] leading-tight mb-1">{{ qual.degree }} in {{ qual.fieldOfStudy }}</h4>
                                <div class="font-bold text-slate-500 text-[12px] mb-1 tracking-wide">{{ qual.startDate }} - {{ qual.current ? 'Present' : qual.endDate }}
                                  @if (qual.grade) { <span class="ml-2 font-normal text-[11px] bg-slate-200 px-1.5 rounded text-slate-600">{{qual.grade}}</span> }
                                </div>
                                <div class="text-[13px] text-slate-500 font-medium">{{ qual.institution }}</div>
                             </div>
                          }
                       </div>
                     </div>
                   }
                </div>

                <!-- Col 3 -->
                <div class="w-[34%] p-8 pt-12 bg-[#eedcce] flex flex-col">
                   @if(resume().projects.length > 0){
                     <div>
                       <div class="bg-slate-700 text-white px-4 py-1.5 font-bold text-[11px] tracking-widest uppercase inline-block mb-8 rounded-md shadow-sm" [ngStyle]="{'background-color': resume().themeColor}">WORK EXPERIENCE</div>
                       <div class="space-y-10 border-l border-slate-400/50 pl-4 py-1 relative">
                          @for(proj of resume().projects; track proj.id) {
                             <div class="relative">
                                <div class="absolute -left-[21px] top-1.5 w-2 h-2 bg-slate-500 rounded-full"></div>
                                <h4 class="font-bold text-slate-800 text-[15px] mb-1.5">{{ proj.name }}</h4>
                                @if(proj.url){ <a [href]="proj.url" class="text-[12px] font-bold text-slate-500 hover:text-slate-800 mb-3 block">{{proj.url}}</a> }
                                <p class="text-[13px] text-slate-700 leading-relaxed font-medium whitespace-pre-line">{{proj.description}}</p>
                             </div>
                          }
                       </div>
                     </div>
                   }
                </div>
            </div>
          }

          @case ('sharp-monochrome') {
            <div class="flex flex-col h-[297mm] overflow-hidden bg-white text-slate-800 font-sans">
               <!-- Top header dark -->
               <div class="h-48 bg-slate-900 w-full flex items-center pr-12 relative z-0" [ngStyle]="{'background-color': resume().themeColor}">
                   <div class="absolute left-0 top-0 bottom-0 w-[5%] bg-black/20"></div>
                   <div class="ml-[38%] text-white">
                      <h1 class="text-6xl font-bold tracking-tight mb-2 border-b-4 border-white/30 inline-block pb-3 uppercase">{{ resume().personalInfo.fullName || 'Your Name' }}</h1>
                      <h2 class="text-2xl font-light tracking-widest mt-3 opacity-90 uppercase">{{ resume().personalInfo.jobTitle || 'Professional Title' }}</h2>
                   </div>
               </div>

               <div class="flex flex-1 -mt-32 z-10 relative">
                  <!-- Left Col -->
                  <div class="w-[35%] w-[33%] bg-slate-900 h-full text-slate-200 flex flex-col p-10 pt-8 ml-8 shadow-2xl relative overflow-hidden" [ngStyle]="{'background-color': resume().themeColor}">
                      <!-- pattern -->
                      <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(white 1px, transparent 1px); background-size: 16px 16px;"></div>
                      
                      @if(resume().personalInfo.photoUrl){
                        <div class="w-48 h-48 rounded-[2rem] border-[6px] border-white/10 overflow-hidden mx-auto mb-10 z-10 shadow-xl bg-slate-800 transform rotate-3 shrink-0">
                           <div class="w-full h-full transform -rotate-3 bg-slate-900 overflow-hidden">
                             <img [src]="resume().personalInfo.photoUrl" alt="Profile" class="w-full h-full object-cover" crossorigin="anonymous" referrerpolicy="no-referrer">
                           </div>
                        </div>
                      } @else {
                        <div class="h-32 z-10"></div>
                      }
                      
                      <div class="space-y-12 z-10 relative">
                        @if(resume().about){
                           <div>
                              <h3 class="text-xl font-bold text-white mb-4 border-b-2 border-white/20 pb-2 uppercase tracking-widest">About Me</h3>
                              <p class="text-[13px] font-medium leading-relaxed text-slate-300 text-justify">{{ resume().about }}</p>
                           </div>
                        }

                        <div>
                           <h3 class="text-xl font-bold text-white mb-4 border-b-2 border-white/20 pb-2 uppercase tracking-widest">Contact</h3>
                           <div class="space-y-4 text-[13px] font-medium break-words">
                              @if(resume().personalInfo.phone){ <div class="flex items-center gap-4"><mat-icon class="w-4 h-4 text-slate-400">phone</mat-icon> {{resume().personalInfo.phone}}</div> }
                              @if(resume().personalInfo.email){ <div class="flex items-center gap-4"><mat-icon class="w-4 h-4 text-slate-400">email</mat-icon> <span class="break-all">{{resume().personalInfo.email}}</span></div> }
                              @if(resume().personalInfo.location){ <div class="flex items-center gap-4"><mat-icon class="w-4 h-4 text-slate-400">location_on</mat-icon> {{resume().personalInfo.location}}</div> }
                           </div>
                        </div>

                        @if(resume().skills.length > 0){
                           <div>
                              <h3 class="text-xl font-bold text-white mb-4 border-b-2 border-white/20 pb-2 uppercase tracking-widest">Skills</h3>
                              <ul class="space-y-3 text-[14px] font-medium">
                                 @for(skill of resume().skills; track skill.id) { 
                                    <li class="flex items-center justify-between">
                                      <span>{{skill.name}}</span>
                                      <div class="flex-1 border-b border-white/20 mx-3 border-dotted mt-2"></div>
                                      <div class="w-2 h-2 bg-white rounded-full"></div>
                                    </li> 
                                 }
                              </ul>
                           </div>
                        }

                        @if(resume().languages.length > 0){
                           <div>
                              <h3 class="text-xl font-bold text-white mb-4 border-b-2 border-white/20 pb-2 uppercase tracking-widest">Language</h3>
                              <ul class="space-y-3 text-[14px] font-medium">
                                 @for(lang of resume().languages; track lang.id) { 
                                    <li class="flex items-center justify-between">
                                      <span>{{lang.name}}</span>
                                      <div class="flex-1 border-b border-white/20 mx-3 border-dotted mt-2"></div>
                                      <div class="w-2 h-2 bg-white rounded-full"></div>
                                    </li> 
                                 }
                              </ul>
                           </div>
                        }
                      </div>
                  </div>

                  <!-- Right Col -->
                  <div class="w-[64%] p-14 pt-36">
                     @if(resume().projects.length > 0){
                        <div class="mb-14">
                           <h3 class="text-3xl font-extrabold text-slate-800 mb-8 border-b-2 border-slate-900 inline-block pb-1 pr-8 uppercase tracking-widest" [ngStyle]="{'border-color': resume().themeColor}">Work Experience</h3>
                           <div class="space-y-10">
                               @for(proj of resume().projects; track proj.id) {
                                  <div>
                                     <div class="flex align-baseline gap-4 mb-2">
                                        <div class="w-4 border-t-2 border-slate-400 mt-3" [ngStyle]="{'border-color': resume().themeColor}"></div>
                                        <h4 class="font-bold text-xl text-slate-800">{{ proj.name }}</h4>
                                     </div>
                                     @if(proj.url){ <a [href]="proj.url" class="text-[13px] text-blue-600 block mb-3 font-semibold ml-8">{{proj.url}}</a> }
                                     <p class="text-[14px] text-slate-600 leading-relaxed font-medium whitespace-pre-line ml-8">{{ proj.description }}</p>
                                  </div>
                               }
                           </div>
                        </div>
                     }

                     @if(resume().qualifications.length > 0){
                        <div>
                           <h3 class="text-3xl font-extrabold text-slate-800 mb-8 border-b-2 border-slate-900 inline-block pb-1 pr-8 uppercase tracking-widest" [ngStyle]="{'border-color': resume().themeColor}">Education</h3>
                           <div class="space-y-8">
                               @for(qual of resume().qualifications; track qual.id) {
                                  <div class="grid grid-cols-[1fr_auto] gap-6 pl-8 relative">
                                     <div class="absolute left-0 top-2 w-4 border-t-2 border-slate-400" [ngStyle]="{'border-color': resume().themeColor}"></div>
                                     <div>
                                        <h4 class="font-bold text-[17px] text-slate-800 mb-1 uppercase">{{ qual.institution }}</h4>
                                        <div class="text-[14px] font-medium text-slate-600">{{ qual.degree }} in <span class="italic font-normal">{{ qual.fieldOfStudy }}</span></div>
                                        @if(qual.grade) { <div class="text-xs font-bold text-white mt-2 bg-slate-800 px-2 py-0.5 inline-block rounded uppercase tracking-wider" [ngStyle]="{'background-color': resume().themeColor}">Score: {{qual.grade}}</div> }
                                     </div>
                                     <div class="text-[12px] font-bold tracking-widest text-slate-400 bg-slate-50 px-3 py-1 self-start rounded border border-slate-200">{{ qual.startDate }}<br><span class="text-slate-300 text-[10px]">TO</span><br>{{ qual.current ? 'Present' : qual.endDate }}</div>
                                  </div>
                               }
                           </div>
                        </div>
                     }
                  </div>
               </div>
            </div>
          }

          @case ('dynamic-blue') {
            <div class="flex h-[297mm] overflow-hidden bg-slate-50 text-slate-800 relative z-0 font-sans">
               <!-- Left Col -->
               <div class="w-[35%] bg-blue-950 p-10 flex flex-col text-slate-200 z-10 shadow-2xl" [ngStyle]="{'background-color': resume().themeColor}">
                   @if(resume().personalInfo.photoUrl){
                       <div class="w-48 h-48 rounded-full border-[8px] border-white/10 overflow-hidden mx-auto mt-6 mb-12 shadow-2xl shrink-0">
                          <img [src]="resume().personalInfo.photoUrl" alt="Profile" class="w-full h-full object-cover" crossorigin="anonymous" referrerpolicy="no-referrer">
                       </div>
                   }

                   <div class="space-y-12 uppercase tracking-widest">
                      @if(resume().qualifications.length > 0){
                         <div>
                            <h3 class="text-lg font-bold text-white mb-6 border-b border-white/20 pb-2">Education</h3>
                            <div class="space-y-6">
                               @for(qual of resume().qualifications; track qual.id) {
                                  <div class="text-[13px]">
                                     <div class="font-bold text-white mb-1 leading-tight text-[14px]">{{ qual.degree }}</div>
                                     <div class="text-slate-300 normal-case font-medium leading-relaxed">
                                        {{ qual.institution }}<br>
                                        <span class="text-slate-400 text-[12px]">{{ qual.startDate }} - {{ qual.endDate || 'Present' }}</span>
                                        @if(qual.grade) { <span class="bg-blue-900/50 block w-max px-2 py-0.5 mt-1 rounded text-xs font-bold border border-white/10">{{qual.grade}}</span> }
                                     </div>
                                  </div>
                               }
                            </div>
                         </div>
                      }

                      @if(resume().languages.length > 0){
                         <div>
                            <h3 class="text-lg font-bold text-white mb-6 border-b border-white/20 pb-2">Languages</h3>
                            <ul class="list-none space-y-3 text-[14px] text-slate-200 normal-case font-medium">
                               @for(lang of resume().languages; track lang.id) { 
                                  <li class="flex items-center gap-3">
                                    <div class="w-2 h-2 border border-white rounded-full"></div>
                                    {{lang.name}}
                                  </li> 
                               }
                            </ul>
                         </div>
                      }

                      <div>
                         <h3 class="text-lg font-bold text-white mb-6 border-b border-white/20 pb-2">Contact</h3>
                         <div class="space-y-5 text-[13px] normal-case font-medium tracking-wide">
                            @if(resume().personalInfo.phone){ <div class="flex items-center gap-4"><div class="w-8 h-8 rounded-full bg-white text-blue-950 flex items-center justify-center shrink-0" [ngStyle]="{'color': resume().themeColor}"><mat-icon class="text-[18px] w-4.5 h-4.5">phone</mat-icon></div> {{resume().personalInfo.phone}}</div> }
                            @if(resume().personalInfo.email){ <div class="flex items-center gap-4"><div class="w-8 h-8 rounded-full bg-white text-blue-950 flex items-center justify-center shrink-0" [ngStyle]="{'color': resume().themeColor}"><mat-icon class="text-[18px] w-4.5 h-4.5">email</mat-icon></div> <span class="break-all">{{resume().personalInfo.email}}</span></div> }
                            @if(resume().personalInfo.location){ <div class="flex items-center gap-4"><div class="w-8 h-8 rounded-full bg-white text-blue-950 flex items-center justify-center shrink-0" [ngStyle]="{'color': resume().themeColor}"><mat-icon class="text-[18px] w-4.5 h-4.5">location_on</mat-icon></div> {{resume().personalInfo.location}}</div> }
                         </div>
                      </div>
                   </div>
               </div>

               <!-- Right Col -->
               <div class="w-[65%] p-12 pr-16 bg-transparent flex flex-col z-10 relative">
                   <div class="mb-14 mt-8 relative z-20 border-b-4 border-slate-200 pb-8">
                      <h1 class="text-6xl font-black text-blue-950 uppercase tracking-tighter leading-none" [ngStyle]="{'color': resume().themeColor}">{{ resume().personalInfo.fullName || 'YOUR NAME' }}</h1>
                      <h2 class="text-2xl font-bold text-slate-500 uppercase tracking-widest mt-4">{{ resume().personalInfo.jobTitle || 'PROFESSIONAL TITLE' }}</h2>
                   </div>

                   <div class="space-y-12 relative z-20">
                      @if(resume().about){
                         <div>
                            <h3 class="text-2xl font-black uppercase tracking-wider text-blue-950 mb-4 flex items-center gap-3" [ngStyle]="{'color': resume().themeColor}">Profile <div class="h-1 flex-1 bg-slate-200"></div></h3>
                            <p class="text-[14px] text-slate-600 leading-relaxed font-medium text-justify">{{ resume().about }}</p>
                         </div>
                      }

                      @if(resume().projects.length > 0){
                         <div>
                            <h3 class="text-2xl font-black uppercase tracking-wider text-blue-950 mb-6 flex items-center gap-3" [ngStyle]="{'color': resume().themeColor}">Experience <div class="h-1 flex-1 bg-slate-200"></div></h3>
                            <div class="space-y-8 pl-2">
                               @for(proj of resume().projects; track proj.id) {
                                  <div class="relative pl-6">
                                     <div class="absolute w-2 h-2 bg-blue-950 left-0 top-1.5 transform rotate-45" [ngStyle]="{'background-color': resume().themeColor}"></div>
                                     <h4 class="font-bold text-[16px] text-slate-800 uppercase mb-1">{{ proj.name }}</h4>
                                     @if(proj.url){ <a [href]="proj.url" class="text-xs font-bold text-blue-500 mb-2 block hover:underline">{{proj.url}}</a> }
                                     <p class="text-[14px] text-slate-600 leading-relaxed font-medium whitespace-pre-line">{{ proj.description }}</p>
                                  </div>
                               }
                            </div>
                         </div>
                      }

                      @if(resume().skills.length > 0){
                         <div>
                            <h3 class="text-2xl font-black uppercase tracking-wider text-blue-950 mb-6 flex items-center gap-3" [ngStyle]="{'color': resume().themeColor}">Skills <div class="h-1 flex-1 bg-slate-200"></div></h3>
                            <div class="grid grid-cols-2 gap-x-6 gap-y-3 text-[14px] text-slate-700 font-bold">
                               @for(skill of resume().skills; track skill.id) { 
                                  <div class="flex items-center gap-3 bg-white px-4 py-2 rounded shadow-sm border border-slate-100"><div class="w-2 h-2 bg-slate-300 rounded-sm transform rotate-45"></div>{{skill.name}}</div> 
                               }
                            </div>
                         </div>
                      }
                   </div>
                   
                   <!-- Chevron Bottom Right overlay -->
                   <div class="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none z-0 transform rotate-12 scale-150 relative">
                       <mat-icon class="text-[400px] w-full h-full text-blue-950" [ngStyle]="{'color': resume().themeColor}">fast_forward</mat-icon>
                   </div>
               </div>
            </div>
          }

          @case ('blush-minimal') {
            <div class="bg-white flex flex-col h-[297mm] overflow-hidden text-slate-800 font-sans p-10 pt-16">
               <div class="text-center relative mb-14 border-b border-slate-200 pb-10">
                  <!-- Ghost text background -->
                  <div class="absolute inset-0 flex items-center justify-center opacity-[0.08] font-serif italic text-[140px] text-pink-500 pointer-events-none transform -rotate-2 select-none" [ngStyle]="{'color': resume().themeColor}">
                     {{ resume().personalInfo.fullName.substring(0, 3) || 'SAM' }}
                  </div>
                  <h1 class="text-[3.5rem] font-black tracking-[0.2em] uppercase text-slate-800 mb-4 z-10 relative">{{ resume().personalInfo.fullName || 'YOUR NAME' }}</h1>
                  <h2 class="text-xl tracking-[0.3em] font-bold text-slate-500 z-10 relative uppercase">{{ resume().personalInfo.jobTitle || 'PROFESSIONAL TITLE' }}</h2>
               </div>

               <div class="flex flex-1 gap-12">
                  <!-- Left Col -->
                  <div class="w-[35%] bg-pink-50/50 p-8 rounded-xl border border-pink-100" [ngStyle]="{'background-color': resume().themeColor + '10', 'border-color': resume().themeColor + '20'}">
                     <div class="space-y-12">
                        @if(resume().personalInfo.photoUrl){
                           <div class="w-40 h-40 rounded-full mx-auto overflow-hidden shadow-lg border-4 border-white shrink-0">
                              <img [src]="resume().personalInfo.photoUrl" alt="Profile" class="w-full h-full object-cover" crossorigin="anonymous" referrerpolicy="no-referrer">
                           </div>
                        }

                        <div>
                           <h3 class="text-lg font-bold tracking-[0.2em] uppercase mb-6 text-slate-800 flex items-center gap-3">Contact <div class="h-px flex-1 bg-slate-300"></div></h3>
                           <div class="space-y-4 text-[13px] text-slate-600 font-medium break-words">
                              @if(resume().personalInfo.phone){ <div class="flex items-center gap-4 border border-slate-200 bg-white px-3 py-2 rounded-lg"><mat-icon class="text-slate-400 w-4 h-4 text-[18px]">phone</mat-icon> {{resume().personalInfo.phone}}</div> }
                              @if(resume().personalInfo.email){ <div class="flex items-center gap-4 border border-slate-200 bg-white px-3 py-2 rounded-lg"><mat-icon class="text-slate-400 w-4 h-4 text-[18px]">email</mat-icon> <span class="break-all">{{resume().personalInfo.email}}</span></div> }
                              @if(resume().personalInfo.location){ <div class="flex items-center gap-4 border border-slate-200 bg-white px-3 py-2 rounded-lg"><mat-icon class="text-slate-400 w-4 h-4 text-[18px]">location_on</mat-icon> {{resume().personalInfo.location}}</div> }
                           </div>
                        </div>

                        @if(resume().qualifications.length > 0){
                           <div>
                              <h3 class="text-lg font-bold tracking-[0.2em] uppercase mb-6 text-slate-800 flex items-center gap-3">Education <div class="h-px flex-1 bg-slate-300"></div></h3>
                              <div class="space-y-6">
                                 @for(qual of resume().qualifications; track qual.id) {
                                    <div class="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                                       <div class="font-extrabold text-slate-800 uppercase tracking-widest text-[11px] mb-1.5 text-pink-600" [ngStyle]="{'color': resume().themeColor}">{{ qual.institution }}</div>
                                       <div class="text-slate-500 font-bold text-[11px] mb-1 bg-slate-100 tracking-wider inline-block px-2 py-0.5 rounded">{{ qual.startDate }} - {{ qual.current ? 'Present' : qual.endDate }}</div>
                                       <div class="text-slate-700 font-bold text-[13px] leading-snug mt-1">{{ qual.degree }} in {{ qual.fieldOfStudy }}</div>
                                       @if(qual.grade) { <div class="text-[11px] font-bold text-slate-500 mt-2 border-t border-slate-100 pt-1">Grade: <span class="text-slate-700">{{qual.grade}}</span></div> }
                                    </div>
                                 }
                              </div>
                           </div>
                        }

                        @if(resume().skills.length > 0){
                           <div>
                              <h3 class="text-lg font-bold tracking-[0.2em] uppercase mb-6 text-slate-800 flex items-center gap-3">Skills <div class="h-px flex-1 bg-slate-300"></div></h3>
                              <ul class="space-y-2.5 text-slate-600 font-bold text-[13px]">
                                 @for(skill of resume().skills; track skill.id) { 
                                    <li class="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm"><div class="w-1.5 h-1.5 bg-pink-400 rounded-full" [ngStyle]="{'background-color': resume().themeColor}"></div>{{skill.name}}</li> 
                                 }
                              </ul>
                           </div>
                        }
                     </div>
                  </div>

                  <!-- Right Col -->
                  <div class="w-[65%] pt-4 space-y-12">
                     @if(resume().about){
                        <div>
                           <h3 class="text-2xl font-black tracking-[0.15em] uppercase mb-6 text-slate-800">Summary</h3>
                           <p class="text-[14px] text-slate-600 leading-relaxed font-medium text-justify column-2">{{resume().about}}</p>
                        </div>
                     }

                     @if(resume().projects.length > 0){
                        <div>
                           <h3 class="text-2xl font-black tracking-[0.15em] uppercase mb-8 text-slate-800">Experience</h3>
                           <div class="space-y-10 border-l border-slate-200 pl-8 ml-2 relative">
                               @for(proj of resume().projects; track proj.id) {
                                  <div class="relative">
                                     <div class="absolute -left-[37px] top-1 w-2.5 h-2.5 bg-slate-300 rounded-full ring-4 ring-white"></div>
                                     <h4 class="font-bold text-xl text-slate-800 tracking-wide uppercase mb-1">{{ proj.name }}</h4>
                                     <div class="font-bold text-slate-400 text-[12px] mb-3 uppercase tracking-widest">Project / Role</div>
                                     @if(proj.url){ <a [href]="proj.url" class="text-blue-500 font-bold text-[12px] mb-3 block hover:underline tracking-wide">{{proj.url}}</a> }
                                     <p class="text-slate-600 font-medium text-[14px] leading-relaxed whitespace-pre-line text-justify">{{proj.description}}</p>
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
