import { Component, OnInit } from '@angular/core';
import { FeathersService } from '../../feathers/feathers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {
  private user:any = { };
  private id: any;
  private sub: any;
  private activated: Boolean = null;

  constructor(
    private feathers: FeathersService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => this.id = params['id']);
    this.feathers.service('activate-user').create({ _id: this.id })
    .then(user=>this.user = user.user)
    .then(()=>this.activated = true)
    .catch(err=>{
      console.error(err);
      this.activated = false;
    })
  }

  goToLogin() {
    this.router.navigate(['login'])
  }

  goToRegistration() {
    this.router.navigate(['registration'])
  }

}
