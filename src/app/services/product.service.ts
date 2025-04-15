import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { CONFIG } from '../config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService { // service worker
  private baseUrl = `${CONFIG.apiBaseUrl}/api/products`;
  private uploadUrl = `${CONFIG.apiBaseUrl}/api/uploads`;

  constructor(private http: HttpClient) { }

  // Function to get the authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((products) =>
        products.map((product) => {
          // Handle multiple images
          if (product.images && Array.isArray(product.images)) {
            product.images = product.images.map((image) => ({ url: `${this.uploadUrl}/${image.url}` }));
            //product.image = product.images[0]; // Set the first image as the main image
          }
          return product;
        })
      )
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/id/${id}`).pipe(
      map((product) => {
          if (product.images && Array.isArray(product.images)) {
            product.images = product.images.map((image) => ({ url: `${this.uploadUrl}/${image.url}` }));
          }
        return product;
      })
    );
  }

  // // Add a new product (requires admin access)
  // createProduct(data: any): Observable<any> {
  //   const formData = new FormData();
  //   Object.keys(data).forEach(key => {
  //     formData.append(key, data[key]);
  //   });
  //   console.log('FormData from product service:', formData); // Log the FormData object
  //   return this.http.post(this.baseUrl, formData, { 
  //     headers: this.getAuthHeaders() 
  //   });
  // }
  // createProduct(data: any): Observable<any> {
  //   const formData = new FormData();
  //   console.log('1 createProduct data:', data); // Log the form data
  //   Object.keys(data).forEach(key => {
  //     console.log('2 for each data');
  //     console.log('Key:', key, ' Value:', data[key]); // Log the key and value
  //     const value = data[key];
  
  //     if (Array.isArray(value)) {
  //       // If it's an array (e.g. images: File[])
  //       value.forEach(item => {
  //         formData.append(key, item); // append each file separately
  //       });
  //     } else {
  //       formData.append(key, value);
  //     }
  //   });
  //   console.log('3 FormData from product service:', formData); // Log the FormData object
  //   //formData.forEach((val, key) => console.log(key, val));
  //   return this.http.post(this.baseUrl, formData, { 
  //     headers: this.getAuthHeaders()
  //   });
  // }

  createProduct(formData: FormData): Observable<any> {
    console.log('FormData from product service:', formData);
  
    return this.http.post(this.baseUrl, formData, {
      headers: this.getAuthHeaders() // <-- do NOT set `Content-Type` manually
    });
  }

  updateProduct(id: string, formData: FormData): Observable<Product> {
    console.log('FormData from product service:', formData);

    return this.http.put<Product>(`${this.baseUrl}/id/${id}`, formData, {
      headers: this.getAuthHeaders()
    });
  }
  

  // Delete a product by its ID (requires admin access)
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/id/${id}`, {
       headers: this.getAuthHeaders() 
      });
  }

  // addProduct(product: Omit<Product, '_id'>): Observable<Product> {
  //   return this.http.post<Product>(this.apiUrl, product);
  // }

  // updateProduct(product: Product): Observable<Product> {
  //   return this.http.put<Product>(`${this.apiUrl}/${product._id}`, product);
  // }

  // deleteProduct(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
