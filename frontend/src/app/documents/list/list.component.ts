import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-100">
      <nav class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-blue-700">🗂️ DMS</h1>
        <div class="flex gap-4">
          <a routerLink="/dashboard" class="text-slate-600 hover:text-blue-600 text-sm">Dashboard</a>
          <a routerLink="/upload" class="text-slate-600 hover:text-blue-600 text-sm">Upload</a>
        </div>
      </nav>
      <div class="max-w-5xl mx-auto mt-8 px-4">
        <div class="flex flex-wrap gap-3 mb-6">
          <input [(ngModel)]="search" (ngModelChange)="load()" placeholder="🔍 Search title..."
            class="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 min-w-[200px]"/>
          <input [(ngModel)]="tagFilter" (ngModelChange)="load()" placeholder="Filter by tag"
            class="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none flex-1 min-w-[150px]"/>
          <input [(ngModel)]="categoryFilter" (ngModelChange)="load()" placeholder="Filter by category"
            class="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none flex-1 min-w-[150px]"/>
        </div>
        <div class="grid gap-4">
          <div *ngFor="let doc of docs" class="bg-white rounded-xl shadow p-5 flex justify-between items-start">
            <div>
              <p class="font-semibold text-slate-800 text-lg">{{doc.title}}</p>
              <p class="text-sm text-slate-500 mt-1">📁 {{doc.category}}</p>
              <div class="flex gap-2 mt-2 flex-wrap">
                <span *ngFor="let tag of doc.tags" class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">#{{tag}}</span>
              </div>
              <p class="text-xs text-slate-400 mt-2">By {{doc.uploadedBy?.name}} · v{{doc.versions?.length}} · {{doc.createdAt | date:'mediumDate'}}</p>
            </div>
            <div class="flex flex-col gap-2 ml-4">
              <a [href]="'http://localhost:5000/uploads/' + doc.filename" target="_blank"
                class="text-blue-600 text-xs hover:underline">View</a>
              <button (click)="delete(doc._id)" class="text-red-500 text-xs hover:underline">Delete</button>
            </div>
          </div>
          <p *ngIf="!docs.length" class="text-center text-slate-400 py-10">No documents found.</p>
        </div>
      </div>
    </div>
  `
})
export class ListComponent implements OnInit {
  docs: any[] = []; search = ''; tagFilter = ''; categoryFilter = '';
  constructor(private docService: DocumentService) {}
  ngOnInit() { this.load(); }
  load() {
    this.docService.getAll({ search: this.search, tag: this.tagFilter, category: this.categoryFilter })
      .subscribe((data: any[]) => this.docs = data);
  }
  delete(id: string) {
    if (confirm('Delete this document?')) {
      this.docService.delete(id).subscribe(() => this.load());
    }
  }
}