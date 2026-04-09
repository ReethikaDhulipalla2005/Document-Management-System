import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-100">
      <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold text-slate-800 mb-6 text-center">📝 Create Account</h2>
        <div *ngIf="error" class="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{{error}}</div>
        <input [(ngModel)]="name" placeholder="Full Name"
          class="w-full border border-slate-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        <input [(ngModel)]="email" type="email" placeholder="Email"
          class="w-full border border-slate-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        <input [(ngModel)]="password" type="password" placeholder="Password"
          class="w-full border border-slate-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        <select [(ngModel)]="role" class="w-full border border-slate-300 rounded-lg px-4 py-2 mb-4 focus:outline-none">
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        <button (click)="register()" class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold">Register</button>
        <p class="text-center text-sm mt-4 text-slate-500">Have account? <a routerLink="/login" class="text-blue-600 hover:underline">Login</a></p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  name = ''; email = ''; password = ''; role = 'viewer'; error = '';
  constructor(private auth: AuthService, private router: Router) {}
  register() {
    this.auth.register({ name: this.name, email: this.email, password: this.password, role: this.role }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => this.error = e.error.message || 'Registration failed'
    });
  }
}