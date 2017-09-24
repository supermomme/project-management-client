import { Component, OnInit } from '@angular/core';
import { FeathersService } from '../../feathers/feathers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administration-user-list',
  templateUrl: './administration-user-list.component.html',
  styleUrls: ['./administration-user-list.component.css']
})
export class AdministrationUserListComponent implements OnInit {
  private users:any[] = [ ];

  constructor(
    private feathers: FeathersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.feathers.service('users').find()
    .then(res=>res.data)
    .then(users=>this.users = users)
    .catch(err=>console.error(err))
  }

  goToUser(id) {
    this.router.navigate(['admin', 'user', id])
  }

}
