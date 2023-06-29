import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { Post } from 'src/app/_models/post';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input() post: Post | undefined;
  member: Member | undefined;
  
  constructor(public accountService: AccountService, private memberService: MembersService, private router: Router){}

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember(){
    const id = this.post?.userId
    if(!id)
    {
      return;
    }
    this.memberService.getMember(id.toString()).subscribe({
      next: member => this.member=member
    });
  }
}
