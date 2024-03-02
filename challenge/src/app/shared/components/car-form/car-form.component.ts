import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { CarListEvent } from '../../../models/enums/carList/CarListEvents';
import { DataResponse, EventAction } from '../../../models/interface/DataResponse';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.scss'
})

export class CarFormComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();
  public carListAction!: {
    event: EventAction,
    carListData: Array<DataResponse>
  }

  public addCarListAction = CarListEvent.ADD_CARLIST_EVENT
  public editCarListAction = CarListEvent.EDIT_CARLIST_EVENT
  public carSelectedData!: DataResponse


  public addCarForm = this.fb.group({
    placa: ['', Validators.required],
    chassi: ['', Validators.required],
    renavam: ['', Validators.required],
    modelo: ['', Validators.required],
    marca: ['', Validators.required],
    ano: ['', Validators.required]
  })

  public editCarForm = this.fb.group({
    placa: ['', Validators.required],
    chassi: ['', Validators.required],
    renavam: ['', Validators.required],
    modelo: ['', Validators.required],
    marca: ['', Validators.required],
    ano: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef

  ) {}

  ngOnInit(): void {
    this.carListAction = this.config.data
    
    if(this.carListAction.event.action === this.editCarListAction && this.carListAction?.carListData) {
      this.getCaristSelectedData(this.carListAction.event.id as string)
    }
  }

  handleSubmitAddCarList() : void {
    if(this.addCarForm.value && this.addCarForm.valid) {
      const requestCreate = {
        placa: this.addCarForm.value.placa?.toUpperCase() as string,
        chassi: this.addCarForm.value.chassi?.toUpperCase() as string,
        renavam: Number(this.addCarForm.value.renavam),
        modelo: this.addCarForm.value.modelo as string,
        marca: this.addCarForm.value.marca as string,
        ano: Number(this.addCarForm.value.ano)
      }

      this.service
        .createItemCarList(requestCreate)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if(response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Cadastro de veículo criado com sucesso!',
                life: 2500
              })
            }

            this.ref.close()
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar cadastro de veículo!',
              life: 2500
            })
          }
        })
    }

    this.addCarForm.reset()
  }

  handleSubmitEditCarList() : void {
    if(
      this.editCarForm.value &&
      this.editCarForm.valid &&
      this.carListAction.event.id
    ) {
      const requestEdit = {
        id: this.carListAction.event.id,
        placa: this.editCarForm.value.placa?.toUpperCase() as string,
        chassi: this.editCarForm.value.chassi?.toUpperCase() as string,
        renavam: Number(this.editCarForm.value.renavam),
        modelo: this.editCarForm.value.modelo as string,
        marca: this.editCarForm.value.marca as string,
        ano: Number(this.editCarForm.value.ano)
      }

      this.service.editItemCarList(requestEdit)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Cadastro editado com sucesso!',
              life: 2500
            });

            this.editCarForm.reset();

            this.ref.close()
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao editar cadastro!',
              life: 2500
            });

            this.editCarForm.reset();
          }
        })
    }
  }

  getCaristSelectedData(id: string) : void{
    const allCarList = this.carListAction?.carListData

    if(allCarList.length > 0){
      const carFiltered = allCarList.filter((element) => element.id === id)

      if(carFiltered){
        this.carSelectedData = carFiltered[0];

        this.editCarForm.setValue({
          placa: this.carSelectedData?.placa,
          chassi: this.carSelectedData?.chassi,
          renavam: this.carSelectedData?.renavam.toString(),
          modelo: this.carSelectedData?.modelo,
          marca: this.carSelectedData?.marca,
          ano: this.carSelectedData?.ano.toString()
        })
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
