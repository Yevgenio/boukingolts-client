import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // for functions such as ngFor
import { ActivatedRoute } from '@angular/router';
import { MemoService } from '../../services/memo.service';
import { Memo } from '../../models/memo.model';

@Component({
  selector: 'app-memo-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './memo-details.component.html',
  styleUrl: './memo-details.component.css'
})
export class MemoDetailsComponent implements OnInit {
  memo: Memo | undefined;

  @ViewChild('zoomedImage', { static: false }) zoomedImage!: ElementRef;

  constructor(
    private route: ActivatedRoute, 
    private memoService: MemoService
  ) {}

  // ngOnInit(): void {
  //   const memoId = this.route.snapshot.paramMap.get('_id');
    
  //   if (memoId) {
  //     this.memoService.getMemoById(memoId).subscribe((data) => {
  //       this.memo = data;
  //     });
  //   }
  // }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const memoId = params.get('id');
      if (memoId) {
        this.memoService.getMemoById(memoId).subscribe(
          data => this.memo = data,
          error => {
            console.error('Error fetching memo details:', error);
            // Handle error, e.g., show an error message
          }
        );
      } else {
        console.error('Memo ID not found');
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
// export class MemoDetailsComponent {

// }