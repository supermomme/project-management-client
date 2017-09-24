import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { NgbModule, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { SidebarModule } from 'ng-sidebar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right', progressBar:true}),
    NgbModule.forRoot(),
    RouterModule,
    Ng2DragDropModule.forRoot(),
    SidebarModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ToastrModule,
    RouterModule,
    Ng2DragDropModule,
    SidebarModule
  ],
  declarations: []
})
export class SharedModule { }
