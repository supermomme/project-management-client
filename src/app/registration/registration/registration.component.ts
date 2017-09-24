import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FeathersService } from '../../feathers/feathers.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private user:any = {};
  private usernameSuggestion:String;

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private feathers: FeathersService
  ) { }

  ngOnInit() {
  }

  signup() {
    if (this.user.firstname && this.user.lastname && this.user.username && this.user.email && this.user.password && this.user.confirmedPassword) {
      if (this.user.password == this.user.confirmedPassword) {
        this.feathers.service('users')
        .create({firstname:this.user.firstname,lastname:this.user.lastname,username:this.user.username,email:this.user.email,password:this.user.password})
        .then((res)=>{
          this.toastrService.success('Checke nun deine Emails', 'Erfolgreich Registriert');
          this.router.navigate(['dashboard'])
        })
        .catch((err)=>{
          console.log(err)
          this.toastrService.error('Bitte kontaktieren sie ein Administrator', 'Es ist uns ein Fehler unterlaufen. :(');
        })
      } else {
        this.toastrService.error('', 'Passwörter stimmen nicht überein.');
      }
    } else {
      this.toastrService.error('', 'Bitte füllen sie alle Felder aus.');
    }
  }

  usernameSuggestionUpdate() {
    if (this.user.firstname != undefined && this.user.lastname != undefined) {
      this.usernameSuggestion = `Vorschlag: ${this.deUmlaut(this.user.firstname.toLowerCase())}.${this.deUmlaut(this.user.lastname.toLowerCase())}`
    }
  }

  deUmlaut(value){
    value = value.toLowerCase();
    value = value.replace(/ä/g, 'ae');
    value = value.replace(/ö/g, 'oe');
    value = value.replace(/ü/g, 'ue');
    value = value.replace(/ß/g, 'ss');
    value = value.replace(/ /g, '-');
    value = value.replace(/\./g, '');
    value = value.replace(/,/g, '');
    value = value.replace(/\(/g, '');
    value = value.replace(/\)/g, '');
    return value;
  }

  back() {
    this.router.navigate(['login'])
  }

}
