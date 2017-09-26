import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration-layout',
  templateUrl: './administration-layout.component.html',
  styleUrls: ['./administration-layout.component.css']
})
export class AdministrationLayoutComponent implements OnInit {

  private menu: any;

  constructor() { }

  ngOnInit() {
    this.menu = [
      {label: 'Users', icon: 'fa-vcard', routerLink: '/admin/user' },
      {label: 'Roles', icon: 'fa-list', routerLink: '/admin/role' },
      {label: 'Kanban', icon: 'fa-list', routerLink: '/admin/kanban', disabled: true },
      {label: 'Kanban-Status', icon: 'fa-list', routerLink: '/admin/kanban-status', disabled: true },
      {label: 'Kanban-Task', icon: 'fa-list', routerLink: '/admin/kanban-task', disabled: true },
    ];
  }

}
