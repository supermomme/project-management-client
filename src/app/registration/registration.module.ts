import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', component: RegistrationComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [RegistrationComponent],
  providers:[]
})
export class RegistrationModule { }
