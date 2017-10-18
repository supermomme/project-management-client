import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { ActivationComponent } from './activation/activation.component';

const routes: Routes = [
  { path: ':id', component: ActivationComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ActivationComponent]
})
export class ActivationModule { }
