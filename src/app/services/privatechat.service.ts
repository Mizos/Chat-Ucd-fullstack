import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from "firebase";

@Injectable()
export class PrivatechatService {

  user: firebase.User;
  chatMessages: any;
  username: string;

  constructor(private db:AngularFireDatabase,private afAuth:AngularFireAuth) { 
    this.afAuth.authState.subscribe(currentUser => {
      if (currentUser) {
        this.user = currentUser;
        this.getUser().subscribe(dbUser => {
          this.username = dbUser['displayName'];
        })
      }

    })
  }


  send(message: string,key:string) {
    firebase.database().ref(`privateRoom/${key}/uid`).once("value",snap=>{
      this.chatMessages = this.db.list(`privateRoom/${key}/messages`, ref => ref.orderByKey());
      const timestamp = this.getTimestamp();
      const username = this.username
      if(snap.val()){
        this.chatMessages.push({
          text: message,
          createdAt: timestamp,
          from: username,
          email: this.user.email
        })
      }
      else{
        this.chatMessages.push({
          text: 'Sorry , this room is not active anymore please join or create a new one',
          createdAt: timestamp,
          from: 'Admin',
          email: 'Admin@gmail.com'
        });
        this.db.database.ref(`privateRoom/${key}/messages`).remove();
        this.deleteRoom(key);
      }
    })
   
  }

  getPrivateMessages(key:string){
    return this.db.list(`privateRoom/${key}/messages`, ref => ref.orderByKey()); 
  }



  getTimestamp() {
    const now = new Date();
    const date = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
    return date;
  }

  getUser() {
    const uid = this.user.uid;
    const path = `users/${uid}`;
    return this.db.object(path).valueChanges();
  }

  deleteRoom(key:string){
    return this.db.database.ref(`privateRoom/${key}`).remove();
  }

}
