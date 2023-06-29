import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined;

  constructor(public accountService: AccountService, private router: Router){}

  ngOnInit(): void {
  }
}
