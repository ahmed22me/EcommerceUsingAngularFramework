import { product, products } from './../../interfaces/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../base/env';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }





  getAllproducts():Observable<products>
  {
    return this._HttpClient.get<products>(`${env.baseUrl}/api/v1/products`)
  }

  getProductById(productId:string):Observable<{data:product}>
  {
    return this._HttpClient.get<{data:product}>(`${env.baseUrl}/api/v1/products/${productId}`)
  }


}
