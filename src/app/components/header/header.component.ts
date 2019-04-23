import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  @Input('isLogin') isLogin: boolean;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  logOut() {
    this.authenticationService.logOut();
  }
}
