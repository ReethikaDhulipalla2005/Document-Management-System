import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-100">
      <nav class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-blue-700">🗂️ DMS</h1>
        <div class="flex gap-4 items-center">
          <a routerLink="/documents" class="text-slate-600 hover:text-blue-600 text-sm">Documents</a>
          <a routerLink="/upload" class="text-slate-600 hover:text-blue-600 text-sm">Upload</a>
          <span class="text-slate-500 text-sm">{{user?.name}} ({{user?.role}})</span>
          <button (click)="logout()" class="text-red-500 text-sm hover:underline">Logout</button>
        </div>
      </nav>
      <div class="max-w-4xl mx-auto mt-10 px-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-xl p-6 shadow text-center">
            <p class="text-4xl font-bold text-blue-600">{{totalDocs}}</p>
            <p class="text-slate-500 mt-1">Total Documents</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow text-center">
            <p class="text-4xl font-bold text-green-600">{{user?.role | titlecase}}</p>
            <p class="text-slate-500 mt-1">Your Role</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow text-center">
            <a routerLink="/upload" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold">+ Upload Document</a>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow p-6">
          <h2 class="text-lg font-semibold text-slate-700 mb-4">Recent Documents</h2>
          <div *ngFor="let doc of recentDocs" class="flex justify-between items-center py-3 border-b last:border-0">
            <div>
              <p class="font-medium text-slate-800">{{doc.title}}</p>
              <p class="text-xs text-slate-400">{{doc.category}} · {{doc.tags?.join(', ')}}</p>
            </div>
            <span class="text-xs text-slate-400">{{doc.createdAt | date:'mediumDate'}}</span>
          </div>
          <p *ngIf="!recentDocs.length" class="text-slate-400 text-center py-4">No documents yet.</p>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  user: any; totalDocs = 0; recentDocs: any[] = [];
  constructor(private auth: AuthService, private docService: DocumentService) {}
  ngOnInit() {
    this.user = this.auth.getUser();
    this.docService.getAll().subscribe((docs: any[]) => {
      this.totalDocs = docs.length;
      this.recentDocs = docs.slice(0, 5);
    });
  }
  logout() { this.auth.logout(); }
}