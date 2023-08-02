import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {
  member: Member | undefined;
  currentUser$: Observable<User | null> = of(null)

  constructor(private memberService: MembersService, private route: ActivatedRoute, public accountService: AccountService) {}

  ngOnInit(): void {
    this.loadMember()
    this.currentUser$ = this.accountService.currentUser$;
  }

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username')
    if(!username)
    {
      return;
    }
    this.memberService.getMember(username).subscribe({
      next: member => this.member=member
    });
  }

  deleteUser()
  {
    if(!this.member)
    {
      return;
    }
    this.accountService.deleteCurrentUser(this.member.userId)
  }
}
