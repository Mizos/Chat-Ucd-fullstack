import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  many=[1,2,3,4];

  add(){
    this.many.push(1);
  }
  constructor() { }

  ngOnInit() {
  }

}
