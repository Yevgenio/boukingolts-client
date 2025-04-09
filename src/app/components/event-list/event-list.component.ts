import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // for functions such as ngFor
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor(public authService: AuthService, private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
      this.events.forEach(event => {
        event.name = event.name.substring(0, 30);
        event.description = event.description.substring(0, 30);
      });
    });
  }

  isLoggedIn(): void {
    this.authService.isLoggedIn();
  }

  editEvent(event: any) {
    this.router.navigate(['/events/edit/', event._id]);
    console.log('Editing event:', event);
  }

  removeEvent(event: any) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(event._id).subscribe(() => {
        this.events = this.events.filter(c => c._id !== event._id);
        alert('Event deleted successfully.');
      });
    }
  }
}
// export class EventListComponent {
  
// }