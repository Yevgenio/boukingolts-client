import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // for functions such as ngFor
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/chat.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chats: Chat[] = [];

  constructor(public authService: AuthService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getChats().subscribe((data) => {
      this.chats = data;
    });
  }

  isLoggedIn(): void {
    this.authService.isLoggedIn();
  }
}
// export class ChatListComponent {
  
// }