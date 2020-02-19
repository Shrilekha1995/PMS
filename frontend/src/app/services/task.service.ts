import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient ) { }

  addTask(task:any):Observable<any>
  {

    return this.http.post(`http://localhost:3000/pms/addTask`,task);
  }

  getTasksByBacklogId(backlogId:any):Observable<any>
  {
    return this.http.get(`http://localhost:3000/pms/getTasksByBacklogId/${backlogId}`);
  }

  updateTask(task:any):Observable<any>{
    return this.http.put(`http://localhost:3000/pms/updateTask/${task.taskId}`,task);
  }

  deleteTask(taskId:any):Observable<any>{
    return this.http.delete(`http://localhost:3000/pms/deleteTask/${taskId}`);
  }

  assignTaskByDeveloperId(taskId,developerId){
    return this.http.put(`http://localhost:3000/pms/assignTaskByDeveloperId/${taskId}`,{"developerId":developerId})
  }
  
}
