import { Component, input, ElementRef, ViewChild, signal, effect, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Resume } from '../models/resume.model';

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="h-full overflow-y-auto flex justify-center p-4 md:p-8 bg-gray-100 flex-1 relative print:bg-white print:p-0">
      <div #resumePage id="resume-page" 
           class="pdf-bg-white pdf-shadow-2xl w-[210mm] h-[297mm] shrink-0 relative overflow-hidden flex flex-col items-center" 
           [ngStyle]="{'font-family': resume().fontFamily}">
        
        <div #scaleWrapper class="w-full origin-top transition-transform duration-300 text-black pb-8 break-words"
             [ngStyle]="{
               'transform': 'scale(' + contentScale() + ')',
               'font-size': resume().textSize, 
               'line-height': resume().lineSpacing,
               'color': '#000000',
               'overflow-wrap': 'anywhere'
             }">
          
          @switch (getLayoutType(resume().templateId)) {
            @case ('sidebar-left') {
              <div class="flex min-h-[297mm] bg-white font-sans">
                 <!-- Left Sidebar -->
                 <div class="w-[35%] p-8" [ngStyle]="{'background-color': resume().themeColor}">
                     @if (resume().personalInfo.photoUrl) {
                        <div class="flex justify-center mb-6">
                          <img [src]="resume().personalInfo.photoUrl" alt="Profile Photo" class="w-32 h-32 rounded-full border-4 border-white object-cover">
                        </div>
                     }
                     <h3 class="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4" [ngStyle]="{'color': getContrastText(resume().themeColor), 'border-color': getContrastText(resume().themeColor)}">Contact</h3>
                     <div class="space-y-3 text-sm mb-8" [ngStyle]="{'color': getContrastText(resume().themeColor)}">
                        @if (resume().personalInfo.email) { <div class="flex gap-2 items-center"><mat-icon class="w-4 h-4 text-[16px]" [ngStyle]="{'color': getContrastText(resume().themeColor)}">email</mat-icon> <span class="break-all">{{resume().personalInfo.email}}</span></div> }
                        @if (resume().personalInfo.phone) { <div class="flex gap-2 items-center"><mat-icon class="w-4 h-4 text-[16px]" [ngStyle]="{'color': getContrastText(resume().themeColor)}">phone</mat-icon> {{resume().personalInfo.phone}}</div> }
                        @if (resume().personalInfo.location) { <div class="flex gap-2 items-center"><mat-icon class="w-4 h-4 text-[16px]" [ngStyle]="{'color': getContrastText(resume().themeColor)}">location_on</mat-icon> {{resume().personalInfo.location}}</div> }
                        @if (resume().personalInfo.linkedin) { <div class="flex gap-2 items-center"><mat-icon class="w-4 h-4 text-[16px]" [ngStyle]="{'color': getContrastText(resume().themeColor)}">link</mat-icon> {{resume().personalInfo.linkedin}}</div> }
                        @if (resume().personalInfo.github) { <div class="flex gap-2 items-center"><mat-icon class="w-4 h-4 text-[16px]" [ngStyle]="{'color': getContrastText(resume().themeColor)}">code</mat-icon> {{resume().personalInfo.github}}</div> }
                        @if (resume().personalInfo.website) { <div class="flex gap-2 items-center"><mat-icon class="w-4 h-4 text-[16px]" [ngStyle]="{'color': getContrastText(resume().themeColor)}">language</mat-icon> {{resume().personalInfo.website}}</div> }
                     </div>
  
                     @if (resume().skills.length > 0) {
                        <h3 class="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 mt-6" [ngStyle]="{'color': getContrastText(resume().themeColor), 'border-color': getContrastText(resume().themeColor)}">Skills</h3>
                        <ul class="space-y-2 text-sm list-disc pl-4" [ngStyle]="{'color': getContrastText(resume().themeColor)}">
                           @for (skill of resume().skills; track skill.id) { <li>{{skill.name}}</li> }
                        </ul>
                     }
  
                     @if (resume().languages.length > 0) {
                        <h3 class="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 mt-6" [ngStyle]="{'color': getContrastText(resume().themeColor), 'border-color': getContrastText(resume().themeColor)}">Languages</h3>
                        <ul class="space-y-2 text-sm list-disc pl-4" [ngStyle]="{'color': getContrastText(resume().themeColor)}">
                           @for (lang of resume().languages; track lang.id) { <li>{{lang.name}}</li> }
                        </ul>
                     }
  
                     @if (resume().references.length > 0) {
                        <h3 class="text-xl font-bold uppercase tracking-widest border-b pb-2 mb-4 mt-8" [ngStyle]="{'color': getContrastText(resume().themeColor), 'border-color': getContrastText(resume().themeColor)}">References</h3>
                        <div class="space-y-4 text-sm" [ngStyle]="{'color': getContrastText(resume().themeColor)}">
                           @for (ref of resume().references; track ref.id) { 
                              <div>
                                 <div class="font-bold">{{ref.name}}</div>
                                 <div class="text-xs">{{ref.position}}, {{ref.company}}</div>
                                 @if(ref.email){ <div class="text-xs pt-1 break-all">{{ref.email}}</div> }
                                 @if(ref.phone){ <div class="text-xs">{{ref.phone}}</div> }
                              </div>
                           }
                        </div>
                     }
                 </div>
                 
                 <!-- Right Content -->
                 <div class="w-[65%] p-10 pt-16 text-black">
                    <h1 class="text-5xl font-black uppercase tracking-tight mb-2 text-black">{{resume().personalInfo.fullName || 'Your Name'}}</h1>
                    <h2 class="text-2xl uppercase tracking-widest mb-8 text-black">{{resume().personalInfo.jobTitle || 'Job Title'}}</h2>
  
                    @if (resume().about) {
                       <h3 class="text-lg font-bold uppercase tracking-widest mb-4 border-b-2 pb-1 inline-block text-black" [ngStyle]="{'border-color': resume().themeColor}">Profile</h3>
                       <p class="leading-relaxed text-sm mb-8 whitespace-pre-wrap text-black">{{resume().about}}</p>
                    }
  
                    @if (resume().qualifications.length > 0) {
                       <h3 class="text-lg font-bold uppercase tracking-widest mb-4 border-b-2 pb-1 inline-block mt-4 text-black" [ngStyle]="{'border-color': resume().themeColor}">Education</h3>
                       <div class="space-y-4 mb-8">
                          @for (qual of resume().qualifications; track qual.id) {
                             <div class="border-l-2 pl-4" [ngStyle]="{'border-color': resume().themeColor}">
                                <h4 class="font-bold text-black text-lg">{{qual.degree}} in {{qual.fieldOfStudy}}</h4>
                                <div class="text-black text-sm font-medium">{{qual.institution}} | {{qual.startDate}} - {{qual.current ? 'Present' : qual.endDate}}</div>
                                @if(qual.grade){ <div class="text-xs mt-1 bg-gray-100 px-2 py-0.5 inline-block rounded font-medium text-black">{{qual.grade}}</div> }
                                @if(qual.description){ <p class="text-sm text-black mt-2 whitespace-pre-wrap">{{qual.description}}</p> }
                             </div>
                          }
                       </div>
                    }
  
                    @if (resume().experiences && resume().experiences.length > 0) {
                       <h3 class="text-lg font-bold uppercase tracking-widest mb-4 border-b-2 pb-1 inline-block mt-4 text-black" [ngStyle]="{'border-color': resume().themeColor}">Experience</h3>
                       <div class="space-y-4 mb-8">
                          @for (exp of resume().experiences; track exp.id) {
                             <div class="border-l-2 pl-4" [ngStyle]="{'border-color': resume().themeColor}">
                                <h4 class="font-bold text-black text-lg">{{exp.position}}</h4>
                                <div class="text-black text-sm font-medium">{{exp.company}} | {{exp.startDate}} - {{exp.current ? 'Present' : exp.endDate}}</div>
                                @if(exp.location){ <div class="text-xs text-black italic">{{exp.location}}</div> }
                                @if(exp.description){ <p class="text-sm text-black mt-2 whitespace-pre-wrap">{{exp.description}}</p> }
                             </div>
                          }
                       </div>
                    }

                    @if (resume().projects.length > 0) {
                       <h3 class="text-lg font-bold uppercase tracking-widest mb-4 border-b-2 pb-1 inline-block mt-4 text-black" [ngStyle]="{'border-color': resume().themeColor}">Projects</h3>
                       <div class="space-y-4 mb-8">
                          @for (proj of resume().projects; track proj.id) {
                             <div class="border-l-2 pl-4" [ngStyle]="{'border-color': resume().themeColor}">
                                <div class="flex justify-between items-baseline flex-wrap gap-2">
                                   <h4 class="font-bold text-black text-lg">{{proj.name}}</h4>
                                   @if(proj.url){ <a [href]="proj.url" class="text-xs text-black underline break-all">{{proj.url}}</a> }
                                </div>
                                <p class="text-sm text-black mt-2 whitespace-pre-wrap">{{proj.description}}</p>
                             </div>
                          }
                       </div>
                    }
                 </div>
              </div>
            }
  
            @case ('top-header') {
              <div class="flex flex-col min-h-[297mm] bg-white font-sans text-black">
                 <!-- Top Header -->
                 <div class="w-full p-10 text-center relative" [ngStyle]="{'background-color': resume().themeColor}">
                    <div class="relative z-10 flex flex-col items-center">
                       @if (resume().personalInfo.photoUrl) {
                          <div class="mb-4">
                            <img [src]="resume().personalInfo.photoUrl" alt="Profile Photo" class="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover">
                          </div>
                       }
                       <h1 class="text-4xl md:text-5xl font-black uppercase tracking-widest mb-2" [ngStyle]="{'color': getContrastText(resume().themeColor)}">{{resume().personalInfo.fullName || 'Your Name'}}</h1>
                       <h2 class="text-xl tracking-[0.2em] font-medium uppercase mb-6" [ngStyle]="{'color': getContrastText(resume().themeColor)}">{{resume().personalInfo.jobTitle || 'Job Title'}}</h2>
                       
                       <div class="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium">
                          @if (resume().personalInfo.email) { <div class="flex gap-2 items-center" [ngStyle]="{'color': getContrastText(resume().themeColor)}"><mat-icon class="w-4 h-4 text-[16px]" [ngStyle]="{'color': getContrastText(resume().themeColor)}">email</mat-icon> {{resume().personalInfo.email}}</div> }
                          @if (resume().personalInfo.phone) { <div class="flex gap-2 items-center" [ngStyle]="{'color': getContrastText(resume().themeColor)}"><mat-icon class="w-4 h-4 text-[16px]" [ngStyle]="{'color': getContrastText(resume().themeColor)}">phone</mat-icon> {{resume().personalInfo.phone}}</div> }
                          @if (resume().personalInfo.location) { <div class="flex gap-2 items-center" [ngStyle]="{'color': getContrastText(resume().themeColor)}"><mat-icon class="w-4 h-4 text-[16px]" [ngStyle]="{'color': getContrastText(resume().themeColor)}">location_on</mat-icon> {{resume().personalInfo.location}}</div> }
                       </div>
                    </div>
                 </div>
  
                 <!-- Two Column Content below header -->
                 <div class="flex flex-1">
                   <!-- Main Column -->
                   <div class="w-[67%] p-10 pr-6">
                      @if (resume().about) {
                         <div class="mb-10 text-black">
                            <h3 class="text-xl font-extrabold uppercase tracking-widest mb-4 border-b-4 inline-block pb-1 text-black" [ngStyle]="{'border-color': resume().themeColor}">Profile</h3>
                            <p class="leading-relaxed text-[15px] whitespace-pre-wrap text-black">{{resume().about}}</p>
                         </div>
                      }
  
                      @if (resume().experiences && resume().experiences.length > 0) {
                         <div class="mb-10 text-black">
                            <h3 class="text-xl font-extrabold uppercase tracking-widest mb-6 border-b-4 inline-block pb-1 text-black" [ngStyle]="{'border-color': resume().themeColor}">Experience</h3>
                            <div class="space-y-8 text-black">
                               @for (exp of resume().experiences; track exp.id) {
                                  <div class="relative pl-6 border-l-2 border-gray-100 text-black">
                                     <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full" [ngStyle]="{'background-color': resume().themeColor}"></div>
                                     <h4 class="font-bold text-black text-lg leading-tight">{{exp.position}}</h4>
                                     <div class="text-sm font-bold opacity-80 mb-2">{{exp.company}} | {{exp.startDate}} - {{exp.current ? 'Present' : exp.endDate}}</div>
                                     <p class="text-[14px] text-black leading-relaxed whitespace-pre-wrap">{{exp.description}}</p>
                                  </div>
                               }
                            </div>
                         </div>
                      }
  
                      @if (resume().projects.length > 0) {
                         <div class="mb-10 text-black">
                            <h3 class="text-xl font-extrabold uppercase tracking-widest mb-6 border-b-4 inline-block pb-1 text-black" [ngStyle]="{'border-color': resume().themeColor}">Projects</h3>
                            <div class="space-y-8 text-black">
                               @for (proj of resume().projects; track proj.id) {
                                  <div class="relative pl-6 border-l-2 border-gray-100 text-black">
                                     <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full" [ngStyle]="{'background-color': resume().themeColor}"></div>
                                     <h4 class="font-bold text-black text-lg leading-tight">{{proj.name}}</h4>
                                     <p class="text-[14px] text-black mt-3 leading-relaxed whitespace-pre-wrap">{{proj.description}}</p>
                                  </div>
                               }
                            </div>
                         </div>
                      }
  
                      @if (resume().qualifications.length > 0) {
                         <div class="text-black">
                            <h3 class="text-xl font-extrabold uppercase tracking-widest mb-6 border-b-4 inline-block pb-1 text-black" [ngStyle]="{'border-color': resume().themeColor}">Education</h3>
                            <div class="space-y-8 text-black">
                               @for (qual of resume().qualifications; track qual.id) {
                                  <div class="relative pl-6 border-l-2 border-gray-100 text-black">
                                     <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full" [ngStyle]="{'background-color': resume().themeColor}"></div>
                                     <h4 class="font-bold text-black text-md uppercase tracking-wide">{{qual.institution}}</h4>
                                     <div class="text-black text-sm font-bold mt-1 uppercase">{{qual.degree}} in {{qual.fieldOfStudy}}</div>
                                     <div class="text-xs text-black font-bold mt-1 text-black">{{qual.startDate}} - {{qual.current ? 'Present' : qual.endDate}}</div>
                                     @if(qual.description){ <p class="text-[13px] text-black mt-2 whitespace-pre-wrap">{{qual.description}}</p> }
                                  </div>
                               }
                            </div>
                         </div>
                      }
                   </div>
                   
                   <!-- Sidebar Column -->
                   <div class="w-[33%] p-10 pl-6 bg-gray-50 flex flex-col gap-10 text-black">
                      @if (resume().skills.length > 0) {
                         <div>
                            <h3 class="text-xl font-extrabold uppercase tracking-widest mb-6 pb-1 border-b border-gray-200 text-black">Skills</h3>
                            <div class="flex flex-wrap gap-2 text-black">
                               @for (skill of resume().skills; track skill.id) { 
                                  <span class="bg-white border border-gray-200 text-black text-[12px] px-3 py-1.5 rounded-lg font-bold shadow-sm">{{skill.name}}</span> 
                               }
                            </div>
                         </div>
                      }
  
                      @if (resume().languages.length > 0) {
                         <div>
                            <h3 class="text-xl font-extrabold uppercase tracking-widest mb-6 pb-1 border-b border-gray-200 text-black">Languages</h3>
                            <ul class="space-y-3 text-sm text-black list-none text-black">
                               @for (lang of resume().languages; track lang.id) { 
                                  <li class="flex items-center gap-3 font-bold text-black">
                                     <div class="w-2 h-2 rounded-full" [ngStyle]="{'background-color': resume().themeColor}"></div>
                                     {{lang.name}}
                                  </li> 
                               }
                            </ul>
                         </div>
                      }
  
                      @if (resume().references.length > 0) {
                         <div>
                            <h3 class="text-xl font-extrabold uppercase tracking-widest mb-6 pb-1 border-b border-gray-200 text-black">References</h3>
                            <div class="space-y-4">
                               @for (ref of resume().references; track ref.id) { 
                                  <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-black">
                                     <div class="font-bold text-black text-sm leading-tight mb-1 text-black">{{ref.name}}</div>
                                     <div class="text-[11px] text-black font-bold mb-3 uppercase tracking-wider text-black">{{ref.position}}, {{ref.company}}</div>
                                     @if(ref.email){ <div class="text-[11px] text-black break-all">{{ref.email}}</div> }
                                     @if(ref.phone){ <div class="text-[11px] text-black">{{ref.phone}}</div> }
                                  </div>
                               }
                            </div>
                         </div>
                      }
                   </div>
                 </div>
              </div>
            }
  
            @case ('minimalist') {
               <div class="min-h-[297mm] bg-white font-serif text-black p-16">
                   <div class="text-center mb-12">
                      <h1 class="text-5xl font-normal tracking-wide uppercase mb-2 text-black">{{resume().personalInfo.fullName || 'Your Name'}}</h1>
                      <h2 class="text-xl italic text-black">{{resume().personalInfo.jobTitle || 'Job Title'}}</h2>
                      <div class="flex flex-wrap justify-center gap-4 mt-6 text-sm text-black">
                         @if (resume().personalInfo.email) { <span class="text-black break-all">{{resume().personalInfo.email}}</span> }
                         @if (resume().personalInfo.phone) { <span class="text-black">• {{resume().personalInfo.phone}}</span> }
                         @if (resume().personalInfo.location) { <span class="text-black">• {{resume().personalInfo.location}}</span> }
                      </div>
                   </div>
  
                   @if (resume().about) {
                      <div class="mb-10 text-center text-sm leading-loose text-black max-w-2xl mx-auto whitespace-pre-wrap">
                         {{resume().about}}
                      </div>
                   }
  
                   <div class="grid grid-cols-12 gap-8 text-black">
                       @if (resume().experiences && resume().experiences.length > 0) {
                          <div class="col-span-3 text-right">
                             <h3 class="text-sm font-bold uppercase tracking-[0.2em] text-black mt-1">Experience</h3>
                          </div>
                          <div class="col-span-9 space-y-8 text-black border-b border-gray-100 pb-8">
                             @for (exp of resume().experiences; track exp.id) {
                                <div>
                                   <h4 class="font-bold text-black uppercase">{{exp.position}}</h4>
                                   <div class="text-xs italic text-black mb-2">{{exp.company}} | {{exp.startDate}} - {{exp.current ? 'Present' : exp.endDate}}</div>
                                   <p class="text-sm text-black leading-relaxed whitespace-pre-wrap">{{exp.description}}</p>
                                </div>
                             }
                          </div>
                       }
                      <div class="col-span-3 text-right">
                         <h3 class="text-sm font-bold uppercase tracking-[0.2em] text-black mt-1">Projects</h3>
                      </div>
                      <div class="col-span-9 space-y-8 text-black">
                          @for (proj of resume().projects; track proj.id) {
                             <div>
                                <h4 class="font-bold text-black">{{proj.name}}</h4>
                                <p class="text-sm text-black mt-2 leading-relaxed whitespace-pre-wrap">{{proj.description}}</p>
                             </div>
                          }
                      </div>
  
                      <div class="col-span-3 text-right mt-4">
                         <h3 class="text-sm font-bold uppercase tracking-[0.2em] text-black mt-1">Education</h3>
                      </div>
                      <div class="col-span-9 space-y-6 mt-4 text-black">
                          @for (qual of resume().qualifications; track qual.id) {
                             <div class="text-black">
                                <h4 class="font-bold text-black">{{qual.institution}}</h4>
                                <div class="text-sm text-black italic">{{qual.degree}} in {{qual.fieldOfStudy}} ({{qual.startDate}} - {{qual.current ? 'Present' : qual.endDate}})</div>
                                @if(qual.description){ <p class="text-sm text-black mt-2 whitespace-pre-wrap text-black">{{qual.description}}</p> }
                             </div>
                          }
                      </div>
  
                      <div class="col-span-3 text-right mt-4">
                         <h3 class="text-sm font-bold uppercase tracking-[0.2em] text-black mt-1">Strengths</h3>
                      </div>
                      <div class="col-span-9 space-y-6 mt-4 grid grid-cols-2 gap-4 text-black">
                          <div class="text-black">
                             <div class="font-bold text-xs uppercase tracking-wider mb-2 text-black">Skills</div>
                             <ul class="text-sm text-black space-y-1 text-black">
                                @for (skill of resume().skills; track skill.id) { <li>{{skill.name}}</li> }
                             </ul>
                          </div>
                          <div class="text-black">
                             <div class="font-bold text-xs uppercase tracking-wider mb-2 text-black">Languages</div>
                             <ul class="text-sm text-black space-y-1 text-black">
                                @for (lang of resume().languages; track lang.id) { <li>{{lang.name}}</li> }
                             </ul>
                          </div>
                      </div>
  
                      @if (resume().references.length > 0) {
                        <div class="col-span-3 text-right mt-4">
                           <h3 class="text-sm font-bold uppercase tracking-[0.2em] text-black mt-1">References</h3>
                        </div>
                        <div class="col-span-9 mt-4 grid grid-cols-2 gap-6 text-black">
                            @for (ref of resume().references; track ref.id) {
                               <div class="text-black">
                                  <h4 class="font-bold text-black text-sm">{{ref.name}}</h4>
                                  <div class="text-xs text-black italic mb-1">{{ref.position}} at {{ref.company}}</div>
                                  @if(ref.email){ <div class="text-xs text-black break-all">{{ref.email}}</div> }
                                  @if(ref.phone){ <div class="text-xs text-black">{{ref.phone}}</div> }
                               </div>
                            }
                        </div>
                      }
  
                   </div>
               </div>
            }
          }
        </div>
      </div>
    </div>
  `
})
export class ResumePreviewComponent implements AfterViewInit {
  resume = input.required<Resume>();
  @ViewChild('resumePage') resumePage!: ElementRef;
  @ViewChild('scaleWrapper') scaleWrapper!: ElementRef;

  contentScale = signal(1);
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    effect(() => {
      // Re-trigger scale adjustment when resume data changes
      this.resume();
      setTimeout(() => this.adjustScale(), 100);
    }, { allowSignalWrites: true });
  }

  ngAfterViewInit() {
    this.setupResizeObserver();
    this.adjustScale();
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.adjustScale();
    });
    if (this.scaleWrapper) {
      this.resizeObserver.observe(this.scaleWrapper.nativeElement);
    }
  }

  private adjustScale() {
    if (!this.resumePage || !this.scaleWrapper) return;

    const pageElement = this.resumePage.nativeElement;
    const contentElement = this.scaleWrapper.nativeElement;
    
    // Clear scale to get true natural height
    this.contentScale.set(1);

    // Use requestAnimationFrame to let DOM update
    requestAnimationFrame(() => {
      const pageHeight = pageElement.clientHeight - 10; // 10px safety margin
      const contentHeight = contentElement.scrollHeight;
      
      if (contentHeight > pageHeight) {
        // Content exceeds one page height (297mm)
        const ratio = pageHeight / contentHeight;
        // Apply scale, but with a reasonable floor to maintain readability
        this.contentScale.set(Math.max(0.6, ratio));
      } else {
        // Content fits on one page
        this.contentScale.set(1);
      }
    });
  }

  getLayoutType(id: string): string {
     const sidebarTemplates = ['modern', 'creative', 'modern-blue', 'bold-teal', 'vibrant-yellow', 'dynamic-blue'];
     const headerTemplates = ['professional', 'corporate', 'elegant-green', 'modern-pro', 'classic-cream'];

     if (sidebarTemplates.includes(id)) return 'sidebar-left';
     if (headerTemplates.includes(id)) return 'top-header';
     return 'minimalist';
  }

  getContrastText(bgColor: string): string {
    return this.isColorLight(bgColor) ? '#000000' : '#ffffff';
  }

  isColorLight(color: string): boolean {
    if (!color) return true;
    // Simple hex brightness check using YIQ formula
    const hex = color.replace('#', '');
    
    let r = 0, g = 0, b = 0;
    if (hex.length === 3) {
      r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
      g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
      b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    } else {
      r = parseInt(hex.substr(0, 2), 16);
      g = parseInt(hex.substr(2, 2), 16);
      b = parseInt(hex.substr(4, 2), 16);
    }
    
    if (isNaN(r) || isNaN(g) || isNaN(b)) return true;
    
    // YIQ brightness formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155; // Threshold for shifting to dark text
  }
}

