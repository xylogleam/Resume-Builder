import { Injectable, signal } from '@angular/core';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);
  
  constructor() {
    const savedUser = localStorage.getItem('resume_user');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  login() {
    // Mock login since Firebase provisioning failed
    const mockUser: User = {
      uid: 'user_' + Math.random().toString(36).substr(2, 9),
      email: 'demo@example.com',
      displayName: 'Demo User',
      photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    };
    localStorage.setItem('resume_user', JSON.stringify(mockUser));
    this.currentUser.set(mockUser);
  }

  logout() {
    localStorage.removeItem('resume_user');
    this.currentUser.set(null);
  }
}
