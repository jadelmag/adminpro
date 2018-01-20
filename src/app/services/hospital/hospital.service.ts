import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Hospital } from '../../models/hospital.model';
import { URL_SERVICES } from '../../config/config';
import { UserService } from '../user/user.service';
import 'rxjs/add/operator/map';

declare var swal: any;

@Injectable()
export class HospitalService {

  hospital: Hospital;
  token: string;

  constructor(
    public http: HttpClient,
    public _userService: UserService ) {
      this.token = this._userService.token;
      this.loadHospitals();
  }

  loadHospitals(from: number = 0) {
    const url = URL_SERVICES + '/hospital/?from=' + from;
    return this.http.get( url );
  }

  getHospital( id: string ) {
    const url = URL_SERVICES + '/hospital/' + id;
    return this.http.get( url );
  }

  createHospital( name: string ) {
    let url = URL_SERVICES + '/hospital';
    url += '?token=' + this.token;
    return this.http.post( url, { name: name }).map( res => {
      swal('Create Hospital', 'Hospital created successfully', 'success');
      return true;
    });
  }

  updateHospital( hospital: Hospital ) {
    let url = URL_SERVICES + '/hospital/' + hospital._id;
    url += '?token=' + this.token;
    return this.http.put( url, hospital).map( res => {
      swal('Hospital Updated', hospital.name, 'success');
      return true;
    });
  }

  removeHospital( id: string ) {
    let url = URL_SERVICES + '/hospital/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url).map( res => {
      swal('Remove Hospital', 'Hospitl removed successfully', 'success');
      return true;
    });
  }

  searchHospital( param: string ) {
    let url = URL_SERVICES + '/search/collection/hospitals/' + param;
    url += '?token=' + this.token;
    return this.http.get(url).map( (res: any) => res.hospitals );
  }

}
