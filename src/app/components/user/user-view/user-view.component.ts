import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/classes/user/user';
import { ENDPOINTS } from 'src/app/constants';
import { environment } from 'src/environments/environment';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent implements OnInit {
  constructor(public http: HttpClient, private modalService: NgbModal) {}

  //Variables declaration for table content
  users: User[] = [];
  usersPaged: User[] = [];

  //Variables declaration for table management
  collectionSize = 0;
  page = 1;
  pageSize = 10;

  ngOnInit(): void {
    this.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.collectionSize = users.length;
      this.refreshUserList();
    });
  }

  //This action is the basic GET to get all Users
  getUsers() {
    return this.http.get<User[]>(
      environment.baseUrl + ENDPOINTS.USER_ENDPOINT,
      {
        headers: { Authorization: 'Bearer' + environment.token },
      }
    );
  }

  //This is needed to refresh the paged list of Users
  refreshUserList() {
    this.usersPaged = this.users.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  //This is needed to open the modal to update the user.
  openUpdateModal(user: User) {
    const modalRef = this.modalService.open(UserRegistrationComponent);
    modalRef.componentInstance.user = user;
  }
}
