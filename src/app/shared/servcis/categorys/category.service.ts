import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../base/env';
import { Observable } from 'rxjs';
import { Categorys } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }


  getAllcategorys():Observable<Categorys>
  {
    return this._HttpClient.get<Categorys>(`${env.baseUrl}/api/v1/categories`)
  }

}
