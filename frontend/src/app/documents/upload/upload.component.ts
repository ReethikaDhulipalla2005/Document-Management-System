import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-100">
      <nav class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-blue-700">🗂️ DMS</h1>
        <div class="flex gap-4">
          <a routerLink="/dashboard" class="text-slate-600 hover:text-blue-600 text-sm">Dashboard</a>
          <a routerLink="/documents" class="text-slate-600 hover:text-blue-600 text-sm">Documents</a>
        </div>
      </nav>
      <div class="max-w-xl mx-auto mt-10 px-4">
        <div class="bg-white rounded-2xl shadow p-8">
          <h2 class="text-2xl font-bold text-slate-800 mb-6">📤 Upload Document</h2>
          <div *ngIf="success" class="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">{{success}}</div>
          <div *ngIf="error" class="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{{error}}</div>
          <input [(ngModel)]="title" placeholder="Document Title *"
            class="w-full border border-slate-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <input [(ngModel)]="category" placeholder="Category (e.g. Finance, HR)"
            class="w-full border border-slate-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <input [(ngModel)]="tags" placeholder="Tags (comma separated: report, 2024)"
            class="w-full border border-slate-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <input type="file" (change)="onFileChange($event)"
            class="w-full border border-slate-300 rounded-lg px-4 py-2 mb-4 text-slate-600"/>
          <button (click)="upload()" [disabled]="loading"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50">
            {{loading ? 'Uploading...' : 'Upload Document'}}
          </button>
        </div>
      </div>
    </div>
  `
})
export class UploadComponent {
  title = ''; category = ''; tags = ''; file: File | null = null;
  loading = false; success = ''; error = '';
  constructor(private docService: DocumentService, private router: Router) {}
  onFileChange(e: any) { this.file = e.target.files[0]; }
  upload() {
    if (!this.title || !this.file) { this.error = 'Title and file are required'; return; }
    this.loading = true; this.error = ''; this.success = '';
    const fd = new FormData();
    fd.append('title', this.title);
    fd.append('category', this.category);
    fd.append('tags', this.tags);
    fd.append('file', this.file);
    this.docService.upload(fd).subscribe({
      next: () => { this.success = 'Document uploaded!'; this.loading = false; setTimeout(() => this.router.navigate(['/documents']), 1500); },
      error: (e) => { this.error = e.error.message || 'Upload failed'; this.loading = false; }
    });
  }
}