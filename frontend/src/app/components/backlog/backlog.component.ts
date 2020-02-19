import { Component, OnInit } from '@angular/core';
import { BacklogService } from "src/app/services/backlog.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
backlog:any={};
addBacklogFlag:boolean=false;
  constructor(private backlogService: BacklogService,private route:ActivatedRoute ) { }

  ngOnInit() {
  }
onAddBacklog(){
  this.addBacklogFlag=true;
}

onCancel(){
  this.addBacklogFlag=false;
}
  addBacklog(){
   this.addBacklogFlag=false;
      this.backlog.projectId=this.route.snapshot.params.id;
      console.log(this.backlog);
      this.backlogService.addBacklog(this.backlog).subscribe(
        data=>{
          console.log(data);
        }
      )
  }

}
