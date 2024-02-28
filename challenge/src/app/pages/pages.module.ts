import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesRoutes } from './pages.routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BsModalRef } from 'ngx-bootstrap/modal';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PagesRoutes)
  ],
  providers: [
    BsModalRef
  ]
})
export class PagesModule { }
