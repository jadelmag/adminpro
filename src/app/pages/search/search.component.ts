import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { User } from '../../models/user.model';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: User[];
  doctors: Doctor[];
  hospitals: Hospital[];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public router: Router
  ) {
    this.activatedRoute.params.subscribe( params => {
      const param = params['param'];
      this.searchAll( param );
    });
  }

  ngOnInit() {
  }

  searchAll( param: string) {
    const url = URL_SERVICES + '/search/all/' + param;
    this.http.get( url ).subscribe( (res: any) => {
      this.users = res.users;
      this.doctors = res.doctors;
      this.hospitals = res.hospitals;
    });
  }

}
