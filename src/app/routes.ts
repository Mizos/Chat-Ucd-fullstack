import { Route } from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { PrivateRoomComponent } from './components/private-room/private-room.component';

export const appRoutes:Route[]=[
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'chat',component:ChatRoomComponent},
  {path:'chat/:id',component:PrivateRoomComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];