import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afDB: AngularFireDatabase, public fbAuth: AngularFireAuth) { }

  loginWithFacebook(){
    return this.fbAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider);
  }

  logout(){
    return this.fbAuth.auth.signOut();
  }
}
