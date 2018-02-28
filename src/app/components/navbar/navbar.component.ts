import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from "firebase";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //create
  popupCreate:boolean=false;
  roomName: string = ""
  roomId: string = "";
  loading: boolean = false;

  //join
  popupJoin:boolean=false;
  roomKey:string="";
  error:boolean=false;

 

  constructor(private router:Router,private authService:AuthService,
              private db:AngularFireDatabase) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  changeStatus(status:string){
    this.authService.setUserStatus(status);
  }

  createRoom(){
    this.loading = true;
    const userId=this.authService.getUserId();
    const key = `${ this.roomName }_${ userId }`;
    const path=`/privateRoom/${key}`;
    const data={
      Name:this.roomName,
      key:key,
      uid:userId
    }
    this.db.object(path).set(data).then(()=>{
      this.roomId = key;
    }).catch(err=>{
      console.log(err);
    })
    
  }

  joinRoom(){
    firebase.database().ref(`/privateRoom/${this.roomKey}/key`).once("value",snap=>{
     if(snap.val()){
       this.router.navigate(['chat',`${this.roomKey}`])
     }
     else{
      this.error=true;
     }
    })
   
  }

  openCreatePop(){
    this.popupCreate = true;
  }

  openJoinPop(){
    this.popupJoin = true;
  }

  closePop() {
    this.popupJoin=this.popupCreate = false;
    this.roomName = '';
    this.loading = false;
    this.error=false;
  }

}
