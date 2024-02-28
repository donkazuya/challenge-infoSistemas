import { Component, Input, OnInit } from '@angular/core';
import { DataResponse } from '../../../models/interface/DataResponse';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrl: './details-modal.component.scss'
})
export class DetailsModalComponent {
  @Input() itemDetails: DataResponse = {
    id: 0,
    placa: '',
    chassi: '',
    renavam: 0,
    modelo: '',
    marca: '',
    ano: 0,
  }




}
