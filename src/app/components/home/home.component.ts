import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home', // ensure this matches your routing configuration
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})

export class HomeComponent {
  title = 'My Awesome Portfolio';
}
