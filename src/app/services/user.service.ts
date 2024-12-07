import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${CONFIG.apiBaseUrl}/api/user`;

  constructor(private http: HttpClient) {}

  // Get profile by username
  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // Update user profile
  // Fetch other users information
}
