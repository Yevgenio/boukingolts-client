import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home', // ensure this matches your routing configuration
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        animate('600ms cubic-bezier(0.25, 0.8, 0.25, 1)')
      ])
    ])
  ]
})

export class HomeComponent {
  title = 'Yevgeni Boukingots';
  description = 'Building web experiences';
  button = 'Arriving soon..';
}