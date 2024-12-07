import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // for functions such as ngFor
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/chat.model';

@Component({
  selector: 'app-chat-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './chat-details.component.html',
  styleUrl: './chat-details.component.css'
})
export class ChatDetailsComponent implements OnInit {
  chat: Chat | undefined;

  @ViewChild('zoomedImage', { static: false }) zoomedImage!: ElementRef;

  constructor(private route: ActivatedRoute, private chatService: ChatService) {}

  // ngOnInit(): void {
  //   const chatId = this.route.snapshot.paramMap.get('_id');
    
  //   if (chatId) {
  //     this.chatService.getChatById(chatId).subscribe((data) => {
  //       this.chat = data;
  //     });
  //   }
  // }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const chatId = params.get('id');
      if (chatId) {
        this.chatService.getChatById(chatId).subscribe(
          data => this.chat = data,
          error => {
            console.error('Error fetching chat details:', error);
            // Handle error, e.g., show an error message
          }
        );
      } else {
        console.error('Chat ID not found');
        // Handle missing ID case, e.g., redirect or show an error message
      }
    });
  }

  onMouseMove(event: MouseEvent) {
    const container = event.currentTarget as HTMLElement;
    const zoomedImage = this.zoomedImage.nativeElement as HTMLElement;

    const rect = container.getBoundingClientRect();
    const offsetX = event.clientX - rect.left; // X position within the container
    const offsetY = event.clientY - rect.top;  // Y position within the container

    // Calculate position of mouse in percentage relative to the container
    const posXPercent = (offsetX / container.offsetWidth) * 100;
    const posYPercent = (offsetY / container.offsetHeight) * 100;

    // Update background position to pan zoomed-in image
    zoomedImage.style.backgroundPosition = `${posXPercent}% ${posYPercent}%`;
  }

  onMouseLeave() {
    // Reset the zoomed image background position when mouse leaves
    this.zoomedImage.nativeElement.style.backgroundPosition = 'center';
  }
  
}
// export class ChatDetailsComponent {

// }