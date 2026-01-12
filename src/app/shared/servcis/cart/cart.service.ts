import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../base/env';
import { cart } from '../../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }


  addProductTocart(productId:string):Observable<any>
  {
    return this._HttpClient.post(`${env.baseUrl}/api/v1/cart`, {productId:productId})
  }

  getLoggedUserCart():Observable<cart>
  {
    return this._HttpClient.get<cart>(`${env.baseUrl}/api/v1/cart`)
  }

  updataProductCount(productId:string, count:string):Observable<cart>
  {
    return this._HttpClient.put<cart>(`${env.baseUrl}/api/v1/cart/${productId}`, {count:count} )
  }

  removeProduct(productId:string):Observable<cart>
  {
    return this._HttpClient.delete<cart>(`${env.baseUrl}/api/v1/cart/${productId}`)
  }


}
