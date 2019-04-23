import { UserService } from './../../services/user/user.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  sex: string;
  location: string;
  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    public userService: UserService
  ) {
    this.name = '';
    this.email = '';
    this.password = '';
    this.sex = 'male';
    this.location = 'Bogotá';
    this.acceptTerms = false;
  }

  ngOnInit() {}

  login() {
    this.router.navigate(['']);
  }

  signUp() {
    if (this.validateRegisterData()) {
      this.authenticationService
        .registerWithEmail(this.email, this.password)
        .then(authData => {
          const user = {
            uid: authData.user.uid,
            name: this.name,
            email: this.email,
            sex: this.sex,
            location: this.location,
            type: 'user'
          };
          this.userService.createUser(user);
          this.authenticationService
            .getCurrentUser()
            .updateProfile({ displayName: this.name });
        })
        .catch(error => {
          alert(error);
        });
    }
  }

  validateRegisterData(): boolean {
    if (!this.acceptTerms) {
      alert('You must agree to terms and conditions');
      return false;
    }
    if (this.password.length < 7) {
      alert('The password must have 7 or more characters');
      return false;
    }
    return true;
  }
}
