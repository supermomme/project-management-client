import { Injectable } from '@angular/core';
import * as feathers from 'feathers/client';
import * as feathersRx from 'feathers-reactive';
import * as io from 'socket.io-client';
import * as hooks from 'feathers-hooks';
import * as socketio from 'feathers-socketio/client';
import * as authentication from 'feathers-authentication-client';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class FeathersService {
  public app: any;
  public socket: any;
  private socketUrl: string = environment.api;

  constructor(
    private toastrService: ToastrService
  ) {
    console.log("Initialize Feathers")
    this.socket = io(this.socketUrl);

    this.app = feathers();
    this.app.configure(hooks());
    this.app.configure(feathersRx(Rx));
    this.app.configure(socketio(this.socket));
    this.app.configure(authentication({
      storage: window.localStorage
    }));

    this.socket.io.on('connect_error', err => {
      this.toastrService.error('Verbindung zum Server verloren\nWiederaufbau...', 'Verbindungsfehler');
    });
    this.socket.io.on('reconnect', (attemptNumber) => {
      this.toastrService.success('Verbindung zum Server wurde wieder hergestellt', 'Verbindung hergestellt');
    });


  }

  service(name: string) {
    return this.app.service(name);
  }

  authenticate(opts?: any) {
    return this.app.authenticate(opts)
    .then(response => this.app.passport.verifyJWT(response.accessToken))
    .then(payload => this.app.service('users').get(payload.userId))
    .then(user => {
      this.app.set('user', user);
      return user;
    })
  }

  set(key: string, val: string) {
    return this.app.set(key, val);
  }

  get(key: string) {
    return this.app.get(key);
  }

  logout() {
    return this.app.logout();
  }

}
