import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { code, email, ErrorResponse, loginData, newPassword, regData, successResponse } from '../../interfaces/data';
import { env } from '../../../base/env';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient, private _Router:Router, @Inject(PLATFORM_ID) id:object) {

    if(isPlatformBrowser(id)){
      if(localStorage.getItem('userToken')){
        this.decodeUserData();
        // this._Router.navigate([localStorage.getItem('currentPage')])
      }
    }
    // if (typeof localStorage != undefined){
    //   if(localStorage.getItem('userToken')){
    //     this.decodeUserData();
    //   }
    // }

  }

  signUp(data:regData):Observable<successResponse | ErrorResponse>
  {
    return this._HttpClient.post<successResponse | ErrorResponse>(`${env.baseUrl}/api/v1/auth/signup`, data)
  }

  signIn(data:loginData):Observable<successResponse | ErrorResponse>
  {
    return this._HttpClient.post<successResponse | ErrorResponse>(`${env.baseUrl}/api/v1/auth/signin`, data)
  }

  decodeUserData(){
    const token = JSON.stringify(localStorage.getItem('userToken'));
    const decoded = jwtDecode(token);
    this.userData.next(decoded);
    console.log(this.userData.getValue());
  }


  logOut(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login'])

  }

  forgetPassword(data:email):Observable<any>
  {
    return this._HttpClient.post(`${env.baseUrl}/api/v1/auth/forgotPasswords`, data);
  }

  verifyResetcode(data:code):Observable<any>
  {
    return this._HttpClient.post(`${env.baseUrl}/api/v1/auth/verifyResetCode`, data);
  }

  resetNewpassword(data:newPassword):Observable<any>
  {
    return this._HttpClient.put(`${env.baseUrl}/api/v1/auth/resetPassword`, data);
  }


}
