import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/classes/user/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ENDPOINTS } from 'src/app/constants';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  genderList = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];
  statusList = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  constructor(public http: HttpClient, public activeModal: NgbActiveModal) {}

  user!: User;
  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern("^s*([A-Za-z]{1,}([.,] |[-']| ))+[A-Za-z]+.?s*$"),
      ]),
      gender: new FormControl(this.genderList[0].value),
      email: new FormControl('', [Validators.required, Validators.email]),
      status: new FormControl(this.statusList[0].value),
    });
    if (this.user) {
      this.userForm.setValue({
        name: this.user.name,
        gender: this.user.gender,
        email: this.user.email,
        status: this.user.status,
      });
    }
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  //Get di un elemento (via GET)
  getUser(userId: number) {
    this.http
      .get<User>(
        environment.baseUrl + ENDPOINTS.USER_ENDPOINT + '/' + this.user.id,
        {
          headers: { Authorization: 'Bearer ' + environment.token },
        }
      )
      .subscribe((user) =>
        this.userForm.setValue({
          name: user.name,
          gender: user.gender,
          email: user.email,
          status: user.status,
        })
      );
  }

  //Submit Update or Registration
  onSubmit() {
    if (this.user) {
      console.log('qui');
      this.http
        .put(
          environment.baseUrl + ENDPOINTS.USER_ENDPOINT + '/' + this.user.id,
          this.userForm.value,
          {
            headers: { Authorization: 'Bearer ' + environment.token },
          }
        )
        .subscribe(() => this.activeModal.close());
    } else {
      this.http
        .post(
          environment.baseUrl + ENDPOINTS.USER_ENDPOINT,
          this.userForm.value,
          {
            headers: { Authorization: 'Bearer ' + environment.token },
          }
        )
        .subscribe(() => this.activeModal.close());
    }
  }
}
