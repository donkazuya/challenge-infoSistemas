import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CardComponent } from './components/card/card.component';
import { DetailsModalComponent } from './components/details-modal/details-modal.component';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    HeaderComponent,
    CarListComponent,
    CardComponent,
    DetailsModalComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [
    HeaderComponent,
    CarListComponent
  ],
  providers: [
    BsModalRef
  ]
})
export class SharedModule { }
