import { Component, OnInit } from '@angular/core';
import { DataResponse } from '../../models/interface/DataResponse';
import { Subject, takeUntil } from 'rxjs';
import { CrudService } from '../../shared/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit  {
  dataVehicles: Array<DataResponse> = []
  private destroy$ = new Subject<void>()

  constructor(private service: CrudService) {}
  
  ngOnInit() {
    console.log(this.dataVehicles);
    this.getAllVehicles()
  }

  getAllVehicles() {
    this.service
      .getCarList()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (response) => {
          if(response.length > 0) {
            this.dataVehicles = response
            console.log(response);
          }
        },
        error: (error) => {
          console.log(error);
          
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
