import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProjectComponent } from './components/project/project.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HttpInterceptorService } from "src/app/services/http-interceptor.service";
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatCardModule,
  MatTableModule
} from "@angular/material";
import { BacklogComponent } from './components/backlog/backlog.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ProjectComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    PageNotFoundComponent,
    LogoutComponent,
    ProjectDashboardComponent,
    BacklogComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    MatCardModule
   
  ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass :HttpInterceptorService, multi:true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
