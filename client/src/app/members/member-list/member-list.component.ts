import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  shownmembers: Member[] = [];
  allmembers: Member[] = [];
  searchQuery: string= '';

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {  
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers().subscribe({
      next: allmembers => this.allmembers = allmembers
    })
  }

  filterData() {
    if (!this.searchQuery) {
      this.shownmembers = this.allmembers;
      return;
    }
    this.shownmembers = this.allmembers.filter(item =>
      item.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
