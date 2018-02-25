import { Component, OnInit,OnChanges, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message,model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.scss']
})
export class ChatFeedComponent implements OnInit,OnChanges,OnDestroy {

  feedObservable:Observable<Message[]>;
  messages:Message[];
  loading:boolean=true;
  constructor(private chat:ChatService) { }


  ngOnInit() {
    this.feedObservable = this.chat.getMessages().valueChanges();
    this.feedObservable.subscribe(messages=>{
      this.messages=messages;
      this.loading=false;
    })
  }

  ngOnChanges(){
   
  }

  ngOnDestroy(){
  }
}
