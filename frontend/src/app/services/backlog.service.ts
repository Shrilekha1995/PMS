import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {

  constructor(private http:HttpClient) { }

   addBacklog(backlog:any):Observable<any>{
    return this.http.post('http://localhost:3000/pms/addBacklog',backlog);
   }

   getBacklogsByProjectId(projectId:any):Observable<any>{
    
     return this.http.get(`http://localhost:3000/pms/getBacklogsByProjectId/${projectId}`);
   }
}
