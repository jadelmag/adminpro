import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;

  uploadFile: File;
  imageTemp: string;

  constructor( public _userService: UserService ) {
    this.user = this._userService.user;
  }

  ngOnInit() {
  }

  save( user: User) {

    this.user.name = user.name;

    if (!this.user.google) {
      this.user.email = user.email;
    }
    this._userService.updateUser( this.user ).subscribe();
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

  changeImage() {
    this._userService.changeImage( this.uploadFile, this.user._id );
  }

}
