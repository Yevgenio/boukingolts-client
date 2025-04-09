import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
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

  getDeals(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((deals) =>
        deals.map((product) => {
          if (product.imagePath) {
            product.imagePath = `${this.uploadUrl}/${product.imagePath}`;
          }
          if (product.barcodePath) {
            product.barcodePath = `${this.uploadUrl}/${product.barcodePath}`;
          }
          return product;
        })
      )
    );
  }

  getDealById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/id/${id}`).pipe(
      map((product) => {
        if (product.imagePath) {
          product.imagePath = `${this.uploadUrl}/${product.imagePath}`;
        }
        if (product.barcodePath) {
          product.barcodePath = `${this.uploadUrl}/${product.barcodePath}`;
        }
        return product;
      })
    );
  }

  // Add a new product (requires admin access)
  createDeal(data: any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return this.http.post(this.baseUrl, formData, { 
      headers: this.getAuthHeaders() 
    });
  }

  // Update an existing product (requires admin access)
  updateDeal(id: string, data: any): Observable<Product> {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return this.http.put<Product>(`${this.baseUrl}/id/${id}`, formData, { 
      headers: this.getAuthHeaders() 
    });
  }

  // Delete a product by its ID (requires admin access)
  deleteDeal(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/id/${id}`, {
       headers: this.getAuthHeaders() 
      });
  }

  // addDeal(product: Omit<Product, '_id'>): Observable<Product> {
  //   return this.http.post<Product>(this.apiUrl, product);
  // }

  // updateDeal(product: Product): Observable<Product> {
  //   return this.http.put<Product>(`${this.apiUrl}/${product._id}`, product);
  // }

  // deleteDeal(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
