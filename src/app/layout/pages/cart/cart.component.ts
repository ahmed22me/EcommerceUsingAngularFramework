import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/servcis/cart/cart.service';
import { Data } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  cartData !: Data;

  constructor(private _CartService:CartService){}

  ngOnInit(): void {
    if(typeof localStorage != undefined){
      localStorage.setItem('currentPage', '/cart')
    }
    this.getLoggedUserCart();
  }


  getLoggedUserCart(){
    this._CartService.getLoggedUserCart().subscribe({
      next : res => {
        this.cartData = res.data;

      }
    })
  }

  updataProductCartCount(productId:string, count:number){
    if(count <= 0){
      this.deletProducts(productId);
    }
    else {
      this._CartService.updataProductCount(productId,count.toString()).subscribe({
        next : res => {
          this.cartData = res.data;

        }

      })
    }

  }

  deletProducts(productId:string){
    this._CartService.removeProduct(productId).subscribe({
      next : res => {
        this.cartData = res.data;

      }
    })
  }



}
