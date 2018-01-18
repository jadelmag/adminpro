import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[];
  from: number;
  total: number;

  loading: boolean;

  constructor( public _userService: UserService, public _modalUploadService: ModalUploadService) {
    this.users = [];
    this.from = 0;
    this.total = 0;
    this.loading = true;
  }

  ngOnInit() {
    this.loadUsers();
    this._modalUploadService.notification
      .subscribe( res => {
        this.loadUsers();
    });
  }

  loadUsers() {
    this.loading = true;
    this._userService.loadUsers( this.from ).subscribe( (res: any) => {
      this.total = res.total;
      this.users = res.users;
      this.loading = false;
    });
  }

  loadMoreUsers( value: number ) {
    const from = this.from + value;
    if ((from >= this.total) || (from < 0)) { return; }

    this.from += value;
    this.loadUsers();
    console.log('paginación: ', this.from);
    console.log('total: ', this.total);
  }

  searchUser( param: string ) {

    if (param.length <= 0) {
      this.loadUsers();
      return;
    }

    this.loading = true;

    this._userService.searchUser( param ).subscribe( (users: User[] ) => {
      this.users = users;
      this.loading = false;
    });
  }

  saveUser( user: User ) {
    this._userService.updateUser( user ).subscribe();
  }

  removeUser( user: User ) {
    if (user._id === this._userService.user._id) {
      swal('Error', 'You cant remove yourself', 'error');
      return;
    }

    swal({
      title: 'Are you sure?',
      text: 'If you remove the user, all his info will be deleted.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {

      if (willDelete) {
        this._userService.removeUser( user._id ).subscribe( (deleted: boolean) => {
          if (this.from === (this.total - 1)) {
            this.from = this.from - 5;
          }
          this.loadUsers();
        });
      }
    });
  }

  showModal( id: string) {
    this._modalUploadService.showModal( 'users', id);
  }

}
