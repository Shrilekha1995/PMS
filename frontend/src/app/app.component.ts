import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {

  title = 'pmsFrontend';
  flag: boolean=false;
  roleFlag: boolean=false;
  msg:string="You dont have access to vies this page";


  ngOnInit(): void {
    if(sessionStorage.getItem('role')=='manager'){
      this.roleFlag=true;
    }
    
  }

}
