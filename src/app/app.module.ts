import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FeathersModule } from './feathers/feathers.module';
import { AuthGuardService } from './feathers/auth-guard.service';
import { CoreModule } from "./core/core.module";
import { LayoutComponent } from './core/layout/layout.component';
import { NotFoundPageComponent } from './core/not-found-page/not-found-page.component';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: '/admin', pathMatch: 'full' },
      { path: 'admin', loadChildren: 'app/administration/administration.module#AdministrationModule'},
      { path: 'project', loadChildren: 'app/project/project.module#ProjectModule' },
    ]
  },
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  { path: 'registration', loadChildren: 'app/registration/registration.module#RegistrationModule' },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
    FeathersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
