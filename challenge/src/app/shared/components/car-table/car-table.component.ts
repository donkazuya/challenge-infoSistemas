import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataResponse, DeleteCarEvent, EventAction } from '../../../models/interface/DataResponse';
import { CarListEvent } from '../../../models/enums/carList/CarListEvents';

@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrl: './car-table.component.scss'
})
export class CarTableComponent {
  @Input() carList: Array<DataResponse> = []
  @Output() carListEvent = new EventEmitter<EventAction>();
  @Output() deleteCarListEvent = new EventEmitter<DeleteCarEvent>();

  public carSelected!: DataResponse;
  public addCarListEvent = CarListEvent.ADD_CARLIST_EVENT
  public editCarListEvent = CarListEvent.EDIT_CARLIST_EVENT

  handleCarListEvent(action: string, id?: string): void {
    const carListEventData = id && id !== '' ? {action, id}: {action};

    this.carListEvent.emit(carListEventData)
  }


  handleDeleteCar(id: string, carName: string): void {
    this.deleteCarListEvent.emit({id, carName})
  }
}
