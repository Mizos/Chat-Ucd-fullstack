//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
//Firebase
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule} from "angularfire2/auth";
//Components
import { AppComponent } from './app.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { ChatFeedComponent } from './components/chat-feed/chat-feed.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { MessageComponent } from './components/message/message.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PrivateRoomComponent } from './components/private-room/private-room.component';
import { PrivateNavbarComponent } from './components/private-navbar/private-navbar.component';
import { PrivateFeedComponent } from './components/private-feed/private-feed.component';
import { PrivateFormComponent } from './components/private-form/private-form.component';
import { PrivateMessageComponent } from './components/private-message/private-message.component';
//Services
import { AuthService } from "./services/auth.service";
import { ChatService } from "./services/chat.service";
import { PrivatechatService } from './services/privatechat.service';
//Routes
import { appRoutes } from "./routes";
//Env
import { environment } from "../environments/environment";
import { AuthGuard } from './services/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    ChatFeedComponent,
    ChatRoomComponent,
    MessageComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    UserListComponent,
    UserComponent,
    LoaderComponent,
    PrivateRoomComponent,
    PrivateNavbarComponent,
    PrivateFeedComponent,
    PrivateFormComponent,
    PrivateMessageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [ChatService,AuthService,PrivatechatService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
