import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../base/env';
import { shippingAddress } from '../../interfaces/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient:HttpClient) { }

  checkOut(cartId:string, data:shippingAddress):Observable<any>
  {
    return this._HttpClient.post(`${env.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${env.websitUrl}`,
      {shippingAddress : data})
  }


}
