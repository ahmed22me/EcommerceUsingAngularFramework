import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../shared/servcis/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  errMsg!:string;

  regform:FormGroup = new FormGroup({
    name : new FormControl(null, [Validators.required, Validators.minLength(3) , Validators.maxLength(8)]),
    email : new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^[A-z][a-z0-9]{8,}$/)]),
    rePassword : new FormControl(null, [Validators.required]),
    phone : new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, {validators:this.checkRepasswordmatch});


  constructor(private _AuthenticationService:AuthenticationService, private _Router:Router){}

  checkRepasswordmatch(g:AbstractControl){
    if(g.get('password')?.value === g.get('rePassword')?.value){
      return null
    }
    else{
      g.get('rePassword')?.setErrors({mismatch:true})
      return {mismatch:true}
    }
  }


  submitReg(){
    if(this.regform.valid){
      this._AuthenticationService.signUp(this.regform.value).subscribe({
        next : res => {
          this._Router.navigate(['/login']);
        }
      });
    }

  }




}
