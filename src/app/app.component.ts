import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';
import { UserService } from './services/user/user.service';
import { User } from './interfaces/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isLogin: boolean;
  constructor(
    public router: Router,
    public authenticationService: AuthenticationService,
    public userService: UserService
  ) {
    this.isLogin = false;
    this.authenticationService.getStatus().subscribe(auth => {
      if (auth == null || !auth.uid) {
        this.router.navigate(['']);
        this.isLogin = false;
      } else if (router.url === '/sign-up' || router.url === '/login') {
        this.userService
          .getUser(auth.uid)
          .valueChanges()
          .subscribe((user: User) => {
            this.isLogin = true;
            switch (user.type) {
              case 'admin':
                this.router.navigate(['home-admin']);
                break;
              case 'user':
                this.router.navigate(['home']);
                break;
            }
          });
      } else {
        this.isLogin = true;
      }
    });
  }
}
