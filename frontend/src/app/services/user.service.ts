import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from "src/app/model/IUser";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  registerUser(user: IUser): Observable<any> {
    return this.http.post('http://localhost:3000/pms/registeruser', user);
  }

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/pms/getUsers');
  }

  updateUser(user):Observable<any>{
    return this.http.put(`http://localhost:3000/pms/updateUser/${user.id}`,user);
  }

  deleteUser(id):Observable<any>{
    return this.http.delete(`http://localhost:3000/pms/deleteUser/${id}`);
  }


  login(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/pms/login', user)
  }
}