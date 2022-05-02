import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user/user';
import { ENDPOINTS } from 'src/app/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user!: User;
  userId!: number;
  allDataFetched: boolean = false;

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['id'];
      this.getUser(this.userId);
    });
  }

  //This action is the basic GET to get user information.
  getUser(userId: number) {
    this.http
      .get<User>(
        environment.baseUrl + ENDPOINTS.USERS_ENDPOINT + '/' + userId,
        {
          headers: { Authorization: 'Bearer ' + environment.token },
        }
      )
      .subscribe((user) => {
        this.user = user;
        this.allDataFetched = true;
      });
  }

  //This action is needed to navigate to posts of a specific user.
  navigateToPosts() {
    this.router.navigate(['/', 'posts'], {
      queryParams: { id: this.userId },
      state: { name: this.user.name },
    });
  }
}
