import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import * as firebase from "firebase";
import { PrivatechatService } from '../../services/privatechat.service';

@Component({
  selector: 'app-private-navbar',
  templateUrl: './private-navbar.component.html',
  styleUrls: ['./private-navbar.component.scss']
})
export class PrivateNavbarComponent implements OnInit {

  showDestroy:boolean=false;
  key:string;

  constructor(private router: Router, private authService: AuthService,private route:ActivatedRoute,
  private privateChat:PrivatechatService) {
    this.authService.getAuthUser().subscribe(user=>{
       this.key = this.route.snapshot.params['id'];
      firebase.database().ref(`/privateRoom/${this.key}/uid`).once("value", snap => {
       if(snap.val()==user.uid) this.showDestroy=true;
      })
    })
   }

  ngOnInit() {
    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  leave(){
    this.router.navigate(['chat']);
  }

  deleteRomm(){
    this.privateChat.deleteRoom(this.key).then(()=>{
      this.router.navigate(['chat']);
      console.log('room deleted');
    })
  

}
