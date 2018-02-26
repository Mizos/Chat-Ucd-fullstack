import { Injectable } from '@angular/core';
import { AngularFireDatabase} from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";
import * as firebase from 'firebase/app';

import { Message } from "../models/message.model";


@Injectable()
export class ChatService {

  user:firebase.User;
  chatMessages:any;
  username:string;

  constructor(private db:AngularFireDatabase,private afAuth:AngularFireAuth) {
    this.afAuth.authState.subscribe(currentUser=>{
      if(currentUser){
        this.user=currentUser;
        console.log(this.user);
        this.getUser().subscribe(dbUser => {
          this.username = dbUser['displayName'];
        })
      }
     
    })
  }

  getMessages(): any {
    return this.db.list('messages', ref => ref.orderByKey());
  }


  send(message:string){
   const timestamp = this.getTimestamp();
   const username=this.username
   this.chatMessages=this.getMessages();
   this.chatMessages.push({
     text:message,
     createdAt:timestamp,
     from:username,
     email:this.user.email
   })
  }


  getUser(){
    const uid =this.user.uid;
    const path=`users/${uid}`;
    return this.db.object(path).valueChanges();
  }

  getUsers(){
    const path = 'users/'
    return this.db.object(path).valueChanges();
  }


  getTimestamp(){
    const now = new Date();
    const date =  now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate();
    return date;              
  }

  

}
