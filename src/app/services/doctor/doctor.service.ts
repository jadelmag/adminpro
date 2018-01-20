import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Hospital } from '../../models/hospital.model';
import { Doctor } from '../../models/doctor.model';
import { URL_SERVICES } from '../../config/config';
import { UserService } from '../user/user.service';
import 'rxjs/add/operator/map';

declare var swal: any;

@Injectable()
export class DoctorService {

  hospital: Hospital;
  token: string;

  constructor( public http: HttpClient, public _userService: UserService ) {
    this.token = this._userService.token;
  }

  loadDoctors(from: number = 0) {
    const url = URL_SERVICES + '/doctor/?from=' + from;
    return this.http.get( url );
  }

  getDoctor( id: string ) {
    let url = URL_SERVICES + '/doctor/' + id;
    url += '?token=' + this.token;
    return this.http.get( url );
  }

  saveDoctor( doctor: Doctor ) {

    let url = URL_SERVICES + '/doctor';
    if (doctor._id) {
      url += '/' + doctor._id;
      url += '?token=' + this.token;
      return this.http.put( url, doctor ).map( (res: any) => {
        swal('Updated Doctor', 'Doctor updated successfully', 'success');
        return res;
      });
    } else {
      url += '?token=' + this.token;
      return this.http.post( url, doctor ).map( (res: any) => {
        swal('Created Doctor', 'Doctor created successfully', 'success');
        return res;
      });
    }
  }

  removeDoctor( id: string ) {
    let url = URL_SERVICES + '/doctor/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url).map( res => {
      swal('Remove Doctor', 'Doctor removed successfully', 'success');
      return true;
    });
  }

  searchDoctor( param: string ) {
    let url = URL_SERVICES + '/search/collection/doctors/' + param;
    url += '?token=' + this.token;
    return this.http.get(url).map( (res: any) => res.doctors );
  }
}
