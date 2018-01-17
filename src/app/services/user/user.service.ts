import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';
import { UploadFileService } from '../upload-file/upload-file.service';
import 'rxjs/add/operator/map';

declare var swal: any;

@Injectable()
export class UserService {

  user: User;
  token: string;

  constructor( public http: HttpClient, public router: Router, public _uploadService: UploadFileService ) {
    console.log('Http Service Ready!');
    this.loadStorage();
  }

  isLoged() {
    return ( this.token.length > 5) ? true : false;
  }

  login( user: User, remember: boolean = false ) {

    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICES + '/login';

    return this.http.post( url, user )
      .map( (resp: any) => {
        this.saveStorage( resp.id, resp.token, resp.user );
        return true;
    });
  }

  loginGoogle( token: string ) {
    const url = URL_SERVICES + '/login/google';
    return this.http.post( url, { token: token } )
    .map( (resp: any) => {
      this.saveStorage( resp.id, resp.token, resp.user );
      return true;
    });
  }

  logout() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate( ['/login'] );
  }

  createUser( user: User ) {
    const url = URL_SERVICES + '/user';

    return this.http.post( url, user)
              .map( (resp: any) => {
                swal('User Created', user.email, 'success');
                return resp.user;
              });
  }

  updateUser( user: User ) {
    let url = URL_SERVICES + '/user/' + this.user._id;
    url += '?token=' + this.token;

    return this.http.put( url, user )
      .map( (res: any) => {

        const userDB: User = res.user;

        this.saveStorage( userDB._id, this.token, userDB );

        swal('User Updated', user.name, 'success');
        return true;
      });
  }


  changeImage( file: File, id: string ) {

    this._uploadService.uploadFile( file, 'users', id)
      .then( (res: any) => {
        this.user.img = res.user.img;
        swal( 'Updated image', this.user.name, 'success' );
        this.saveStorage( id, this.token, this.user );
      })
      .catch( err => {
        console.log( err );
        swal( 'Not Updated image', this.user.name, 'error' );
      });
  }











  saveStorage( id: string, token: string, user: User ) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'user', JSON.stringify(user) );

    this.user = user;
    this.token = token;
  }

  loadStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      // localStorage.setItem( 'id', localStorage.getItem('id') );
    } else {
      this.token = '';
      this.user = null;
      // localStorage.removeItem('id');
    }

  }

}
