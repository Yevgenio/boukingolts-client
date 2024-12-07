import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // for functions such as ngFor
import { DealService } from '../../services/deal.service';
import { Deal } from '../../models/deal.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-deal-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.css']
})
export class DealListComponent implements OnInit {
  deals: Deal[] = [];

  constructor(public authService: AuthService, private dealService: DealService) { }

  ngOnInit(): void {
    this.dealService.getDeals().subscribe((data) => {
      this.deals = data;
    });
  }

  isLoggedIn(): void {
    this.authService.isLoggedIn();
  }
}
// export class DealListComponent {
  
// }