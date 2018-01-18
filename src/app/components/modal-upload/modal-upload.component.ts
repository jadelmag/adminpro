import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  uploadFile: File;
  imageTemp: string;

  constructor( public _uploadFileService: UploadFileService, public _modalUploadService: ModalUploadService ) { }

  ngOnInit() {
  }

  selectImage( file: File ) {

    if (!file) {
      this.uploadFile = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Error', 'Selected File is not an image', 'error');
      this.uploadFile = null;
      return;
    }

    this.uploadFile = file;

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL( file );

    reader.onloadend = () => this.imageTemp  = reader.result;
  }

  uploadImage() {
    this._uploadFileService.uploadFile( this.uploadFile, this._modalUploadService.type, this._modalUploadService.id )
      .then( res => {
        this._modalUploadService.notification.emit( res );
        this.closeModal();
      })
      .catch( err => {
        console.log('Error uploading...');
      });
  }

  closeModal() {
    this.uploadFile = null;
    this.imageTemp = null;
    this._modalUploadService.hideModal();
  }

}
