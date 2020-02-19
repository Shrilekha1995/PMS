import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from "src/app/components/register/register.component";
import { LoginComponent } from "src/app/components/login/login.component";
import { ProjectComponent } from "src/app/components/project/project.component";
import { AuthGuard } from "src/app/auth.guard";
import { UserComponent } from "src/app/components/user/user.component";
import { PageNotFoundComponent } from "src/app/components/page-not-found/page-not-found.component";
import { HomeComponent } from "src/app/components/home/home.component";
import { LogoutComponent } from "src/app/components/logout/logout.component";
import { ProjectDashboardComponent } from "src/app/components/project-dashboard/project-dashboard.component";
import { BacklogComponent } from "src/app/components/backlog/backlog.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login/register',
    component: RegisterComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'project',
    component: ProjectComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },{
    path:'logout',
    component:LogoutComponent
   
  },{
    path:'projectDashboard/:id',
    component:ProjectDashboardComponent

  },{
    path:'projectDashboard/:name/backlog',
    component:BacklogComponent

  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
