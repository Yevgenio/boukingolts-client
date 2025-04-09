import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  chatForm!: FormGroup;
  selectedFiles: { [key: string]: File } = {};
  isEditMode = false; // To track whether we're editing or creating a chat
  chatId: string | null = null; // To store the ID of the chat being edited
  existingImagePath: string | undefined;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private route: ActivatedRoute, // To fetch route parameters
    private router: Router // To navigate after submission
  ) {}

  ngOnInit(): void {
    this.chatForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      link: ['', Validators.required],
      category: ['', Validators.required],
      startsAt: [''],
      endsAt: [''],
      imagePath: [''],
    });

    // Check if we're in edit mode (i.e., if a chat ID is in the route)
    this.chatId = this.route.snapshot.paramMap.get('id');
    if (this.chatId) {
      this.isEditMode = true;
      // Fetch the chat details and populate the form
      this.chatService.getChatById(this.chatId).subscribe(chat => {
        this.chatForm.patchValue(chat);
      });
    }
  }

  onFileSelect(event: Event, field: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.chatForm.patchValue({ [field]: file });
      this.chatForm.get(field)?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.chatForm.valid) {
      if (this.isEditMode) {
        // Update the existing chat
        this.chatService.updateChat(this.chatId!, this.chatForm.value).subscribe(() => {
          this.router.navigate(['/chats']);
        });
      } else {
        // Create a new chat
        this.chatService.createChat(this.chatForm.value).subscribe(() => {
          this.router.navigate(['/chats']);
        });
      }
    }
  }
}