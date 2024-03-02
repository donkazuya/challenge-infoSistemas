import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DataRequest, DataResponse } from '../../models/interface/DataResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CrudService {
  private API_URL = environment.API_URL

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(
    private http: HttpClient,

  ) { }
  
  getCarList() : Observable<Array<DataResponse>> {
    return this.http.get<Array<DataResponse>>(
      `${this.API_URL}/carList`,
      this.httpOptions
    )
  }

  createItemCarList(data:DataRequest) : Observable<DataResponse> {
    return this.http.post<DataResponse>(
      `${this.API_URL}/addCar`,
      data,
      this.httpOptions
    )
  }

  editItemCarList(data:DataRequest) : Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/editCar/${data.id}`,
      data,
      this.httpOptions
    )
  }

  deleteItemCar(data: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.API_URL}/deleteCar/${data}`,
      this.httpOptions
    )
  }


}