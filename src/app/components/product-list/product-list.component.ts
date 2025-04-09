import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // for functions such as ngFor
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-memo-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(public authService: AuthService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.products.forEach(product => {
        product.name = product.name?.substring(0, 30);
        product.description = product.description?.substring(0, 30);
      });
    });
  }

  isLoggedIn(): void {
    this.authService.isLoggedIn();
  }

  editProduct(product: any) {
    this.router.navigate(['/products/edit/', product._id]);
    console.log('Editing product:', product);
  }

  removeProduct(product: any) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product._id).subscribe(() => {
        this.products = this.products.filter(d => d._id !== product._id);
      });
    }
  }
}
// export class ProductListComponent {
  
// }