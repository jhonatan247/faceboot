import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
  isLogin = false;
  constructor(
    public authenticationService: AuthenticationService,
    public router: Router
  ) {
    this.isLogin = this.authenticationService.getCurrentUser() ? true : false;
    this.authenticationService.getStatus().subscribe(auth => {
      if (auth && auth.uid) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
  canActivate() {
    if (this.router.url === '/sign-up' || this.router.url === '/login') {
      if (this.isLogin) {
        this.router.navigate(['']);
      }
      return !this.isLogin;
    }
    if (!this.isLogin) {
      this.router.navigate(['login']);
    }
    return this.isLogin;
  }
}
