import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor( public _userService: UserService ) { }

  canActivate() {

    if ( this._userService.user.role === 'ADMIN_ROLE' ) {
      return true;
    } else {
      console.log('Blocked by Admin Guard');
      this._userService.logout();
      return false;
    }
  }
}
