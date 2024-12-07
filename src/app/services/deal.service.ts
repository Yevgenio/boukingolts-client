import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deal } from '../models/deal.model';
import { CONFIG } from '../config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DealService { // service worker
  private baseUrl = `${CONFIG.apiBaseUrl}/api/deals`;
  private uploadUrl = `${CONFIG.apiBaseUrl}/api/uploads`;

  constructor(private http: HttpClient) { }

  // Function to get the authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getDeals(): Observable<Deal[]> {
    return this.http.get<Deal[]>(this.baseUrl).pipe(
      map((deals) =>
        deals.map((deal) => {
          if (deal.imagePath) {
            deal.imagePath = `${this.uploadUrl}/${deal.imagePath}`;
          }
          if (deal.barcodePath) {
            deal.barcodePath = `${this.uploadUrl}/${deal.barcodePath}`;
          }
          return deal;
        })
      )
    );
  }

  getDealById(id: string): Observable<Deal> {
    return this.http.get<Deal>(`${this.baseUrl}/id/${id}`).pipe(
      map((deal) => {
        if (deal.imagePath) {
          deal.imagePath = `${this.uploadUrl}/${deal.imagePath}`;
        }
        if (deal.barcodePath) {
          deal.barcodePath = `${this.uploadUrl}/${deal.barcodePath}`;
        }
        return deal;
      })
    );
  }

  addDeal(deal: any): Observable<any> {
    const formData = new FormData();
    Object.keys(deal).forEach(key => {
      formData.append(key, deal[key]);
    });
    return this.http.post(this.baseUrl, formData, { 
      headers: this.getAuthHeaders() 
    });
  }
  

  // Update an existing deal (requires admin access)
  updateDeal(deal: Deal): Observable<Deal> {
    return this.http.put<Deal>(`${this.baseUrl}/${deal._id}`, deal, { 
      headers: this.getAuthHeaders() 
    });
  }

  // Delete a deal by its ID (requires admin access)
  deleteDeal(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
       headers: this.getAuthHeaders() 
      });
  }

  // addDeal(deal: Omit<Deal, '_id'>): Observable<Deal> {
  //   return this.http.post<Deal>(this.apiUrl, deal);
  // }

  // updateDeal(deal: Deal): Observable<Deal> {
  //   return this.http.put<Deal>(`${this.apiUrl}/${deal._id}`, deal);
  // }

  // deleteDeal(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
