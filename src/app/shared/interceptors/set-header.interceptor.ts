import { HttpInterceptorFn } from '@angular/common/http';

export const setHeaderInterceptor: HttpInterceptorFn = (req, next) => {

  if(typeof localStorage != 'undefined'){
    if (localStorage.getItem('userToken')) {
      let userTokenHeader = {
        Token : localStorage.getItem('userToken')!
      }

      req = req.clone({
        setHeaders : userTokenHeader
      })
    }
  }



  return next(req);
};
