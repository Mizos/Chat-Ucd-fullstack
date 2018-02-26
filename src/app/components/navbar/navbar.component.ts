import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { AuthService } from "../../services/auth.service";
import * as firebase from 'firebase/app';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user:Observable<firebase.User>
  username:string;
  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit() {
   this.auth.getAuthUser().subscribe(user=>{
     this.username=user.email;
   })
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['login']);

  }

}
