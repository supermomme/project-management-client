import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../feathers/auth-guard.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FeathersService } from '../../feathers/feathers.service';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.css']
})
export class LayoutHeaderComponent implements OnInit {

  private menu = [
    { label: 'Admin', routerLink: '/admin' },
    { label: 'Project', routerLink: '/project' },
  ];

  constructor(
    private authGuard: AuthGuardService,
    private router: Router,
    private toastrService: ToastrService,
    private feathers: FeathersService,
  ) { }

  ngOnInit() { }

  searchInArray(value, key, array) {
    for (var i=0; i < array.length; i++) {
      if (array[i][key] === value) {
        return i;
      }
    }
  }

  logout() {
    console.log("LOGOUT")
    this.authGuard.logout()
    .then(()=>this.toastrService.success('','Erfolgreich ausgelogt!'))
    .then(()=>this.router.navigate(['login']))
    .catch(err=>this.toastrService.warning('Bitte wenden sie sich an einen Administrator', 'Es ist uns ein Fehler beim Ausloggen unterlaufen', { timeOut: 10000, positionClass: 'toast-bottom-right', progressBar:true}))
  }

}
