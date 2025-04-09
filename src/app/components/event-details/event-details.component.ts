import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // for functions such as ngFor
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {
  event: Event | undefined;

  @ViewChild('zoomedImage', { static: false }) zoomedImage!: ElementRef;

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  // ngOnInit(): void {
  //   const eventId = this.route.snapshot.paramMap.get('_id');
    
  //   if (eventId) {
  //     this.eventService.getEventById(eventId).subscribe((data) => {
  //       this.event = data;
  //     });
  //   }
  // }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('id');
      if (eventId) {
        this.eventService.getEventById(eventId).subscribe(
          data => this.event = data,
          error => {
            console.error('Error fetching event details:', error);
            // Handle error, e.g., show an error message
          }
        );
      } else {
        console.error('Event ID not found');
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
// export class EventDetailsComponent {

// }