import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {

  message:string='';
  key:string;
  constructor(private chat: ChatService) { }

  ngOnInit() {
   
  }

  

  send(event){
    event.preventDefault();
    if(this.message!=''){
      this.chat.send(this.message);
      this.message='';
    }
  }

}
