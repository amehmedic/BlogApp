import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Post } from 'src/app/_models/post';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  user: User | null = null;
  model: any = {}

  
  constructor(private postService: PostsService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })}

  ngOnInit(): void {  
  }
}

