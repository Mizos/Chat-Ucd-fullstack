import { Component, OnInit } from '@angular/core';
import { PrivatechatService } from '../../services/privatechat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-private-form',
  templateUrl: './private-form.component.html',
  styleUrls: ['./private-form.component.scss']
})
export class PrivateFormComponent implements OnInit {

  message: string = '';
  key:string;
  constructor(private privateChat:PrivatechatService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.key=params['id'];
    })
  }

  send(e:Event) {
    event.preventDefault();
    if (this.message != '') {
      this.privateChat.send(this.message,this.key);
      this.message = '';
    }
  }

}
