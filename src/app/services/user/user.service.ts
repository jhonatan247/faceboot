import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private angularFireDatabase: AngularFireDatabase) {}

  getUsers() {
    return this.angularFireDatabase.list('users/');
  }

  getUser(uid) {
    return this.angularFireDatabase.object('/users/' + uid);
  }

  createUser(user) {
    this.providePhoto(user);
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  editUser(user) {
    this.providePhoto(user);
    return this.angularFireDatabase.object('/users/' + user.uid).update(user);
  }

  providePhoto(user) {
    //if (!user.photoURL) user.photoURL = '../assets/imgs/man.png';
  }
}
