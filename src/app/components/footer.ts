import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-emerald-950 text-emerald-200 py-8 border-t border-emerald-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-sm font-medium tracking-wide">
          &copy; {{ currentYear }} <span class="color-animate font-bold">AS Co Limited</span>. All rights reserved.
        </p>
      </div>
    </footer>
  `,
  styles: [`
    @keyframes colorCycle {
      0% { color: #34d399; } 
      33% { color: #facc15; } 
      66% { color: #38bdf8; } 
      100% { color: #34d399; }
    }
    .color-animate {
      animation: colorCycle 3s infinite linear;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
