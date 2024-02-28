import { Component, OnInit } from '@angular/core';
import { DataResponse } from '../../models/interface/DataResponse';
import { dataVehicle } from '../../models/data/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit  {
  dataVehicles: Array<DataResponse> = dataVehicle
  
  ngOnInit() {
    console.log(this.dataVehicles);
  }
}
