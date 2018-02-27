import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string="";
  password:string="";
  error:string="";
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }


  login(e:Event){
    e.preventDefault();
    if(this.email==""||this.password=="")
    this.error="All fileds are required !";
    else
    this.authService.login(this.email,this.password);
  }

  noAccount(e:Event){
    e.preventDefault();
    this.router.navigate(['signup']);
  }



}
