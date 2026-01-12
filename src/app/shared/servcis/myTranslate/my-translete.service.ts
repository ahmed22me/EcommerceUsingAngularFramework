import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTransleteService {

  constructor(private _TranslateService: TranslateService, @Inject(PLATFORM_ID) plateformId:object) {
    let defaulteLang = 'en';

    if (isPlatformBrowser(plateformId)) {
      let savedLang = localStorage.getItem('lang');

      if (savedLang) {
        defaulteLang = savedLang;
      }

      _TranslateService.setDefaultLang(defaulteLang);
      _TranslateService.use(defaulteLang);
      this.setDir(defaulteLang);

    }


  }

  setDir(lang: string) {
    if (lang === 'en') {
      document.dir = 'ltr';
    }
    else if (lang == 'ar') {
      document.dir = 'rtl';

    }
  }

  changlang(lang:string){
    localStorage.setItem('lang', lang);
    this._TranslateService.setDefaultLang(lang);
    this._TranslateService.use(lang);
    this.setDir(lang);
  }
}
