import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProjectService } from "src/app/services/project.service";
import { TaskService } from "src/app/services/task.service";
import { UserService } from "src/app/services/user.service";
import { BacklogService } from "src/app/services/backlog.service";

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {

  projectId: any;
  task: any = {};
  addFlag: boolean = false;
  tasks: any[] = [];
  todoList: any[] = [];
  inProgressList: any[] = [];
  completeList: any[] = [];
  id: any;
  roleFlag: boolean = false;
  assignFlag: boolean = false;
  users: any[] = [];
  developers: any[] = [];
  developerId: string;
  taskId: string;
  backlogs: any[] = [];
  backlogId: any;
  loginName: string = "not assigned";


  constructor(private route: ActivatedRoute, private taskService: TaskService,
    private userService: UserService, private backlogService: BacklogService) { }

  onAssignTask() {
    this.assignFlag = true;


  }
  getPriority(priority) {
    if (priority == 0)
      return "low";
    else if (priority == 1)
      return "medium"
    else
      return "high";
  }

  showTasks() {

    this.getTasks();
    this.getUsers();

  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        // for (const task of  this.tasks) {
        //   for (const user of data) {

        //     if(task.userId===user.id)
        //     {
        //       this.task.userId=user.name;
        //     }
        //   }
        // }
        this.users = data;
        console.log(data);
        this.developers = this.users.filter(function (user) {
          return user.role == 'developer';
        })
        console.log("in user component data" + data);
        console.log(this.developers[0]);
      },
      error => {
        // this.msg = "you dont have access to view this page";

        console.log(error);
      }
    );
  }
  getUserById(task) {
    if (task.userId) {
      console.log(this.users)
      let user = this.users.filter(x => {
        return x.id == task.userId
      });
      return user[0].name;
    }
    else
      return "Not assigned yet";

  }

  getTasks() {
    this.taskService.getTasksByBacklogId(this.backlogId).subscribe(
      data => {


        this.completeList = [];
        this.inProgressList = [];
        this.todoList = [];
        this.tasks = data;

        if (sessionStorage.getItem('role') == 'manager') {

          for (let t of data) {

            if (t.status === "complete") {
              this.completeList.push(t)
            }
            if (t.status === "toDo") {
              this.todoList.push(t)
            }
            if (t.status === "inProgress") {
              this.inProgressList.push(t)
            }
          }
        }
        else {

          for (let t of data) {
            if (t.status === "complete" && sessionStorage.getItem('id') == t.userId) {
              this.completeList.push(t)
            }
            if (t.status === "toDo" && sessionStorage.getItem('id') == t.userId) {
              this.todoList.push(t)
            }
            if (t.status === "inProgress" && sessionStorage.getItem('id') == t.userId) {
              this.inProgressList.push(t)
            }
          }

        }

      },
      err => {
        console.log(err);
      }
    )
  }
  ngOnInit() {




    if (sessionStorage.getItem('role') == 'manager') {
      this.roleFlag = true;
    }

    this.projectId = this.route.snapshot.params.id;



    this.backlogService.getBacklogsByProjectId(this.route.snapshot.params.id).subscribe(
      data => {
        console.log("1111111")
        console.log(data);
        this.backlogs = data;
      },
      err => {
        console.log(err);
      }
    )



  }


  editTask(taskId) {
    this.id = taskId;
  }

  updateTask(task) {

    this.taskService.updateTask(task).subscribe(
      data => {
        console.log(data);
        this.showTasks();
      }
    )
    this.id = null;
  }

  deleteTask(taskId) {
    this.taskService.deleteTask(taskId).subscribe(
      data => {
        console.log(data);
        this.showTasks();
      }
    )
  }



  createTask() {
    this.addFlag = true;
  }
  onAddtask() {
    console.log(this.task);
    if (this.task.priority == 'high') {
      this.task.priority = '2';
    }
    else if (this.task.priority == 'medium') {
      this.task.priority = '1';
    } else {
      this.task.priority = '0';
    }

    this.task.backlogId = this.backlogId;
    this.taskService.addTask(this.task).subscribe(
      data => {
        console.log(data);
        this.addFlag = false;
        this.showTasks();
      }
    )
  }

  onAssign() {
    this.assignFlag = false;
    console.log(this.taskId);
    console.log(this.developerId);
    this.taskService.assignTaskByDeveloperId(this.taskId, this.developerId).subscribe(
      data => {
        console.log(data);
        this.showTasks();
      },
      err => {
        console.log(err);
      }
    )
  }


}


