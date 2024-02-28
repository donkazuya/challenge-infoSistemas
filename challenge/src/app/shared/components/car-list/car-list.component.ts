import { Component, Input } from '@angular/core';
import { DataResponse } from '../../../models/interface/DataResponse';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})

export class CarListComponent {
  @Input() carlist: Array<DataResponse> = []

}
