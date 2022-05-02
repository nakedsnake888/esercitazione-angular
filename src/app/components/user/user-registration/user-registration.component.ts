import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/classes/user/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ENDPOINTS } from 'src/app/constants';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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

  constructor(public http: HttpClient, private router: Router) {}

  user!: User;
  userForm!: FormGroup;

  //Creates a new User Form.
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
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  //Submit user registration.
  onSubmit() {
    this.http
      .post(
        environment.baseUrl + ENDPOINTS.USERS_ENDPOINT,
        this.userForm.value,
        {
          headers: { Authorization: 'Bearer ' + environment.token },
        }
      )
      .subscribe(() => this.router.navigate(['/', 'people']));
  }
}
