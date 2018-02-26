import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  private user:Observable<firebase.User>;
  private authState:any;

  constructor(private auth:AngularFireAuth,private db:AngularFireDatabase,private router:Router) {
    this.user=this.auth.authState;
   }


  login(email:string,password){
    return this.auth.auth.signInWithEmailAndPassword(email,password)
    .then(resolve=>{
      const status='online';
      this.setUserStatus(status);
      this.router.navigate(['chat']);
    });
   }

  logout(){
    this.auth.auth.signOut();
  }


  signUp(newUser:{email,password,displayName}){
    return this.auth.auth.createUserWithEmailAndPassword(newUser.email,newUser.password)
    .then(user=>{
      this.authState=user;
      const status='online';
      console.log(newUser);
      this.setUser(user.email,newUser.displayName,status);
    }).catch(er=>{
      console.log(er);
    })
  }

  setUser(email:string,displayName:string,status:string){
    const path =`users/${this.userId}`;
    const user={
      email,
      displayName,
      status
    };

    this.db.object(path).update(user).catch(err=>{
      console.log(err);
    })
  }

  setUserStatus(status:string){
    const path = `users/${this.userId}`;
    const data = {
      status
    };

    this.db.object(path).update(data).catch(err => {
      console.log(err);
    })
  }

  get userId():string{
    return this.authState!==null?this.authState.uid:'';
  }

  getAuthUser(){
    return this.user;
  }
}
