import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersAddLoginComponent } from './users-add-login/users-add-login.component';
import { UserproviderService } from './userprovider.service';
import { CoursHomeComponent } from './cours-home/cours-home.component';
import { CoursAddComponent } from './cours-add/cours-add.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersHomeComponent } from './users-home/users-home.component';
import { CoursPublicComponent } from './cours-public/cours-public.component';


const appRoutes: Routes = [
  {
    path: '',
    component: UsersAddLoginComponent,
  },
  {
    path: 'cours/add',
    component: CoursAddComponent,
  },
  {
    path: 'cours',
    component: CoursHomeComponent,
    pathMatch:'full'
  },
  {
    path: 'users',
    component: UsersHomeComponent,
  },
  {
    path: 'users/add',
    component: UsersAddComponent,
  },
  {
    path: 'cours/public',
    component: CoursPublicComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UsersAddLoginComponent,
    CoursHomeComponent,
    CoursAddComponent,
    UsersAddComponent,
    UsersHomeComponent,
    CoursPublicComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
      )
  ],
  providers: [UserproviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
