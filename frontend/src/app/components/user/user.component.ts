import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  flag: boolean = false;
  id: String;
  msg: string;
  userFlag: boolean = true;
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        console.log("in user component data" + data);
      },
      error => {
        this.msg = "you dont have access to view this page";
        this.userFlag = false;
        console.log(error);
      }
    );
  }

  onEditUser(userId: string) {
    this.id = userId;
    this.flag = true;
  }

  onDeleteuser(userId) {
    this.userService.deleteUser(userId).subscribe(
      data => {
        console.log(data);
        this.ngOnInit();
      }
    )

  }

  onUpdateUser(user) {
    this.flag = false;
    this.id = null;
    this.userService.updateUser(user).subscribe(
      data => {
        console.log(data);
      }
    )
  }

}
