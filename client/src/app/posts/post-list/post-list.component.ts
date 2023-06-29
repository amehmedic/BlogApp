import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/_models/post';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostsService) {}

  ngOnInit(): void {  
    this.loadPosts();
  }

  loadPosts()
  {
    this.postService.getPosts().subscribe({
      next: posts => this.posts = posts
    })
  }

}