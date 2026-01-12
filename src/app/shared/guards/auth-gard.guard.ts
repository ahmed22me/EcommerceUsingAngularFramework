import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthenticationService } from '../servcis/auth/authentication.service';
import { inject } from '@angular/core';

export const authGardGuard: CanActivateFn = (route, state) => {
  let _AuthenticationService:AuthenticationService = inject(AuthenticationService);
  let _Router:Router = inject(Router)
  if(_AuthenticationService.userData.getValue() != null){
    return true;
  }
  _Router.navigate(['/login']);
  return false;
};
