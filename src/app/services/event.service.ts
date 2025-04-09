import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { CONFIG } from '../config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService { // service worker
  private baseUrl = `${CONFIG.apiBaseUrl}/api/events`;
  private uploadUrl = `${CONFIG.apiBaseUrl}/api/uploads`;

  constructor(private http: HttpClient) { }

  // Function to get the authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl).pipe(
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

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/id/${id}`).pipe(
      map((data) => {
        if (data.imagePath) {
          data.imagePath = `${this.uploadUrl}/${data.imagePath}`;
        }
        return data;
      })
    );
  }

  // Add a new event (requires admin access)
  createEvent(data: any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return this.http.post(this.baseUrl, formData, { 
      headers: this.getAuthHeaders() 
    });
  }

  // Update an existing event (requires admin access)
  updateEvent(id: string, data: any): Observable<Event> {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return this.http.put<Event>(`${this.baseUrl}/id/${id}`, formData, { 
      headers: this.getAuthHeaders() 
    });
  }

  // Delete a event by its ID (requires admin access)
  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/id/${id}`, {
       headers: this.getAuthHeaders() 
      });
  }

  // addEvent(event: Omit<Event, '_id'>): Observable<Event> {
  //   return this.http.post<Event>(this.apiUrl, event);
  // }

  // updateEvent(event: Event): Observable<Event> {
  //   return this.http.put<Event>(`${this.apiUrl}/${event._id}`, event);
  // }

  // deleteEvent(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
