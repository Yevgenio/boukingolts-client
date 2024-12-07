import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { DealService } from '../../services/deal.service';

@Component({
  selector: 'app-chat-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './deal-form.component.html',
  styleUrls: ['./deal-form.component.css']
})
export class DealFormComponent implements OnInit {
  dealForm!: FormGroup;
  selectedFiles: { [key: string]: File } = {};

  constructor(
    private fb: FormBuilder,
    private dealService: DealService
  ) {}

  ngOnInit(): void {
    this.dealForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [''],
      category: [''],
      stock: [''],
      startsAt: [''],
      endsAt: [''],
      imagePath: [''],
      barcodePath: [''],
    });
  }

  onFileSelect(event: Event, field: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.dealForm.patchValue({ [field]: file });
      this.dealForm.get(field)?.updateValueAndValidity();
    }
  }


  onSubmit(): void {
    if (this.dealForm.valid) {
      // Submit the form data to the deal service
      const newDeal = this.dealForm.value;
      console.log(newDeal);
      // Call service to add the deal
      this.dealService.addDeal(newDeal).subscribe({
        next: () => {
          alert('Deal added successfully!');
          this.dealForm.reset();
        },
        error: (err) => {
          console.error('Error adding deal', err);
        }
      });
    }
  }
}
