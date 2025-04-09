import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // for functions such as ngFor
import { MemoService } from '../../services/memo.service';
import { Memo } from '../../models/memo.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-memo-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.css']
})
export class MemoListComponent implements OnInit {
  memos: Memo[] = [];

  constructor(
    public authService: AuthService, 
    private memoService: MemoService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.memoService.getMemos().subscribe((data) => {
      this.memos = data;
      this.memos.forEach(memo => {
        memo.name = memo.name?.substring(0, 30);
        memo.description = memo.description?.substring(0, 30);
      });
    });
  }

  isLoggedIn(): void {
    this.authService.isLoggedIn();
  }

  editMemo(memo: any) {
    this.router.navigate(['/memos/edit/', memo._id]);
    console.log('Editing memo:', memo);
  }

  removeMemo(memo: any) {
    if (confirm('Are you sure you want to delete this memo?')) {
      this.memoService.deleteMemo(memo._id).subscribe(() => {
        this.memos = this.memos.filter(d => d._id !== memo._id);
      });
    }
  }
}
// export class MemoListComponent {
  
// }