import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IProduct } from '../interfaces/products.interfaces';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {

  constructor(private _http: HttpClient) { }


  public getAllProducts(): Observable<IProduct[]> {
    const url = `/api/products`;
    return this._http.get<IProduct[]>(url);
  }

  public getProduct(id: number): Observable<IProduct> {
    const url = `api/products/${id}`;
    return this._http.get<IProduct>(url)
  }

  public changeProductData(product: IProduct): Observable<IProduct> {
    const url = `api/products/${product.id}`;
    return this._http.put<IProduct>(url, product);
  }

  public createProduct(product: IProduct): Observable<IProduct> {
    const url = `api/products`;
    return this._http.post<IProduct>(url, product);
  }

  public deleteProduct(id: number): Observable<string> {
    const url = `api/products/${id}`;
    return this._http.delete<string>(url);
  }

  public uploadPhoto(image: FormData): Observable<any> {
    const url = `api/products/image`;
    return this._http.post<any>(url, image)
  }

  public addToBag(productId: number, userId: number): Observable<IProduct>{
    const url = `api/users/${userId}/products/${productId}`;
    return this._http.post<IProduct>(url, {})
  }

  public getBagProducts(userId: number): Observable<IProduct[]>{
    const url = `api/users/${userId}/products`;
    return this._http.get<IProduct[]>(url)
  }
}
