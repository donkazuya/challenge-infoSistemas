import { Component, Input, TemplateRef } from '@angular/core';
import { DataResponse } from '../../../models/interface/DataResponse';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() cardItem: DataResponse = {
    id: 0,
    placa: '',
    chassi: '',
    renavam: 0,
    modelo: '',
    marca: '',
    ano: 0,
  }

  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}
 
  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-centered modal-lg'});
  }

  close() {
    this.modalRef?.hide();
  }
}
