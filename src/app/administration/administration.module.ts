import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationLayoutComponent } from './administration-layout/administration-layout.component';
import { AdministrationUserListComponent } from './administration-user-list/administration-user-list.component';
import { AdministrationUserEditComponent } from './administration-user-edit/administration-user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationLayoutComponent,
    children: [
      { path: 'user', component: AdministrationUserListComponent },
      { path: 'user/:id', component: AdministrationUserEditComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    AdministrationLayoutComponent,
    AdministrationUserListComponent,
    AdministrationUserEditComponent,
  ]
})
export class AdministrationModule { }
