import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: any;

  username: string;
  useremail:string
  text: string;
  timeStamp: Date = new Date();

  myemail:string;
  mymessgae:boolean;




  constructor(private authService:AuthService) {
    this.authService.getAuthUser().subscribe(user=>{
      this.myemail=user.email;
      this.mymessgae=this.myemail===this.useremail; 
    })
   }

  

  ngOnInit(chatMessage=this.chatMessage) {
    this.text=chatMessage.text;
    this.username=chatMessage.from;
    this.useremail=chatMessage.email,
    this.timeStamp=chatMessage.createdAt;
  }

}
