import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DragDropModule,CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-memo-form',
  standalone: true,
  imports: [ReactiveFormsModule, DragDropModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  selectedFiles: { [key: string]: File } = {};
  isEditMode = false; // To track whether we're editing or creating a product
  productId: string | null = null; // To store the ID of the product being edited
  existingBarcodePath: string | undefined;
  existingImagePath: string | undefined;

  selectedImages: (File | string)[] = []; // File (new) or string (existing image URL)

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute, // To fetch route parameters
    private router: Router // To navigate after submission
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      category: [''],
      stock: -1,
      startsAt: [''],
      endsAt: [''],
      imagePath: [''],
      barcodePath: [''],
    });
  
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isEditMode = true;
      this.productId = productId;
  
      // Fetch the existing product data
      this.productService.getProductById(productId).subscribe(product => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          category: product.category,
          stock: product.stock,
          startsAt: product.startsAt ? new Date(product.startsAt).toISOString().substring(0, 10) : '',
          endsAt: product.endsAt ? new Date(product.endsAt).toISOString().substring(0, 10) : '',
        });
  
        // Store existing image and barcode paths
        this.existingImagePath = product.imagePath;
        this.existingBarcodePath = product.barcodePath;
      });
    }
  }

  // onFileSelect(event: Event, field: string): void {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     this.productForm.patchValue({ [field]: file });
  //     this.productForm.get(field)?.updateValueAndValidity();
  //   }
  // }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        this.selectedImages.push(input.files[i]);
      }
    }
  }

  getImagePreview(img: File | string): string {
    if (typeof img === 'string') {
      return img; // already uploaded image URL
    } else {
      return URL.createObjectURL(img); // preview for new file
    }
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.selectedImages, event.previousIndex, event.currentIndex);
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      // Prepare the payload
      const productData = { ...this.productForm.value };
  
      // Convert empty strings to null
      Object.keys(productData).forEach((key) => {
        if (productData[key] === '') {
          productData[key] = null;
        }
      });
      if (this.isEditMode) {
        // Update the existing product
        this.productService.updateProduct(this.productId!, this.productForm.value).subscribe(() => {
          this.router.navigate(['/products']);
        });
      } else {
        // Create a new product
        this.productService.createProduct(this.productForm.value).subscribe(() => {
          this.router.navigate(['/products']);
        });
      }
    }
  }
}
