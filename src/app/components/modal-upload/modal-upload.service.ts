import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class ModalUploadService {

  public type: string;
  public id: string;

  public hide: string;

  public notification = new EventEmitter<any>();

  constructor() {
    this.hide = 'hide';
  }

  hideModal() {
    this.hide = 'hide';
    this.type = null;
    this.id = null;
  }

  showModal( type: string, id: string ) {
    this.hide = '';
    this.id = id;
    this.type = type;
  }


}
