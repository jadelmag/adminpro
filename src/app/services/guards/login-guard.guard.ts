import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor( public _userService: UserService, public router: Router) { }


  canActivate() {

    if ( this._userService.isLoged() ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
