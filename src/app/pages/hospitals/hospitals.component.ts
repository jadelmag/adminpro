import { Component, OnInit } from '@angular/core';

import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[];
  from: number;
  total: number;

  loading: boolean;

  constructor( public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService ) {
    this.hospitals = [];
    this.from = 0;
    this.total = 0;
    this.loading = true;
  }

  ngOnInit() {
    this.loadHospitals();
    this._modalUploadService.notification
      .subscribe( () => {
        this.loadHospitals();
    });
  }

  loadHospitals(from: number = 0) {
    this.loading = true;
    this._hospitalService.loadHospitals(from).subscribe( (res: any) => {
      this.hospitals = res.hospitals;
      this.total = res.total;
      this.loading = false;
    });
  }

  getHospital( id: string ) {
    this._hospitalService.getHospital( id ).subscribe( (res: any) => {
      this.hospitals = res.hospital;
      this.loading = false;
    });
  }

  createHospital() {

    swal({
      title: 'Create Hospital',
      text: 'Insert Hospital Name',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (hospitalName: string) => {
      if (!hospitalName || hospitalName.length === 0) { return; }
      this._hospitalService.createHospital( hospitalName ).subscribe( res => {
        this.loadHospitals(this.from);
      });
    });
  }

  removeHospital( id: string ) {
    this._hospitalService.removeHospital( id ).subscribe( () => {
      if (this.from === (this.total - 1)) {
        this.from = this.from - 5;
      }
      this.loadHospitals(this.from);
    });
  }

  searchHospital( param: string ) {
    if (param.length <= 0) {
      this.loadHospitals();
      return;
    }
    this.loading = true;

    this._hospitalService.searchHospital( param ).subscribe( (hospital: any) => {
      this.hospitals = hospital;
      this.loading = false;
    });
  }

  showModal( id: string ) {
    this._modalUploadService.showModal( 'hospitals', id);
  }

  saveHospital( hospital: Hospital ) {
    this._hospitalService.updateHospital( hospital ).subscribe( () => {
      this.loadHospitals(this.from);
    });
  }

  loadMoreHospitals( value: number ) {
    const from = this.from + value;
    if ((from >= this.total) || (from < 0)) { return; }
    this.from += value;
    this.loadHospitals(this.from);
  }
}
