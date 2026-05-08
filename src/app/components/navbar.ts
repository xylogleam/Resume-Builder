import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ResumeService } from '../services/resume.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  template: `
    <nav class="bg-emerald-900 border-b border-emerald-800 sticky top-0 z-50 shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20">
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center gap-3">
              <div class="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-emerald-900 font-bold text-xl shadow-sm">
                R
              </div>
              <span class="font-bold text-2xl tracking-tight text-white">Resume<span class="text-yellow-400">Craft</span></span>
            </a>
          </div>
          
          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-8">
            <a routerLink="/" class="text-emerald-50 hover:text-yellow-400 font-medium text-sm transition-colors">Home</a>
            <a routerLink="/history" class="text-emerald-50 hover:text-yellow-400 font-medium text-sm transition-colors">History</a>
            <a routerLink="/about" class="text-emerald-50 hover:text-yellow-400 font-medium text-sm transition-colors">About us</a>
            
            <div class="flex items-center gap-4 ml-4 pl-8 border-l border-emerald-700/50">
              <button (click)="createResume()" class="bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-yellow-400/20 ml-2">
                Create Resume
              </button>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <div class="flex items-center md:hidden">
            <button (click)="isMobileMenuOpen.set(!isMobileMenuOpen())" class="text-emerald-50 hover:text-yellow-400 p-2">
              <mat-icon>{{ isMobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (isMobileMenuOpen()) {
        <div class="md:hidden bg-emerald-900 border-t border-emerald-800 px-4 pt-2 pb-6 space-y-4 shadow-xl absolute w-full">
          <a routerLink="/" (click)="isMobileMenuOpen.set(false)" class="block text-emerald-50 hover:text-yellow-400 font-medium py-2">Home</a>
          <a routerLink="/history" (click)="isMobileMenuOpen.set(false)" class="block text-emerald-50 hover:text-yellow-400 font-medium py-2">History</a>
          <a routerLink="/about" (click)="isMobileMenuOpen.set(false)" class="block text-emerald-50 hover:text-yellow-400 font-medium py-2">About us</a>
          
          <button (click)="createResume()" class="w-full mt-4 bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-yellow-400/20">
            Create Resume
          </button>
        </div>
      }
    </nav>
  `
})
export class NavbarComponent {
  resumeService = inject(ResumeService);
  router = inject(Router);
  isMobileMenuOpen = signal(false);

  createResume() {
    this.isMobileMenuOpen.set(false);
    const id = this.resumeService.createResume();
    this.router.navigate(['/builder', id]);
  }
}
