import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Memo } from '../models/memo.model';
import { CONFIG } from '../config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemoService { // service worker
  private baseUrl = `${CONFIG.apiBaseUrl}/api/memos`;
  private uploadUrl = `${CONFIG.apiBaseUrl}/api/uploads`;

  constructor(private http: HttpClient) { }

  // Function to get the authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getMemos(): Observable<Memo[]> {
    return this.http.get<Memo[]>(this.baseUrl).pipe(
      map((memos) =>
        memos.map((memo) => {
          if (memo.imagePath) {
            memo.imagePath = `${this.uploadUrl}/${memo.imagePath}`;
          }
          return memo;
        })
      )
    );
  }

  getMemoById(id: string): Observable<Memo> {
    return this.http.get<Memo>(`${this.baseUrl}/id/${id}`).pipe(
      map((memo) => {
        if (memo.imagePath) {
          memo.imagePath = `${this.uploadUrl}/${memo.imagePath}`;
        }
        return memo;
      })
    );
  }

  // Add a new memo (requires admin access)
  createMemo(data: any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return this.http.post(this.baseUrl, formData, { 
      headers: this.getAuthHeaders() 
    });
  }

  // Update an existing memo (requires admin access)
  updateMemo(id: string, data: any): Observable<Memo> {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return this.http.put<Memo>(`${this.baseUrl}/id/${id}`, formData, { 
      headers: this.getAuthHeaders() 
    });
  }

  // Delete a memo by its ID (requires admin access)
  deleteMemo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/id/${id}`, {
       headers: this.getAuthHeaders() 
      });
  }

  // addMemo(memo: Omit<Memo, '_id'>): Observable<Memo> {
  //   return this.http.post<Memo>(this.apiUrl, memo);
  // }

  // updateMemo(memo: Memo): Observable<Memo> {
  //   return this.http.put<Memo>(`${this.apiUrl}/${memo._id}`, memo);
  // }

  // deleteMemo(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
