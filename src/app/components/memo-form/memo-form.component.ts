import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { MemoService } from '../../services/memo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-memo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './memo-form.component.html',
  styleUrls: ['./memo-form.component.css']
})
export class MemoFormComponent implements OnInit {
  memoForm!: FormGroup;
  selectedFiles: { [key: string]: File } = {};
  isEditMode = false; // To track whether we're editing or creating a memo
  memoId: string | null = null; // To store the ID of the memo being edited
  existingImagePath: string | undefined;

  constructor(
    private fb: FormBuilder,
    private memoService: MemoService,
    private route: ActivatedRoute, // To fetch route parameters
    private router: Router // To navigate after submission
  ) {}

  ngOnInit(): void {
    this.memoForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      type: ['product', Validators.required], // 'product', 'event', 'external', 'blog'
      targetId: [''],
      externalLink: [''],
      immediateRedirect: [false],
      startsAt: [''],
      endsAt: [''],
      imagePath: [''],
    });
  
    const memoId = this.route.snapshot.paramMap.get('id');
    if (memoId) {
      this.isEditMode = true;
      this.memoId = memoId;
  
      // Fetch the existing memo data
      this.memoService.getMemoById(memoId).subscribe(memo => {
        this.memoForm.patchValue({
          name: memo.name,
          description: memo.description,
          type: memo.type,
          targetId: memo.targetId,
          externalLink: memo.externalLink,
          immediateRedirect: memo.immediateRedirect,
          startsAt: memo.startsAt ? new Date(memo.startsAt).toISOString().substring(0, 10) : '',
          endsAt: memo.endsAt ? new Date(memo.endsAt).toISOString().substring(0, 10) : '',
        });
  
        // Store existing image and barcode paths
        this.existingImagePath = memo.imagePath;
      });
    }
  }

  onFileSelect(event: Event, field: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.memoForm.patchValue({ [field]: file });
      this.memoForm.get(field)?.updateValueAndValidity();
    }
  }


  onSubmit(): void {
    if (this.memoForm.valid) {
      // Prepare the payload
      const memoData = { ...this.memoForm.value };
  
      // Convert empty strings to null
      Object.keys(memoData).forEach((key) => {
        if (memoData[key] === '') {
          memoData[key] = null;
        }
      });
      if (this.isEditMode) {
        // Update the existing memo
        this.memoService.updateMemo(this.memoId!, this.memoForm.value).subscribe(() => {
          this.router.navigate(['/memos']);
        });
      } else {
        // Create a new memo
        this.memoService.createMemo(this.memoForm.value).subscribe(() => {
          this.router.navigate(['/memos']);
        });
      }
    }
  }
}
