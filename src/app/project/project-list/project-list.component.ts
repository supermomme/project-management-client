import { Component, OnInit } from '@angular/core';
import { FeathersService } from '../../feathers/feathers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  private projects:any[] = [ ];

  constructor(
    private feathers: FeathersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.feathers.service('project').find()
    .then(res=>res.data)
    .then(projects=>this.projects = projects)
    .catch(err=>console.error(err))
  }

  goToProject(id) {
    this.router.navigate(['project', id])
  }

}
