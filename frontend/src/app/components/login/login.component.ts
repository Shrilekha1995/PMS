import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user:any={};
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.userService.login(this.user).subscribe(
      data=>{
        
        console.log(data.role);
        sessionStorage.setItem('token', 'Bearer ' + data.token);
        sessionStorage.setItem('role',data.role);
        sessionStorage.setItem('loginName',data.loginName);
        sessionStorage.setItem('id',data.id);
         this.router.navigate(['project']);

         
        

      }
    )
  }

}
