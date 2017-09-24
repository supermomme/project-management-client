import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FeathersService } from './feathers.service';

@Injectable()
export class AuthGuardService {

  constructor(
    private feathersService: FeathersService,
    private router: Router
  ) { }

  canActivate() {
    return this.feathersService.authenticate()
    .then((user) => true)
    .catch(() => {
      this.router.navigate(['login']);
      return false;
    })
  }

  logout() {
    return this.feathersService.logout()
  }

  authenticate(opts?: any) {
    return this.feathersService.authenticate(opts);
  }

}
