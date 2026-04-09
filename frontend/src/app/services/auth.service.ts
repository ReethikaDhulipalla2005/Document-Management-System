import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any) {
    return this.http.post(`${this.api}/register`, data).pipe(
      tap((res: any) => this.saveSession(res))
    );
  }

  login(data: any) {
    return this.http.post(`${this.api}/login`, data).pipe(
      tap((res: any) => this.saveSession(res))
    );
  }

  private saveSession(res: any) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getToken() { return localStorage.getItem('token'); }
  getUser() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }
  isLoggedIn() { return !!this.getToken(); }
}