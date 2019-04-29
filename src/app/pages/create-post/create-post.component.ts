import { User } from './../../interfaces/user/user';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { UserService } from './../../services/user/user.service';
import { PostService } from './../../services/post/post.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.sass']
})
export class CreatePostComponent implements OnInit {
  title: string;
  description: string;
  image: string;
  price: number;

  constructor(
    public router: Router,
    public postService: PostService,
    public userService: UserService,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}
  register() {
    this.userService
      .getUser(this.authenticationService.getCurrentUser().uid)
      .valueChanges()
      .subscribe((user: User) => {
        const product = {
          owner_name: user.name,
          created_date: Date.now(),
          owner: user.uid,
          type: 'product',
          title: this.title,
          description: this.description,
          image: this.image,
          status: 'active',
          likes_count: 0,
          price: this.price,
          location: user.location
        };
        this.postService.createPost(product).then(data => {
          this.router.navigate(['my-products']);
        });
      });
  }
  cancel() {
    this.router.navigate(['my-products']);
  }
}
