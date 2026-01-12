import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../shared/servcis/order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent {
  isLoading : boolean = false;
  errMsg !:string;

  constructor(private _OrderService:OrderService, private _ActivatedRoute:ActivatedRoute) {}

  shippingForm : FormGroup = new FormGroup({
    details : new FormControl(null,[Validators.required, Validators.pattern(/^[a-z0-9]{4,}$/)]),
    phone : new FormControl(null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city : new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]{8}$/)]),
  })


  submitShipping()
  {

    if( this.shippingForm.valid ){
      this._ActivatedRoute.paramMap.subscribe({
        next : p => {
          this._OrderService.checkOut(p.get('cartid')!,this.shippingForm.value).subscribe({
            next : res => {
              console.log(res);
              window.open(res.session.url , '_self');

            },
            error : err =>{
              console.log(err);

            }

          })

        }
      });

    }
    console.log(this.shippingForm.value);


  }


}
