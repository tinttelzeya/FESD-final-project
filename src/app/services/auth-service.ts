import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/student/login';

  constructor(private http: HttpClient) {}

  // Login
login(credentials: { email: string; password: string }): Observable<any> {
  // Mock login for testing without backend
  sessionStorage.setItem('access_token', 'mock_token_123');
  return new Observable(observer => {
    observer.next({ token: 'mock_token_123' });
    observer.complete();
  });
}

  logout(): void {
    sessionStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('access_token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }
  
}
