import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';
import { UploadFileService } from '../upload-file/upload-file.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


declare var swal: any;

@Injectable()
export class UserService {

  user: User;
  token: string;
  menu: any[];

  constructor( public http: HttpClient, public router: Router, public _uploadService: UploadFileService ) {
    this.menu = [];
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
        this.saveStorage( resp.id, resp.token, resp.user, resp.menu );
        return true;
    }).catch( err => {
      swal('Error Authentication', err.error.message, 'error');
      return Observable.throw(err);
    });
  }

  loginGoogle( token: string ) {
    const url = URL_SERVICES + '/login/google';
    return this.http.post( url, { token: token } )
    .map( (resp: any) => {
      this.saveStorage( resp.id, resp.token, resp.user, resp.menu );
      return true;
    }).catch( err => {
      swal('Error Registration', err.error.message, 'error');
      return Observable.throw(err);
    });
  }

  logout() {
    this.user = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');

    this.router.navigate( ['/login'] );
  }

  createUser( user: User ) {
    const url = URL_SERVICES + '/user';

    return this.http.post( url, user)
              .map( (resp: any) => {
                swal('User Created', user.email, 'success');
                return resp.user;
              }).catch( err => {
                swal('Error Registration', err.error.message, 'error');
                return Observable.throw(err);
              });
  }

  updateUser( user: User ) {
    let url = URL_SERVICES + '/user/' + user._id;
    url += '?token=' + this.token;

    return this.http.put( url, user )
      .map( (res: any) => {

      if ( user._id === this.user._id) {
        const userDB: User = res.user;
        this.saveStorage( userDB._id, this.token, userDB, this.menu );
      }

        swal('User Updated', user.name, 'success');
        return true;
      }).catch( err => {
        swal('Error updating user', err.error.message, 'error');
        return Observable.throw(err);
      });
  }


  changeImage( file: File, id: string ) {

    this._uploadService.uploadFile( file, 'users', id)
      .then( (res: any) => {
        this.user.img = res.user.img;
        swal( 'Updated image', this.user.name, 'success' );
        this.saveStorage( id, this.token, this.user, this.menu );
      })
      .catch( err => {
        console.log( err );
        swal( 'Not Updated image', this.user.name, 'error' );
      });
  }

  loadUsers( from: number = 0) {
    const url = URL_SERVICES + '/user?from=' + from;
    return this.http.get(url);
  }

  searchUser( param: string ) {
    const url = URL_SERVICES + '/search/collection/users/' + param;
    return this.http.get(url).map( (res: any) => res.users );
  }

  removeUser( id: string ) {
    let url = URL_SERVICES + '/user/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url).map( resp => {
      swal('User Removed', 'User has been removed successfully', 'success');
      return true;
    });
  }

  saveStorage( id: string, token: string, user: User, menu: any ) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'user', JSON.stringify(user) );
    localStorage.setItem( 'menu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  loadStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));

    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }

  }

}
