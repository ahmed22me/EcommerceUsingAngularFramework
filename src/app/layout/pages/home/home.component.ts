import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/servcis/product/products.service';
import { product } from '../../../shared/interfaces/product';
import { CategorySliderComponent } from "../../additions/category-slider/category-slider.component";
import { HomeSloiderComponent } from "../../additions/home-sloider/home-sloider.component";
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipes/onsale.pipe';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/servcis/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule,FormsModule,CategorySliderComponent, HomeSloiderComponent, RouterLink, UpperCasePipe, CurrencyPipe, OnsalePipe, SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  userWord:string = '';

  productList !: product [];

  constructor (private _ProductsService:ProductsService, private _CartService:CartService, private toastr: ToastrService) {}

  ngOnInit(): void {
      if(typeof localStorage != undefined){
        localStorage.setItem('currentPage', '/home')
      }
      this.getAllProducts();

  }

  getAllProducts(){
    this._ProductsService.getAllproducts().subscribe({

      next : res => {
        this.productList = res.data;

      }
    })

  }

  addProctToCart(productId:string){
    this._CartService.addProductTocart(productId).subscribe({
      next : (res) => {
        this.toastr.success(res.message, 'Done', {
          positionClass : 'toast-top-center',
          timeOut: 3000
        });

      }
    })
  }



}
