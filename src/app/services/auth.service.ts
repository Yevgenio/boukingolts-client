import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${CONFIG.apiBaseUrl}/api/auth`;
  private uploadUrl = `${CONFIG.apiBaseUrl}/api/uploads`;

  constructor(private http: HttpClient) {}

  // Sign up a new user
  signUp(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  // Login the user
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // Get the profile of the logged-in user
  settings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/settings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
  

  // Logout user by removing the token
  logout(): void {
    localStorage.removeItem('token');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists
  }

  // Check if the logged-in user is an admin
  isAdmin(): Observable<boolean> {
    return this.http.get<{ role: string }>(`${this.baseUrl}/check-admin`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).pipe(
      map(response => response.role === 'admin'),
      catchError(() => of(false)) // Return false in case of any error
    );
  }

    // // Check if the logged-in user is an admin
    // isAdmin(): Observable<boolean> {
    //   return this.http.get<boolean>(`${this.apiUrl}/check-admin`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('token')}`,
    //     },
    //   });
    // }
}
