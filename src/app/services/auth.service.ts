import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  userId:string;

  constructor(private auth:AngularFireAuth,private db:AngularFireDatabase,private router:Router) {
    this.auth.authState.subscribe(user=>{
      if(user){
        this.userId = user.uid;
        this.updateOnConnect();
        this.updateOnDisconnect();
      }
      
    })
   }


  login(email:string,password:string){
      this.auth.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          if (res.uid) {
            this.router.navigate(['chat']);
          }
      });   
   }


  logout(){
    this.auth.auth.signOut().then(user=>{
      this.setUserStatus('offline');
    });
  }


  signUp(newUser:{email,password,displayName}){
    return this.auth.auth.createUserWithEmailAndPassword(newUser.email,newUser.password)
    .then(user=>{
      const status='online';
      this.setUser(user.uid,user.email,newUser.displayName,status);
    }).catch(er=>{
      console.log(er);
    })
  }

  setUser(uid:string,email:string,displayName:string,status:string){
    const path =`users/${uid}`;
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
    if(!this.userId) return ;
    const path = `users/${this.userId}`;
    const data = {
      status
    };

    this.db.object(path).update(data).catch(err => {
      console.log(err);
    })
  }


  updateOnConnect(){
    return this.db.object('.info/connected').valueChanges()
    .do((connected:any)=>{
      let status = connected?'online':'offline';
      this.setUserStatus(status);
    }).subscribe();
  }

  updateOnDisconnect() {
    firebase.database().ref().child(`users/${this.userId}`)
    .onDisconnect().update({status:'offline'});
  }

  getAuthUser(){
    return this.auth.authState;
  }
  getUserId(){
    return this.userId;
  }

}
