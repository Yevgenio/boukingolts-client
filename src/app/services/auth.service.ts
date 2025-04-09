import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${CONFIG.apiBaseUrl}/api/auth`;
  private uploadUrl = `${CONFIG.apiBaseUrl}/api/uploads`;

  private tokenSubject = new BehaviorSubject<string | null>(null); // Access Token
  private refreshToken: string | null = null; // Refresh Token

  constructor(private http: HttpClient) {}

  // Sign up a new user
  signUp(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  // Login the user
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Logged in:', response);
        this.saveCookies(response.username, response.token, response.refreshToken);
      })
    );
  }

  // Check token expiration
  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    return payload.exp < now;
  }
  

  // Refresh access token using refresh token
  refreshAccessToken(): Observable<any> {
    if (!this.refreshToken) {
      return of(null); // No refresh token available
    }
    return this.http.post('/api/auth/refresh', { refreshToken: this.refreshToken }).pipe(
      tap((response: any) => {
        this.saveCookies(response.username, response.token, this.refreshToken!); // Reuse existing refresh token
      }),
      catchError((err) => {
        console.error('Failed to refresh access token:', err);
        this.logout(); // Log out user if refresh token is invalid
        return of(null);
      })
    );
  }

  // Ensure a valid access token is available
  ensureValidToken(): Observable<string | null> {
    const accessToken = this.getToken();
    if (accessToken && !this.isTokenExpired(accessToken)) {
      return of(accessToken); // Return the existing valid token
    }
    // If token is expired, refresh it
    return this.refreshAccessToken().pipe(
      switchMap(() => of(this.getToken()))
    );
  }

  // Get the current token
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Get the current token
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // Save tokens to localStorage
  private saveCookies(username: string, accessToken: string, refreshToken: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    this.tokenSubject.next(accessToken);
  }

  // Get the profile of the logged-in user
  settings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/settings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  }
  

  // Logout
  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.tokenSubject.next(null);
    this.refreshToken = null;
  }


  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Check if the logged-in user is an admin
  isAdmin(): Observable<boolean> {
    return this.http.get<{ role: string }>(`${this.baseUrl}/check-admin`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
    //       Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    //     },
    //   });
    // }
}
