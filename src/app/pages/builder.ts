import { Component, inject, OnInit, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeService } from '../services/resume.service';
import { ResumeFormComponent } from '../components/resume-form';
import { ResumePreviewComponent } from '../components/resume-preview';
import { Resume } from '../models/resume.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [CommonModule, ResumeFormComponent, ResumePreviewComponent, MatIconModule],
  template: `
    <div class="flex-1 flex flex-col bg-emerald-50 h-full overflow-hidden">
      <!-- Toolbar -->
      <div class="bg-white border-b border-emerald-100 px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center shrink-0 shadow-sm z-10 gap-3">
        <div class="flex items-center gap-2 sm:gap-4">
          <button (click)="goBack()" class="text-emerald-700 hover:text-emerald-900 flex items-center gap-1 text-sm font-bold transition-colors">
            <mat-icon class="text-sm w-4 h-4 leading-4">arrow_back</mat-icon> <span class="hidden sm:inline">Save work</span>
          </button>
          <div class="h-4 w-px bg-emerald-200"></div>
          <span class="text-sm text-emerald-600 font-medium">
            @if (isSaving) {
              <span class="flex items-center gap-1"><mat-icon class="text-sm w-4 h-4 leading-4 animate-spin">sync</mat-icon> Saving...</span>
            } @else {
              <span class="flex items-center gap-1"><mat-icon class="text-sm w-4 h-4 leading-4 text-emerald-500">check_circle</mat-icon> Saved</span>
            }
          </span>
        </div>
        
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Mobile Preview Toggle -->
          <button (click)="showPreview.set(!showPreview())" class="md:hidden px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl font-bold text-sm flex items-center gap-2">
            <mat-icon class="text-sm w-4 h-4 leading-4">{{ showPreview() ? 'edit' : 'visibility' }}</mat-icon>
            {{ showPreview() ? 'Edit' : 'Preview' }}
          </button>

          <div class="relative">
            <input type="file" id="template-upload" class="hidden" (change)="onTemplateUpload($event)" accept=".json">
            <label for="template-upload" class="px-4 sm:px-5 py-2 sm:py-2.5 bg-yellow-400 text-emerald-900 hover:bg-yellow-500 rounded-xl font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-sm text-sm" title="Upload Template">
              <mat-icon class="text-sm w-4 h-4 leading-4">upload_file</mat-icon>
              <span class="hidden sm:inline">Upload Template</span>
            </label>
          </div>
          <button (click)="downloadPDF()" [disabled]="isGeneratingPDF" class="bg-emerald-900 hover:bg-emerald-800 disabled:bg-emerald-400 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all text-sm shadow-lg shadow-emerald-900/20">
            @if (isGeneratingPDF) {
              <mat-icon class="text-sm w-4 h-4 leading-4 animate-spin">sync</mat-icon> <span class="hidden sm:inline">Generating...</span>
            } @else {
              <mat-icon class="text-sm w-4 h-4 leading-4">download</mat-icon> <span class="hidden sm:inline">Download PDF</span>
            }
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 flex overflow-hidden relative">
        <!-- Left: Form -->
        <div class="w-full md:w-[450px] lg:w-[500px] shrink-0 h-full border-r border-emerald-100 bg-white absolute md:relative z-10 transition-transform duration-300"
             [class.-translate-x-full]="showPreview()"
             [class.md:translate-x-0]="true">
          @if (resumeService.currentResume()) {
            <app-resume-form 
              [resume]="resumeService.currentResume()!" 
              (resumeChange)="onResumeChange($event)">
            </app-resume-form>
          }
        </div>

        <!-- Right: Preview -->
        <div class="flex-1 h-full relative bg-emerald-50/50 w-full absolute md:relative transition-transform duration-300"
             [class.translate-x-full]="!showPreview()"
             [class.md:translate-x-0]="true">
          @if (resumeService.currentResume()) {
            <app-resume-preview #preview [resume]="resumeService.currentResume()!"></app-resume-preview>
          }
        </div>
      </div>
    </div>
  `
})
export class BuilderComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  resumeService = inject(ResumeService);
  
  @ViewChild('preview') previewComponent!: ResumePreviewComponent;
  
  isSaving = false;
  isGeneratingPDF = false;
  saveTimeout: ReturnType<typeof setTimeout> | null = null;
  showPreview = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.resumeService.setCurrentResume(id);
      if (!this.resumeService.currentResume()) {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  onResumeChange(updatedResume: Resume) {
    this.isSaving = true;
    
    // Debounce save to avoid too many writes
    if (this.saveTimeout) clearTimeout(this.saveTimeout);
    
    this.saveTimeout = setTimeout(() => {
      this.resumeService.updateResume(updatedResume);
      this.isSaving = false;
    }, 500);
  }

  onTemplateUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const templateData = JSON.parse(content);
          
          // Basic validation
          if (templateData && typeof templateData === 'object' && 'personalInfo' in templateData) {
            const currentResume = this.resumeService.currentResume();
            if (currentResume) {
              // Keep the current ID and title, but update everything else
              const updatedResume = {
                ...templateData,
                id: currentResume.id,
                title: currentResume.title
              };
              this.resumeService.updateResume(updatedResume);
              alert('Template loaded successfully!');
            }
          } else {
            alert('Invalid template format. Please upload a valid resume JSON file.');
          }
        } catch {
          alert('Error reading template file. Make sure you uploaded a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
    // Reset the input so the same file can be uploaded again if needed
    (event.target as HTMLInputElement).value = '';
  }

  async downloadPDF() {
    if (!this.previewComponent || this.isGeneratingPDF) return;
    
    this.isGeneratingPDF = true;
    
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = document.getElementById('resume-page');
      if (!element) throw new Error('Resume element not found');
      
      const opt = {
        margin:       0,
        filename:     (this.resumeService.currentResume()?.title || 'resume') + '.pdf',
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      };
      
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      this.isGeneratingPDF = false;
    }
  }
}
