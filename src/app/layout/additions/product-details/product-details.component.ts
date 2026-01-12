import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/servcis/product/products.service';
import { product } from '../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{

  productD !: product;

  constructor(private _ProductsService:ProductsService, private _ActivatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.getproductDetails();
  }

  getproductDetails(){
    let id:string = '';
    this._ActivatedRoute.params.subscribe({
      next : params => {
        id = params['id'];
        console.log(params['id']);

      },
      error : err =>{
        console.log(err);

      }
    });

    this._ProductsService.getProductById(id).subscribe({
      next : res => {
        console.log(res.data);
        this.productD = res.data;

      },
      error : err =>{
        console.log(err);

      }
    });

  }

}
