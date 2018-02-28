import { Route } from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { PrivateRoomComponent } from './components/private-room/private-room.component';
import { AuthGuard } from './services/auth.guard';

export const appRoutes:Route[]=[
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'chat',component:ChatRoomComponent ,canActivate:[AuthGuard]},
  {path:'chat/:id',component:PrivateRoomComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];