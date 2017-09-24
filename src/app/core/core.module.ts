import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [LayoutComponent, LayoutHeaderComponent, NotFoundPageComponent],
  exports: [LayoutComponent]
})
export class CoreModule { }
