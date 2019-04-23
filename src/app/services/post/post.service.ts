import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private angularFireDatabase: AngularFireDatabase) {}

  getPosts() {
    return this.angularFireDatabase.list('posts/');
  }

  getPost(id) {
    return this.angularFireDatabase.object('/posts/' + id);
  }

  createPost(post) {
    post.id = this.angularFireDatabase.createPushId();
    return this.angularFireDatabase.object('/posts/' + post.id).set(post);
  }
}
