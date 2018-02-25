import { Injectable } from '@angular/core';
import { AngularFireDatabase} from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";
import * as firebase from 'firebase/app';

import { Message } from "../models/message,model";


@Injectable()
export class ChatService {

  user:firebase.User;
  chatMessages:any;

  constructor(private db:AngularFireDatabase,private afAuth:AngularFireAuth) {
    this.afAuth.authState.subscribe(currentUser=>{
      if(currentUser){
        this.user=currentUser;
      }
    })
  }

  getMessages(): any {
    return this.db.list('messages', ref => ref.orderByKey());
  }


  send(message:string){
   const timestamp = this.getTimestamp();
  //  const username=this.user.displayName;
   const username='Admin';
   this.chatMessages=this.getMessages();
   this.chatMessages.push({
     text:message,
     createdAt:timestamp,
     from:username
   })
  }


  getTimestamp(){
    const now = new Date();
    const date =  now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate();
    return date;              
  }

  

}
