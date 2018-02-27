import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { AngularFireDatabase } from 'angularfire2/database';

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
    console.log(this.roomName+" has been created");
    this.loading=true;
    const userId=this.authService.getUserId();
    const path=`/privateRoom/${this.roomName}_${userId}`;
    this.db.object(path).set({roomName:this.roomName}).then(()=>{
      this.roomId = `${this.roomName}_${userId}`;
    }).catch(err=>{
      console.log(err);
    })
    
  }

  joinRoom(){
    this.router.navigate(['chat',`${this.roomKey}`])
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
  }

}
