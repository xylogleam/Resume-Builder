import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ResumeService } from '../services/resume.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, DatePipe],
  template: `
    <div class="min-h-[calc(100vh-144px)] bg-emerald-50 py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-10">
          <div>
            <h1 class="text-4xl font-bold text-emerald-950 tracking-tight">Your Resumes</h1>
            <p class="text-emerald-800/70 mt-2 font-medium">Manage and edit your saved resumes</p>
          </div>
          <button (click)="createNew()" class="bg-emerald-900 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2">
            <mat-icon>add</mat-icon>
            Create New
          </button>
        </div>

        @if (resumeService.resumes().length === 0) {
          <div class="bg-white rounded-3xl p-16 text-center border border-emerald-100 shadow-sm">
            <div class="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <mat-icon class="text-4xl text-emerald-300">description</mat-icon>
            </div>
            <h2 class="text-2xl font-bold text-emerald-950 mb-3">No resumes yet</h2>
            <p class="text-emerald-800/70 mb-8 max-w-md mx-auto">Create your first professional resume in minutes using our modern templates and easy-to-use builder.</p>
            <button (click)="createNew()" class="bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-yellow-400/20">
              Start Building
            </button>
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (resume of resumeService.resumes(); track resume.id) {
              <div class="bg-white rounded-2xl border border-emerald-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-900/5 hover:border-yellow-400 transition-all group flex flex-col">
                <div class="h-40 bg-emerald-50 border-b border-emerald-100 flex items-center justify-center relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-yellow-100/50"></div>
                  <mat-icon class="text-6xl text-emerald-200/50 z-10">description</mat-icon>
                  <div class="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/5 transition-colors z-20 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button (click)="editResume(resume.id)" class="bg-white text-emerald-900 font-bold px-6 py-2 rounded-lg shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                      Edit
                    </button>
                  </div>
                </div>
                <div class="p-6 flex-1 flex flex-col">
                  <h3 class="font-bold text-lg text-emerald-950 mb-1 truncate">{{ resume.title }}</h3>
                  <p class="text-sm text-emerald-800/60 mb-4">Last edited {{ resume.lastModified | date:'mediumDate' }}</p>
                  
                  <div class="mt-auto flex justify-between items-center pt-4 border-t border-emerald-50">
                    <span class="text-xs font-medium px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md capitalize">
                      {{ resume.templateId }} template
                    </span>
                    <button (click)="deleteResume(resume.id)" class="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
                      <mat-icon class="text-[20px] w-5 h-5 leading-5">delete</mat-icon>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  resumeService = inject(ResumeService);
  router = inject(Router);

  ngOnInit() {
    this.resumeService.loadResumes();
  }

  createNew() {
    const id = this.resumeService.createResume();
    this.router.navigate(['/builder', id]);
  }

  editResume(id: string) {
    this.router.navigate(['/builder', id]);
  }

  deleteResume(id: string) {
    this.resumeService.deleteResume(id);
  }
}
