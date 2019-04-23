import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
  isLogin = false;
  constructor(public authenticationService: AuthenticationService) {
    this.authenticationService.getStatus().subscribe(auth => {
      if (auth && auth.uid) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
  canActivate() {
    return this.isLogin;
  }
}
