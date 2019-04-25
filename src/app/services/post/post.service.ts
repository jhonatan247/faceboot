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

  editPost(post) {
    return this.angularFireDatabase.object('/posts/' + post.id).update(post);
  }

  getLikes(id) {
    return this.angularFireDatabase.list('/posts/' + id + '/likes/');
  }

  addLike(postId, like) {
    return this.angularFireDatabase
      .object('/posts/' + postId + '/likes/' + like.uid)
      .set(like);
  }

  removeLike(postId, uid) {
    return this.angularFireDatabase
      .object('/posts/' + postId + '/likes/' + uid)
      .remove();
  }
}
