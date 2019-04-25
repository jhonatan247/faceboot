import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { PostService } from '../../services/post/post.service';
import { User } from '../../interfaces/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit {
  posts: Array<any> = [];
  currentUser: User;
  constructor(
    public userService: UserService,
    public authenticationService: AuthenticationService,
    public postService: PostService,
    public router: Router
  ) {
    if (authenticationService.getCurrentUser()) {
      userService
        .getUser(authenticationService.getCurrentUser().uid)
        .valueChanges()
        .subscribe(
          (currentUser: User) => {
            this.currentUser = currentUser;
            this.fillPosts();
          },
          err => {
            console.log(err);
          }
        );
    }
  }
  fillPosts() {
    this.postService
      .getPosts()
      .valueChanges()
      .subscribe(
        data => {
          this.posts = [];
          data.forEach((post: any) => {
            if (post.location === this.currentUser.location) {
              this.posts.push(post);
              this.setLike(post);
            }
          });
        },
        err => {
          console.log(err);
        }
      );
  }
  setLike(post: any) {
    this.postService
      .getLikes(post.id)
      .valueChanges()
      .subscribe(likes => {
        if (likes[this.currentUser.uid]) {
          post.isLiked = true;
        }
      });
  }
  ngOnInit() {}
  create() {
    this.router.navigate(['create-post']);
  }
  addOrRemoveLike(post) {
    if (post.isLiked) {
      this.removeLike(post);
    } else {
      this.addLike(post);
    }
  }
  removeLike(post) {
    this.postService.removeLike(post.id, this.currentUser.uid).then(dada => {
      const newPost = {
        id: post.id,
        likes_count: post.likes_count - 1
      };
      this.postService.editPost(newPost);
    });
  }
  addLike(post) {
    const like = {
      uid: this.currentUser.uid,
      name: this.currentUser.name,
      sex: this.currentUser.sex,
      date: Date.now()
    };
    this.postService.addLike(post.id, like).then(data => {
      const newPost = {
        id: post.id,
        likes_count: post.likes_count + 1
      };
      this.postService.editPost(newPost);
    });
  }
}
