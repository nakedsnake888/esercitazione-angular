import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/classes/post';
import { ENDPOINTS } from 'src/app/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css'],
})
export class PostViewComponent implements OnInit {
  posts!: any[];
  userId!: number;
  name!: string;
  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.name = history.state.name ? history.state.name : null;
    this.route.queryParams.subscribe((params) => {
      this.userId = params['id'];
      this.getPosts(this.userId);
    });
  }

  //Action neeeded to get posts (of specified user).
  getPosts(userId: number) {
    this.http
      .get<Post[]>(
        environment.baseUrl +
          ENDPOINTS.USERS_ENDPOINT +
          '/' +
          userId +
          '/' +
          ENDPOINTS.POSTS_ENPOINT
      )
      .subscribe((posts) => (this.posts = posts));
  }
}
