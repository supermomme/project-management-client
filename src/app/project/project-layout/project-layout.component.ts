import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeathersService } from '../../feathers/feathers.service';

@Component({
  selector: 'app-project-layout',
  templateUrl: './project-layout.component.html',
  styleUrls: ['./project-layout.component.css']
})
export class ProjectLayoutComponent implements OnInit {

  private project = {};
  private id;
  private sub;
  private _opened: boolean = true;
  private menu = [
    {label: 'Dashboard', icon: 'fa-tachometer', routerLink: './dashboard' },
    {label: 'Kanban', icon: 'fa-tasks', routerLink: './kanban' },
    {label: 'Stats', icon: 'fa-line-chart', routerLink: './stats'}
  ];

  constructor(
    private feathers: FeathersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => this.id = params['projectId']);
    this.feathers.service('project').get(this.id)
    .then(res=>this.project = res)
    .catch(err=>console.error(err))
  }

}
