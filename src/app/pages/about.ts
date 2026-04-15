import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-[calc(100vh-144px)] bg-emerald-50 py-20 px-4">
      <div class="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 md:p-16 border border-emerald-100">
        <h1 class="text-4xl md:text-5xl font-bold text-emerald-900 mb-6 tracking-tight">About AS Co Limited</h1>
        
        <div class="space-y-6 text-lg text-emerald-800/80 leading-relaxed">
          <p>
            Welcome to <span class="font-bold text-emerald-900">ResumeCraft</span>, the premier resume building platform created by AS Co Limited. 
            We believe that crafting a professional, standout resume should be an effortless and inspiring experience.
          </p>
          
          <p>
            Our mission is to empower professionals worldwide to land their dream jobs by providing them with 
            top-tier, ATS-friendly templates and an intuitive, modern building experience. 
          </p>
          
          <div class="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 my-8">
            <h3 class="text-xl font-bold text-emerald-900 mb-3">Get in Touch</h3>
            <p class="text-emerald-800/80 mb-4">Have questions or need support? We're here to help.</p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a href="mailto:xylogleam@gmail.com" class="inline-flex items-center justify-center gap-2 bg-emerald-900 text-white px-6 py-3 rounded-xl hover:bg-emerald-800 transition-colors font-medium">
                Email Us
              </a>
              <a href="https://wa.me/923167546414" target="_blank" class="inline-flex items-center justify-center gap-2 bg-yellow-400 text-emerald-900 px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors font-bold">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {}
