import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { PostService } from '../../services/post/post.service';
import { User } from '../../interfaces/user/user';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit {
  posts: Array<any> = [];
  currentUser: any = { location: '' };
  constructor(
    public userService: UserService,
    public authenticationService: AuthenticationService,
    public postService: PostService
  ) {
    if (authenticationService.getCurrentUser()) {
      userService
        .getUser(authenticationService.getCurrentUser().uid)
        .valueChanges()
        .subscribe(
          (currentUser: User) => {
            this.currentUser = currentUser;
            this.fillPosts(currentUser);
          },
          err => {
            console.log(err);
          }
        );
    }
  }
  fillPosts(currentUser: User) {
    this.postService
      .getPosts()
      .valueChanges()
      .subscribe(
        data => {
          this.posts = [];
          data.forEach((post: any) => {
            if (post.location == currentUser.location) {
              this.posts.push(post);
            }
          });
        },
        err => {
          console.log(err);
        }
      );
  }
  ngOnInit() {}
}
