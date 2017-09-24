import { NgModule } from '@angular/core';

import { AuthGuardService } from './auth-guard.service';
import { FeathersService } from './feathers.service';

@NgModule({
  imports: [

  ],
  declarations: [],
  providers: [
    AuthGuardService,
    FeathersService
  ]
})
export class FeathersModule { }
