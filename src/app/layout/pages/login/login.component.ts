import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../shared/servcis/auth/authentication.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  errMsg!:string;

  loginform:FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^[A-z][a-z0-9]{8,}$/)]),

  });

  constructor(private _AuthenticationService:AuthenticationService, private _Router:Router){}


  submitlogin(){
    console.log(this.loginform);

    if(this.loginform.valid){

      this._AuthenticationService.signIn(this.loginform.value).subscribe({
        next : (res) => {
          if ('token' in res) {
            console.log(res);
            localStorage.setItem('userToken', res.token);
            this._AuthenticationService.decodeUserData();
            this._Router.navigate(['/home']);
          }
        }
      });
    }

  }

}
