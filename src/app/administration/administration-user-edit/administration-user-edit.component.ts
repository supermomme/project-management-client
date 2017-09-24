import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeathersService } from '../../feathers/feathers.service';

@Component({
  selector: 'app-administration-user-edit',
  templateUrl: './administration-user-edit.component.html',
  styleUrls: ['./administration-user-edit.component.css']
})
export class AdministrationUserEditComponent implements OnInit, OnDestroy {
  private id: any;
  private sub: any;
  private user: any = {};
  private roles: any[] = [];
  private picture: any = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private feathers: FeathersService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => this.id = params['id']);
    this.feathers.service('users').get(this.id)
    .then(user=>this.user = user)
    .then(user=>this.picture = user.picture.uri || '')
    .catch(err=>err.code === 404 ? this.router.navigate(['admin', 'user']) : err)
    .catch(err=>console.error(err))

    this.feathers.service('role').find()
    .then(res=>res.data)
    .then(roles=>this.roles = roles)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.user = this.user._include.reduce((prev, cur)=>{
      prev[cur] = prev[cur]._id || prev[cur];
      return prev
    }, this.user)

    this.feathers.service('users').patch(this.id, this.user)
    .then(res=>console.log(res))
    .catch(error=>console.error(error))
  }

  changePicture() {
    console.log("TODO: add changePicture()")
  }

}
