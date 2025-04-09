import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // for functions such as ngFor
import { ActivatedRoute } from '@angular/router';
import { DealService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-memo-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class DealDetailsComponent implements OnInit {
  product: Product | undefined;

  @ViewChild('zoomedImage', { static: false }) zoomedImage!: ElementRef;

  constructor(private route: ActivatedRoute, private dealService: DealService) {}

  // ngOnInit(): void {
  //   const dealId = this.route.snapshot.paramMap.get('_id');
    
  //   if (dealId) {
  //     this.dealService.getDealById(dealId).subscribe((data) => {
  //       this.product = data;
  //     });
  //   }
  // }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const dealId = params.get('id');
      if (dealId) {
        this.dealService.getDealById(dealId).subscribe(
          data => this.product = data,
          error => {
            console.error('Error fetching product details:', error);
            // Handle error, e.g., show an error message
          }
        );
      } else {
        console.error('Product ID not found');
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
// export class DealDetailsComponent {

// }