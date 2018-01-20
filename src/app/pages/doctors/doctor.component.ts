import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  hospitals: Hospital[];
  hospital: Hospital;
  doctor: Doctor;

  constructor(
    public _doctorService: DoctorService,
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService,
    public router: Router,
    public activatedRoute: ActivatedRoute ) {
    this.hospitals = [];
    this.hospital = new Hospital('');
    this.doctor = new Doctor('', '', '', '', '');
    this.activatedRoute.params.subscribe( params => {
      const id = params['id'];
      if (id !== 'new') {
        this.getDoctor( id );
      }
    });
  }

  ngOnInit() {
    this.loadHospitals();
    this._modalUploadService.notification.subscribe( (res: any) => {
      this.doctor.img = res.doctor.img;
    });
  }

  loadHospitals() {
    this._hospitalService.loadHospitals().subscribe( (res: any) => {
      this.hospitals = res.hospitals;
    });
  }

  saveDoctor( f: NgForm) {
    if (f.invalid) { return; }

    this._doctorService.saveDoctor( this.doctor ).subscribe( (res: any) => {
      this.doctor._id = res.doctor._id;
      this.router.navigate(['/doctor', res.doctor._id]);
    });
  }

  changeHospital( id: string ) {
    this._hospitalService.getHospital( id ).subscribe( (res: any) => {
      this.hospital = res.hospital;
    });
  }

  getDoctor( id: string ) {
    this._doctorService.getDoctor( id ).subscribe( (res: any) => {
      this.doctor = res.doctor;
      this.doctor.hospital = res.doctor.hospital._id;
      this.changeHospital( this.doctor.hospital );
    });
  }

  changePhoto() {
    this._modalUploadService.showModal( 'doctors', this.doctor._id );
  }

}
