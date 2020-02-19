import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProject } from "src/app/model/IProject";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  searchProjectByID(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/pms/getProjects/${id}`);
  }

  getProjects(): Observable<any> {
    return this.http.get('http://localhost:3000/pms/getProjects');
  }

  updateProject(project: IProject): Observable<any> {
    var httpheaders = httpheaders.get();

    return this.http.put(`http://localhost:3000/pms/updateProject/${project.id}`, project);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/pms/deleteProject/${id}`);
  }

  addProject(project: IProject): Observable<any> {
    return this.http.post(`http://localhost:3000/pms/addProject`, project)
  }

}
