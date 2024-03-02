import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesRoutes } from './pages.routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { HttpClientModule } from '@angular/common/http';

import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';






@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forChild(PagesRoutes),
    //PrimeNG
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService
  ]
})
export class PagesModule { }
