import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat.model';
import { CONFIG } from '../config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService { // service worker
  private baseUrl = `${CONFIG.apiBaseUrl}/api/chats`;
  private uploadUrl = `${CONFIG.apiBaseUrl}/api/uploads`;

  constructor(private http: HttpClient) { }

  // Function to get the authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.baseUrl).pipe(
      map((data) =>
        data.map((data) => {
          if (data.imagePath) {
            data.imagePath = `${this.uploadUrl}/${data.imagePath}`;
          }
          return data;
        })
      )
    );
  }

  getChatById(id: string): Observable<Chat> {
    return this.http.get<Chat>(`${this.baseUrl}/id/${id}`).pipe(
      map((data) => {
        if (data.imagePath) {
          data.imagePath = `${this.uploadUrl}/${data.imagePath}`;
        }
        return data;
      })
    );
  }

  // Add a new chat (requires admin access)
  createChat(data: any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return this.http.post(this.baseUrl, formData, { 
      headers: this.getAuthHeaders() 
    });
  }

  // Update an existing chat (requires admin access)
  updateChat(id: string, data: any): Observable<Chat> {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return this.http.put<Chat>(`${this.baseUrl}/id/${id}`, formData, { 
      headers: this.getAuthHeaders() 
    });
  }

  // Delete a chat by its ID (requires admin access)
  deleteChat(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/id/${id}`, {
       headers: this.getAuthHeaders() 
      });
  }

  // addChat(chat: Omit<Chat, '_id'>): Observable<Chat> {
  //   return this.http.post<Chat>(this.apiUrl, chat);
  // }

  // updateChat(chat: Chat): Observable<Chat> {
  //   return this.http.put<Chat>(`${this.apiUrl}/${chat._id}`, chat);
  // }

  // deleteChat(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
