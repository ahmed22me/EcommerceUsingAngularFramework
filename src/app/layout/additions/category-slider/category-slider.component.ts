import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/servcis/categorys/category.service';
import { category } from '../../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule,TranslateModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit{

  categoryList !: category[];
  isLoading : boolean = false;

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    rtl:true,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  constructor( private _CategoryService:CategoryService) {}

  ngOnInit(): void {
    this.getAllcategories();
  }



  getAllcategories(){
    this.isLoading = true;
    this._CategoryService.getAllcategorys().subscribe({
      next : res => {
        this.categoryList = res.data;
        this.isLoading = false;
        console.log(res);

      },
      error : err => {
        console.log(err);
        this.isLoading = false;

      }
    });
  }

}
