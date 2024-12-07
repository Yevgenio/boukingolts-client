import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
// import { UserService } from '../../services/user.service'; // Assume you have a user service
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.settings().subscribe((userData) => {
      this.user = userData;
      console.log(userData)
    });
  }

  isAdmin(): boolean {
    // console.log(this.user?.role);
    return this.user?.role === 'admin';
  }
}