import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';

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

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService
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
      // Submit the form data to the chat service
      const newChat = this.chatForm.value;
      console.log(newChat);
      // Call service to add the chat
      this.chatService.addChat(newChat).subscribe({
        next: () => {
          alert('Chat added successfully!');
          this.chatForm.reset();
        },
        error: (err) => {
          console.error('Error adding chat', err);
        }
      });
    }
  }
}
