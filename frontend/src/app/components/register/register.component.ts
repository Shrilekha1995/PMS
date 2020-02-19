import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  disabled = false;
  user: any = {};
  msg: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      loginName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      status: ['', Validators.required],

    });
  }


  get f() { return this.registerForm.controls; }

  onCancel() {
    this.router.navigate[('login')];
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.userService.registerUser(this.registerForm.value).subscribe(
      data => {
        if (data.keyValue) {
          if (data.keyValue.id) {
            this.msg = "Duplicate id :" + data.keyValue.id;
          }
          if (data.keyValue.email) {
            this.msg = "Duplicate email :" + data.keyValue.email;
          }
          if (data.keyValue.loginName) {
            this.msg = "Duplicate loginName :" + data.keyValue.loginName;
          }
        }
        else {
          this.router.navigate(['login']);

        }



      },
      err => {
        this.msg = err.errmsg;
        console.log("****" + this.msg)

      }
    );

  }


}