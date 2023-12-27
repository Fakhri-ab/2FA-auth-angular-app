import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (!localStorage.getItem('token')) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
