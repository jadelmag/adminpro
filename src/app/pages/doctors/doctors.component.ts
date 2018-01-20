import { Component, OnInit } from '@angular/core';

import { DoctorService } from '../../services/doctor/doctor.service';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';

declare var swal: any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[];
  from: number;
  total: number;

  loading: boolean;

  constructor( public _doctorService: DoctorService ) {
    this.doctors = [];
    this.from = 0;
    this.total = 0;
    this.loading = true;
  }

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors(from: number = 0) {
    this.loading = true;
    this._doctorService.loadDoctors(from).subscribe( (res: any) => {
      this.doctors = res.doctors;
      this.total = res.total;
      this.loading = false;
    });
  }

  getDoctor( id: string ) {
    this._doctorService.getDoctor( id ).subscribe( (doctor: Doctor) => {
      console.log(doctor);
    });
  }

  createDoctor( name: string, hospital: Hospital ) {

  }

  updateDoctor( id: string, hospital: Hospital ) {

  }

  removeDoctor( doctor: Doctor ) {
    this._doctorService.removeDoctor( doctor._id ).subscribe( (res) => {
      if (this.from === (this.total - 1)) {
        this.from = this.from - 5;
      }
      this.loadDoctors(this.from);
    });
  }

  searchDoctor( param: string ) {
    if (param.length <= 0) {
      this.loadDoctors();
      return;
    }

    this.loading = true;

    this._doctorService.searchDoctor( param ).subscribe( (doctors: Doctor[]) => {
      this.doctors = doctors;
      this.loading = false;
    });
  }

  loadMoreDoctors( value: number ) {
    const from = this.from + value;
    if ((from >= this.total) || (from < 0)) { return; }
    this.from += value;
    this.loadDoctors(this.from);
  }

}
