import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { DragDropModule,CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-memo-form',
  standalone: true,
  imports: [ReactiveFormsModule], //, DragDropModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  // selectedFiles: { [key: string]: File } = {};
  isEditMode = false; // To track whether we're editing or creating a product
  productId: string | null = null; // To store the ID of the product being edited
  existingImages: string[] | undefined;

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
      images: [],
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
        });
  
        // Store existing image
        this.existingImages = product.images?.map(image => image.url);
      });
    }
  }

  onFilesSelect(event: Event): void {
    const files = (event.target as HTMLInputElement).files;

    if (files) {
      this.selectedImages = Array.from(files);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      const productData = this.productForm.value;
  
      // Append basic fields
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('category', productData.category);
  
      // Handle images differently for create/update
      if (!this.isEditMode)
        {
          // For new products: Only append new files
          this.selectedImages.forEach(img => {
            if (img instanceof File) {
              formData.append('images', img);
            }
          });
  
          this.productService.createProduct(formData).subscribe({
            next: () => this.router.navigate(['/products']),
            error: (err) => console.error('Create error:', err)
          });
        }
        else
        {
        // For updates: Send existing URLs as JSON and new files as FormData
        const existingImages = this.selectedImages
          .filter(img => typeof img === 'string')
          .map(url => ({ url }));
  
        formData.append('data', JSON.stringify({
          ...productData,
          images: existingImages
        }));
  
        // Append new image files
        this.selectedImages.forEach(img => {
          if (img instanceof File) {
            formData.append('images', img);
          }
        });
        
        this.productService.updateProduct(this.productId!, formData).subscribe({
          next: () => this.router.navigate(['/products']),
          error: (err) => console.error('Update error:', err)
        });
      }
    }
  }
}
