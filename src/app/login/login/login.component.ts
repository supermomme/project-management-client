import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../feathers/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email: String = "";
  private password: String = "";

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private authGuard: AuthGuardService
  ) { }

  ngOnInit() {
    this.authGuard.authenticate()
    .then(user=>this.router.navigate(['admin']))
    .catch(err=>{})
  }

  login() {
    this.authGuard.authenticate({
      strategy:'local',
      email:this.email,
      password:this.password
    })
    .then(user=>{
      console.log(user)
      this.toastrService.success(`Guten Tag ${user.firstname}`, 'Eingeloggt');
      this.router.navigate(['admin'])
    })
    .catch(res=>{
      if (res.code === 400 ||res.code === 401) {
        this.toastrService.error('', 'Login ist falsch!');
      } else {
        this.toastrService.error('Bitte wenden sie sich an einen Administrator', 'Es ist uns ein Fehler unterlaufen');
      }
    })
  }

}
