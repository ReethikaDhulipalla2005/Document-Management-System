import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-100">
      <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold text-slate-800 mb-6 text-center">🗂️ DMS Login</h2>
        <div *ngIf="error" class="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{{error}}</div>
        <input [(ngModel)]="email" type="email" placeholder="Email"
          class="w-full border border-slate-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        <input [(ngModel)]="password" type="password" placeholder="Password"
          class="w-full border border-slate-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        <button (click)="login()" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">Login</button>
        <p class="text-center text-sm mt-4 text-slate-500">No account? <a routerLink="/register" class="text-blue-600 hover:underline">Register</a></p>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = ''; password = ''; error = '';
  constructor(private auth: AuthService, private router: Router) {}
  login() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => this.error = e.error.message || 'Login failed'
    });
  }
}