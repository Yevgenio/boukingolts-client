import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // for functions such as ngFor
import { DealService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-memo-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class DealListComponent implements OnInit {
  deals: Product[] = [];

  constructor(public authService: AuthService, private dealService: DealService, private router: Router) { }

  ngOnInit(): void {
    this.dealService.getDeals().subscribe((data) => {
      this.deals = data;
      this.deals.forEach(product => {
        product.name = product.name?.substring(0, 30);
        product.description = product.description?.substring(0, 30);
      });
    });
  }

  isLoggedIn(): void {
    this.authService.isLoggedIn();
  }

  editDeal(product: any) {
    this.router.navigate(['/deals/edit/', product._id]);
    console.log('Editing product:', product);
  }

  removeDeal(product: any) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.dealService.deleteDeal(product._id).subscribe(() => {
        this.deals = this.deals.filter(d => d._id !== product._id);
      });
    }
  }
}
// export class DealListComponent {
  
// }