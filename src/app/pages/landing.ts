import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResumeService } from '../services/resume.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="min-h-[calc(100vh-80px)] bg-emerald-50 flex flex-col relative overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div class="absolute top-40 -left-40 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <!-- Hero Section -->
      <section class="relative z-10 px-4 pt-20 pb-16 md:pt-32 md:pb-24 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold mb-8 border border-emerald-200 shadow-sm">
          <mat-icon class="text-sm w-4 h-4 leading-4 text-yellow-500">star</mat-icon>
          The #1 Professional Resume Builder
        </div>
        
        <h1 class="text-5xl md:text-7xl font-extrabold text-emerald-950 tracking-tight mb-6 leading-tight max-w-4xl">
          Craft your perfect resume in <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-yellow-500">minutes</span>
        </h1>
        
        <p class="text-xl text-emerald-800/80 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          Stand out from the crowd with ATS-friendly templates and a seamless, modern drag-and-drop builder. No sign-up required.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button (click)="getStarted()" class="w-full sm:w-auto px-10 py-4 bg-emerald-900 hover:bg-emerald-800 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-2 hover:-translate-y-1">
            Create Resume Now
            <mat-icon>arrow_forward</mat-icon>
          </button>
          <a href="#features" class="w-full sm:w-auto px-10 py-4 bg-white hover:bg-emerald-50 text-emerald-900 rounded-2xl font-bold text-lg transition-all shadow-sm border border-emerald-100 flex items-center justify-center gap-2">
            Learn More
          </a>
        </div>

        <!-- Hero Image Mockup -->
        <div class="mt-16 md:mt-24 w-full max-w-5xl relative">
          <div class="absolute inset-0 bg-gradient-to-t from-emerald-50 to-transparent z-10 h-full w-full bottom-0 top-auto"></div>
          <div class="bg-white p-2 md:p-4 rounded-t-3xl shadow-2xl border border-emerald-100 border-b-0 relative overflow-hidden">
            <div class="flex items-center gap-2 mb-4 px-2">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div class="bg-emerald-50 rounded-2xl h-[300px] md:h-[500px] w-full flex items-center justify-center border border-emerald-100 overflow-hidden relative">
               <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#10b981 1px, transparent 1px); background-size: 20px 20px;"></div>
               <div class="bg-white w-3/4 h-5/6 shadow-lg rounded-lg border border-emerald-100 p-8 flex flex-col gap-4 z-10 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                  <div class="w-1/3 h-6 bg-emerald-100 rounded"></div>
                  <div class="w-1/4 h-4 bg-emerald-50 rounded mb-4"></div>
                  <div class="w-full h-px bg-emerald-50 mb-4"></div>
                  <div class="w-full h-3 bg-emerald-50 rounded"></div>
                  <div class="w-5/6 h-3 bg-emerald-50 rounded"></div>
                  <div class="w-4/6 h-3 bg-emerald-50 rounded"></div>
               </div>
               <div class="bg-white w-3/4 h-5/6 shadow-lg rounded-lg border border-emerald-100 p-8 flex flex-col gap-4 z-20 absolute transform rotate-[2deg] hover:rotate-0 transition-transform duration-500">
                  <div class="flex gap-4 items-center mb-4">
                    <div class="w-16 h-16 bg-emerald-100 rounded-full"></div>
                    <div>
                      <div class="w-32 h-6 bg-emerald-900 rounded mb-2"></div>
                      <div class="w-24 h-4 bg-emerald-600 rounded"></div>
                    </div>
                  </div>
                  <div class="w-full h-px bg-emerald-100 mb-2"></div>
                  <div class="w-full h-3 bg-emerald-100 rounded"></div>
                  <div class="w-5/6 h-3 bg-emerald-100 rounded"></div>
                  <div class="w-4/6 h-3 bg-emerald-100 rounded"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-20 bg-white relative z-10 border-t border-emerald-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-emerald-950 mb-4">Everything you need to succeed</h2>
            <p class="text-lg text-emerald-800/70 max-w-2xl mx-auto">Our builder provides all the tools necessary to create a professional resume that gets you hired.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100 hover:border-yellow-400 transition-colors group">
              <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-700 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <mat-icon>description</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-emerald-950 mb-3">Premium Templates</h3>
              <p class="text-emerald-800/70 leading-relaxed">Choose from a wide variety of ATS-friendly designs that fit your industry perfectly.</p>
            </div>
            <div class="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100 hover:border-yellow-400 transition-colors group">
              <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-yellow-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <mat-icon>bolt</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-emerald-950 mb-3">Real-time Preview</h3>
              <p class="text-emerald-800/70 leading-relaxed">See your changes instantly as you type. Complete control over colors, fonts, and spacing.</p>
            </div>
            <div class="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100 hover:border-yellow-400 transition-colors group">
              <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-900 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <mat-icon>picture_as_pdf</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-emerald-950 mb-3">Pixel-Perfect PDF</h3>
              <p class="text-emerald-800/70 leading-relaxed">Download your resume as a high-quality, professional PDF that looks exactly like the preview.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How it Works -->
      <section class="py-20 bg-emerald-900 text-white relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">How it works</h2>
            <p class="text-lg text-emerald-200 max-w-2xl mx-auto">Build your resume in three simple steps.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <!-- Connecting line for desktop -->
            <div class="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-emerald-800 z-0"></div>

            <div class="relative z-10 flex flex-col items-center text-center">
              <div class="w-24 h-24 bg-emerald-800 rounded-full flex items-center justify-center text-3xl font-bold text-yellow-400 mb-6 border-4 border-emerald-900 shadow-xl">
                1
              </div>
              <h3 class="text-xl font-bold mb-3">Fill in your details</h3>
              <p class="text-emerald-200">Follow our simple step-by-step wizard to enter your information.</p>
            </div>

            <div class="relative z-10 flex flex-col items-center text-center">
              <div class="w-24 h-24 bg-emerald-800 rounded-full flex items-center justify-center text-3xl font-bold text-yellow-400 mb-6 border-4 border-emerald-900 shadow-xl">
                2
              </div>
              <h3 class="text-xl font-bold mb-3">Customize design</h3>
              <p class="text-emerald-200">Choose colors, fonts, and layouts to make it uniquely yours.</p>
            </div>

            <div class="relative z-10 flex flex-col items-center text-center">
              <div class="w-24 h-24 bg-emerald-800 rounded-full flex items-center justify-center text-3xl font-bold text-yellow-400 mb-6 border-4 border-emerald-900 shadow-xl">
                3
              </div>
              <h3 class="text-xl font-bold mb-3">Download PDF</h3>
              <p class="text-emerald-200">Export your pixel-perfect resume and start applying!</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-24 bg-yellow-400 relative z-10">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-4xl md:text-5xl font-extrabold text-emerald-950 mb-6">Ready to land your dream job?</h2>
          <p class="text-xl text-emerald-900/80 mb-10 font-medium">Join thousands of professionals who have successfully built their resumes with ResumeCraft.</p>
          <button (click)="getStarted()" class="px-12 py-5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-2xl font-bold text-xl transition-all shadow-xl shadow-emerald-900/20 hover:-translate-y-1 inline-flex items-center gap-3">
            Start Building Now
            <mat-icon>rocket_launch</mat-icon>
          </button>
        </div>
      </section>
    </div>
  `
})
export class LandingComponent {
  resumeService = inject(ResumeService);
  router = inject(Router);

  getStarted() {
    const id = this.resumeService.createResume();
    this.router.navigate(['/builder', id]);
  }
}
