import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  isLoggedIn() {
    const user = sessionStorage.getItem('loginName');
    console.log("in is login "+user)
    return !(user === null);

  }

  loggedOut() {
    console.log("loggedout")
    sessionStorage.removeItem('loginName');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    
  }
}
