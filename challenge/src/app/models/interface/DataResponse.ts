export interface DataResponse {
  id: string;
  placa: string;
  chassi: string;
  renavam: number;
  modelo: string;
  marca: string;
  ano: number;
}

export interface DataRequest{
  id?: string
  placa: string;
  chassi: string;
  renavam: number;
  modelo: string;
  marca: string;
  ano: number;
}

export interface EventAction {
  action: string;
  id?: string;
}

export interface DeleteCarEvent{
  id: string;
  carName: string;
}