import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../shared/servcis/Flowbite/flowbite.service';
import { AuthenticationService } from '../../../shared/servcis/auth/authentication.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MyTransleteService } from '../../../shared/servcis/myTranslate/my-translete.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isLogin : boolean = false;
  selected = true;
  platFormid !: object;


  constructor(private _MyTransleteService:MyTransleteService ,private _FlowbiteService:FlowbiteService, public _AuthenticationService:AuthenticationService , @Inject(PLATFORM_ID) id:object){
    this.platFormid = id;
  }

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });

    this.isUserLogin();

    if(isPlatformBrowser(this.platFormid)){
      const savedLang = localStorage.getItem('lang') || 'en';
      this.setLanguage(savedLang);
    }


  }


  isUserLogin(){
    this._AuthenticationService.userData.subscribe(()=>{
      if(this._AuthenticationService.userData.getValue() !=null){
        this.isLogin = true;
      }
      else{
        this.isLogin = false;
      }
    })

  }

  changelang() {
    // Toggle between English and Arabic
    const lang = this.selected ? 'ar' : 'en';

    // Set the language using the translation service
    this._MyTransleteService.changlang(lang);

    // Toggle the selected state
    this.selected = !this.selected;

    // Store the language preference in localStorage
    localStorage.setItem('lang', lang);
  }

  setLanguage(lang: string) {
    // Ensure the selected value is set when the component is loaded
    this.selected = lang === 'en';
  }



}
