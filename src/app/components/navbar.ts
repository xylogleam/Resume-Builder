import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

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
            <a routerLink="/dashboard" class="text-emerald-50 hover:text-yellow-400 font-medium text-sm transition-colors">Save work</a>
            <a routerLink="/about" class="text-emerald-50 hover:text-yellow-400 font-medium text-sm transition-colors">About us</a>
            
            <div class="flex items-center gap-4 ml-4 pl-8 border-l border-emerald-700/50">
              <a href="mailto:xylogleam@gmail.com" class="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-100 hover:bg-yellow-400 hover:text-emerald-900 transition-all shadow-sm" title="Email Us">
                <mat-icon>email</mat-icon>
              </a>
              <a href="https://wa.me/923167546414" target="_blank" class="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-100 hover:bg-yellow-400 hover:text-emerald-900 transition-all shadow-sm" title="WhatsApp Us">
                <mat-icon>chat</mat-icon>
              </a>
              <button routerLink="/dashboard" class="bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-yellow-400/20 ml-2">
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
          <a routerLink="/dashboard" (click)="isMobileMenuOpen.set(false)" class="block text-emerald-50 hover:text-yellow-400 font-medium py-2">Save work</a>
          <a routerLink="/about" (click)="isMobileMenuOpen.set(false)" class="block text-emerald-50 hover:text-yellow-400 font-medium py-2">About us</a>
          
          <div class="flex items-center gap-4 pt-4 border-t border-emerald-800">
            <a href="mailto:xylogleam@gmail.com" class="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-100 hover:bg-yellow-400 hover:text-emerald-900 transition-all shadow-sm" title="Email Us">
              <mat-icon>email</mat-icon>
            </a>
            <a href="https://wa.me/923167546414" target="_blank" class="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-100 hover:bg-yellow-400 hover:text-emerald-900 transition-all shadow-sm" title="WhatsApp Us">
              <mat-icon>chat</mat-icon>
            </a>
          </div>
          <button routerLink="/dashboard" (click)="isMobileMenuOpen.set(false)" class="w-full mt-4 bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-yellow-400/20">
            Create Resume
          </button>
        </div>
      }
    </nav>
  `
})
export class NavbarComponent {
  isMobileMenuOpen = signal(false);
}
