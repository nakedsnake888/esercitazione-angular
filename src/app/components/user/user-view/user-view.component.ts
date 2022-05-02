import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user/user';
import { ENDPOINTS } from 'src/app/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent implements OnInit {
  constructor(public http: HttpClient, private router: Router) {}

  //Variables declaration for table content.
  users: User[] = [];

  //Variables declaration for table management.
  collectionSize = 0;
  page = 1;
  pageSize = 20;

  //Retrieving the first page of users' list.
  ngOnInit(): void {
    this.getUsers(this.page);
  }

  //This action is the basic GET to get all Users.
  getUsers(pageNumber: number) {
    this.http
      .get<any>(environment.baseUrl + ENDPOINTS.USERS_ENDPOINT, {
        headers: { Authorization: 'Bearer ' + environment.token },
        params: { page: pageNumber },
        observe: 'response',
      })
      .subscribe((res: any) => {
        //Getting full collection size from headers.
        this.collectionSize = res.headers.get('x-pagination-total');
        this.users = res.body;
      });
  }

  //This action navigates to specific user profile page.
  navigateToUser(userId: number) {
    this.router.navigate(['/', 'profile'], { queryParams: { id: userId } });
  }

  //This is needed to refresh the paged list of users when switching the page.
  refreshUserList() {
    this.getUsers(this.page);
  }
}
