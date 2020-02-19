import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from "src/app/services/project.service";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: any[] = [];
  id: string;
  flag: boolean = false;
  mySubscription: any;
  project: any = {};
  addFlag: boolean = false;
  roleFlag: boolean = false;
  proId: string;
  msg;
  loginName;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {

    this.loginName=sessionStorage.getItem('loginName')
    if (sessionStorage.getItem('role') == 'manager') {
      this.roleFlag = true;
    }
    this.projectService.getProjects().subscribe(
      data => {

        this.projects = data;
        console.log(this.projects);
      },
      err => {
        console.log(err);
      }
    );
  }

  searchProjectByID(kid) {
    console.log(kid);
    this.projectService.searchProjectByID(kid).subscribe(
      data => {
        this.projects = data;


      },
      err => {
        console.log(err);
      }
    )

  }

  onEditProject(projectId: string) {
    this.id = projectId;
    this.flag = true;
  }

  onClickProjectDashboard(project){
    //this.project=project;
   // this.router.navigate(['projectDashboard']);
    this.router.navigateByUrl(`/projectDashboard/${project.id}`);

  }

  onUpdateProject(project) {
    this.flag = false;
    this.id = null;
    this.projectService.updateProject(project).subscribe((data)=>{
      this.msg = data.msg;
      this.ngOnInit();
    });
  }
  onAddProject() {
    this.addFlag = false;
    console.log(this.project);
    this.projectService.addProject(this.project).subscribe(
      data => {
        this.msg = data;
        this.ngOnInit();

      },
      err => {

      }
    );
  }

  onAdd() {
    this.addFlag = true;
  }

  onDeleteProject(ProjectId) {
    this.projectService.deleteProject(ProjectId).subscribe(
      data => {
        this.msg = data.msg;
        this.ngOnInit();
      }
    );

  }



}
