import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from '../../core/auth/account.service';
import {IUser} from '../../shared/model/user.model';
import {HAS_SESSION} from '../../shared/constants/cookie.constants';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // check if user has a session
    // false: user can activate Login component
    // true: redirect to /home

    if (sessionStorage.getItem(HAS_SESSION)) {
      return this.accountService.identify().then((user: IUser) => {
        if (user) {
          if (user.hasToken) {
            this.router.navigateByUrl('/home');
            return false;
          } else {
            this.router.navigateByUrl('/authenticate/connect-spotify');
            return false;
          }
        } else {
          return true;
        }
      });
    } else {
      return Promise.resolve(true);
    }
  }
}

