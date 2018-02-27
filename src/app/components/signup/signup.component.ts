import { Component} from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent{

  email:string;
  password:string;
  displayName:string;
  errorMessage:string;
  constructor(private auth:AuthService,private router:Router) { }

  signUp(event){
    event.preventDefault();
    const user={
      email:this.email,
      password:this.password,
      displayName:this.displayName
    }
    this.auth.signUp(user).then(resolve=>{
      this.router.navigate(['login']);
    }).catch(error=>{
      this.errorMessage=error;
    })
  }

}
