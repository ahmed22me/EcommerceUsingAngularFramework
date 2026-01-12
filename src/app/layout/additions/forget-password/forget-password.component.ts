import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../shared/servcis/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  isLoading : boolean = false;
  errMsg !:string;

  emailFlage: boolean = true;
  codeFlage : boolean = false;
  resetFlage : boolean = false;

  emailForm : FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required])
  })

  codeForm : FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{4,}$/) ])
  })

  newPasswordForm : FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email ]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,}$/) ])
  })

  constructor(private _AuthenticationService:AuthenticationService, private _Router:Router) {

  }

  submitcode(){
    if(this.codeForm.valid){
      this.isLoading = true;
      this._AuthenticationService.verifyResetcode(this.codeForm.value).subscribe({
        next : res => {
          this.isLoading = false;
          this.codeFlage = false;
          this.resetFlage = true


        },
        error : err =>{
          this.isLoading = false;
          this.errMsg = err.error.message;


        }
      })
    }
  }


  submitNewpassword(){
    if(this.newPasswordForm.valid){
      this.isLoading = true;
      this._AuthenticationService.resetNewpassword(this.newPasswordForm.value).subscribe({
        next : res => {
          this.isLoading = false;
          localStorage.setItem('userToken',res.token);
          this._AuthenticationService.decodeUserData();
          this._Router.navigate(['/home']);


        },
        error : err =>{
          this.isLoading = false;
          this.errMsg = err.error.message;


        }
      })
    }
  }

  submitEmail(){
    if(this.emailForm.valid){
      this.isLoading = true;
      this._AuthenticationService.forgetPassword(this.emailForm.value).subscribe({
        next : res => {
          this.isLoading = false;
          this.emailFlage = false;
          this.codeFlage = true;

        },
        error : err =>{
          this.isLoading = false;
          this.errMsg = err.error.message;


        }
      })
    }
  }



}
