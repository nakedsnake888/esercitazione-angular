import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { UserViewComponent } from './components/user/user-view/user-view.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { GenderPipe } from './classes/user/gender.pipe';
import { PostViewComponent } from './components/post/post-view/post-view.component';

const routes: Routes = [
  { path: 'registration', component: UserRegistrationComponent },
  { path: 'people', component: UserViewComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'posts', component: PostViewComponent },
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserViewComponent,
    UserProfileComponent,
    GenderPipe,
    PostViewComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
