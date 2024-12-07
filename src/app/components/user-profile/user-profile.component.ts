import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // for functions such as ngFor
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: any;
  username: string | null = '';

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    // Get the username from the URL parameter
    this.username = this.route.snapshot.paramMap.get('username');
    
    // Fetch the user profile by username
    if (this.username) {
      this.userService.getUserByUsername(this.username).subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.error('Error fetching user data', error);
        }
      );
    }
  }
}