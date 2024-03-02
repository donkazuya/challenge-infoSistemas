import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { DataResponse, DeleteCarEvent, EventAction } from '../../models/interface/DataResponse';
import { CarFormComponent } from '../../shared/components/car-form/car-form.component';
import { CrudService } from '../../shared/services/crud.service';
import { CarListEvent } from '../../models/enums/carList/CarListEvents';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit, OnDestroy  {
  dataVehicles: Array<DataResponse> = []
  private destroy$ = new Subject<void>()
  private ref!: DynamicDialogRef

  constructor(
    private service: CrudService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}
  
  ngOnInit() {
    this.getAllVehicles()
  }

  getAllVehicles() {
    this.service
      .getCarList()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (response) => {
          response.length > 0 ?
            this.dataVehicles = response :
            this.dataVehicles = []
          
        },
      })
  }

  handleCarListAction(event: EventAction) : void {
    if(event) {
      this.addCarList(event)
    }
  }

  addCarList(event?: EventAction) : void {
    const hasEvent = event ? event : {action: CarListEvent.ADD_CARLIST_EVENT}
    this.ref = this.dialogService.open(
        CarFormComponent,
        {
          header: hasEvent?.action,
          width: '70%',
          contentStyle: {
            overflow: 'auto',
            baseZIndex: 10000,
            maximizable: true,
          },
          data: {
            event: hasEvent,
            carListData: this.dataVehicles
          }
        }
      );

      this.ref.onClose
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.getAllVehicles()
        })
  }

  handleDeleteProductAction(event: DeleteCarEvent) : void {
    if(event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do veiculo: ${event?.carName}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteCar(event.id)
      })
    }
  }

  deleteCar(id: string) {
    if(id) {
      this.service.deleteItemCar(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if(response) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Veículo removido com sucesso',
              life: 2500
            });
            this.getAllVehicles()
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao remover produto',
            life: 2500
          }); 
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
