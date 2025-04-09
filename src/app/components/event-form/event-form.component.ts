import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  selectedFiles: { [key: string]: File } = {};
  isEditMode = false; // To track whether we're editing or creating a event
  eventId: string | null = null; // To store the ID of the event being edited
  existingImagePath: string | undefined;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute, // To fetch route parameters
    private router: Router // To navigate after submission
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      link: ['', Validators.required],
      category: ['', Validators.required],
      startsAt: [''],
      endsAt: [''],
      imagePath: [''],
    });

    // Check if we're in edit mode (i.e., if a event ID is in the route)
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.isEditMode = true;
      // Fetch the event details and populate the form
      this.eventService.getEventById(this.eventId).subscribe(event => {
        this.eventForm.patchValue(event);
      });
    }
  }

  onFileSelect(event: Event, field: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.eventForm.patchValue({ [field]: file });
      this.eventForm.get(field)?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      if (this.isEditMode) {
        // Update the existing event
        this.eventService.updateEvent(this.eventId!, this.eventForm.value).subscribe(() => {
          this.router.navigate(['/events']);
        });
      } else {
        // Create a new event
        this.eventService.createEvent(this.eventForm.value).subscribe(() => {
          this.router.navigate(['/events']);
        });
      }
    }
  }
}