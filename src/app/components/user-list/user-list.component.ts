import { Component,} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent  {

  users: User[]

  constructor(chat: ChatService) {
    chat.getUsers().subscribe(users => {
     this.users=Object.values(users);
    });
  }

}
