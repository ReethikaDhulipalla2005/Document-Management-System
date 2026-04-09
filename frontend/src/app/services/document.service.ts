import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private api = 'http://localhost:5000/api/documents';

  constructor(private http: HttpClient) {}

  getAll(filters?: { search?: string; tag?: string; category?: string }) {
    let params = new HttpParams();
    if (filters?.search) params = params.set('search', filters.search);
    if (filters?.tag) params = params.set('tag', filters.tag);
    if (filters?.category) params = params.set('category', filters.category);
    return this.http.get<any[]>(this.api, { params });
  }

  getOne(id: string) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  upload(formData: FormData) {
    return this.http.post(this.api, formData);
  }

  update(id: string, formData: FormData) {
    return this.http.put(`${this.api}/${id}`, formData);
  }

  delete(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}