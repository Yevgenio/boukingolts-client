import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
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

  constructor(public authService: AuthService, private chatService: ChatService, private router: Router) { }

  ngOnInit(): void {
    this.chatService.getChats().subscribe((data) => {
      this.chats = data;
      this.chats.forEach(chat => {
        chat.name = chat.name.substring(0, 30);
        chat.description = chat.description.substring(0, 30);
      });
    });
  }

  isLoggedIn(): void {
    this.authService.isLoggedIn();
  }

  editChat(chat: any) {
    this.router.navigate(['/chats/edit/', chat._id]);
    console.log('Editing chat:', chat);
  }

  removeChat(chat: any) {
    if (confirm('Are you sure you want to delete this chat?')) {
      this.chatService.deleteChat(chat._id).subscribe(() => {
        this.chats = this.chats.filter(c => c._id !== chat._id);
        alert('Chat deleted successfully.');
      });
    }
  }
}
// export class ChatListComponent {
  
// }