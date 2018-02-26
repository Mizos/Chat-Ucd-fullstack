import { Component, OnInit,OnChanges,ViewChild,ElementRef,AfterViewChecked } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.scss']
})
export class ChatFeedComponent implements OnInit,AfterViewChecked {

  @ViewChild('scroller') private feedbox:ElementRef;

  feed:Message[]=[];
  loading:boolean=true;
  constructor(private chat:ChatService) { }


  ngOnInit() {
    
      this.chat.getMessages().valueChanges().subscribe(feed => {
        if(this.feed.length==0)
        this.feed = feed;
        else{
          this.feed.push(feed[feed.length - 1]);
        }
        this.loading=false;
      })

  }
 

  scrollBot():void{
    this.feedbox.nativeElement.scrollTop=this.feedbox.nativeElement.scrollHeight
  }

  ngAfterViewChecked(){
    this.scrollBot();
  }
}
