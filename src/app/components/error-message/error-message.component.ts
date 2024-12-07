import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent implements OnInit {
  message: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.get('message') == 'logged-in')
        this.message = "You are already logged in."
      else if(params.get('message') == 'access-denied')
        this.message = "You don't have access to this page."
      else 
        this.message = params.get('message') || 'An unexpected error occurred.';
    });
  }
}