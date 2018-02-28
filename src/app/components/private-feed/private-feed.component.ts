import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { PrivatechatService } from '../../services/privatechat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-private-feed',
  templateUrl: './private-feed.component.html',
  styleUrls: ['./private-feed.component.scss']
})
export class PrivateFeedComponent implements OnInit,AfterViewChecked {

  @ViewChild('scroller') private feedbox: ElementRef;
  
  feed= [];
  
  constructor(private privateChat:PrivatechatService,private route:ActivatedRoute) { }

  ngOnInit() {

    const key =this.route.snapshot.params['id'];
    this.privateChat.getPrivateMessages(key).valueChanges().subscribe(feed => {
      if (this.feed.length == 0)
        this.feed = feed;
      else {
        this.feed.push(feed[feed.length - 1]);
      }
    })

  }


  scrollBot(): void {
    this.feedbox.nativeElement.scrollTop = this.feedbox.nativeElement.scrollHeight
  }

  ngAfterViewChecked() {
    this.scrollBot();
  }

}
