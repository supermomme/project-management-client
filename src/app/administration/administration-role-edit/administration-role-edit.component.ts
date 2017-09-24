import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeathersService } from '../../feathers/feathers.service';

@Component({
  selector: 'app-administration-role-edit',
  templateUrl: './administration-role-edit.component.html',
  styleUrls: ['./administration-role-edit.component.css']
})
export class AdministrationRoleEditComponent implements OnInit {

  private id: any;
  private sub: any;
  private role: any = {};
  private newPermission: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private feathers: FeathersService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => this.id = params['id']);
    this.feathers.service('role').get(this.id)
    .then(role=>this.role = role)
    .catch(err=>err.code === 404 ? this.router.navigate(['admin', 'role']) : err)
    .catch(err=>console.error(err))
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.feathers.service('role').patch(this.id, this.role)
    .then(res=>console.log(res))
    .catch(error=>console.error(error))
  }

  addPermission() {
    this.role.permissions.push(`${this.newPermission.service || '*'}.${this.newPermission.method || '*'}.${this.newPermission.id || '*'}`);
    this.newPermission = {}
  }

}
