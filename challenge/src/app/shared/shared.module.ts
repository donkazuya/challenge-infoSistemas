import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { CarTableComponent } from './components/car-table/car-table.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask'
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CarFormComponent } from './components/car-form/car-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    CarTableComponent,
    CarFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //PrimeNG
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  exports: [
    HeaderComponent,
    CarTableComponent
  ],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService
  ]
})
export class SharedModule { }
