// import { Injectable } from '@angular/core';
// import { DetailsModalComponent } from '../components/details-modal/details-modal.component';
// import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
// import { DataResponse } from '../../models/interface/DataResponse';

// @Injectable({
//   providedIn: 'root'
// })
// export class DialogService {

//   bsModalRef!: BsModalRef
//   defaultOptions!: ModalOptions

//   constructor(public modalService: BsModalService) { }

//   details(object: DataResponse) {
//     this.defaultOptions = {
//       backdrop: 'static',
//       keyboard: false,
//       class: 'modal-dialog-centered modal-md'
//     }

//     this.bsModalRef = this.modalService.show(
//       DetailsModalComponent,
//       this.defaultOptions
//     )

//     this.bsModalRef.content.itemDetails = object
//     return (this.bsModalRef.content as DetailsModalComponent).confirmResult
//   }
// }
