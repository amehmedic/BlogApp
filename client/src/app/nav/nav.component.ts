import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  currentUser$: Observable<User | null> = of(null)

  constructor(public accountService: AccountService, private router: Router){}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout()
  {
    this.accountService.logout();
  }
}
