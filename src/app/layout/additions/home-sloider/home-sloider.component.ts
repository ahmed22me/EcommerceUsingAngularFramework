import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-sloider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './home-sloider.component.html',
  styleUrl: './home-sloider.component.scss'
})
export class HomeSloiderComponent {


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    rtl: true,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

}
