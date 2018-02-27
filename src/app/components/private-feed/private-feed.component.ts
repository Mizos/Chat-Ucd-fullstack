import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-private-feed',
  templateUrl: './private-feed.component.html',
  styleUrls: ['./private-feed.component.scss']
})
export class PrivateFeedComponent implements OnInit,AfterViewChecked {

  @ViewChild('scroller') private feedbox: ElementRef;
  
  constructor() { }

  ngOnInit() {
  }


  scrollBot(): void {
    this.feedbox.nativeElement.scrollTop = this.feedbox.nativeElement.scrollHeight
  }

  ngAfterViewChecked() {
    this.scrollBot();
  }

}
