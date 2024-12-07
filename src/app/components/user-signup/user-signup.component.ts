import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/error/logged-in']);
    }
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => console.error(err),
      });
    }
  }
}
