import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-form',
  templateUrl: './private-form.component.html',
  styleUrls: ['./private-form.component.scss']
})
export class PrivateFormComponent implements OnInit {

  message: string = '';
  constructor() { }

  ngOnInit() {
  }

  send(event) {
   
  }

}
