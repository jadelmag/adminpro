import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class VerifyTokenGuard implements CanActivate {

  constructor( public _userService: UserService, public router: Router ) {}

  canActivate(): Promise<boolean> | boolean {

    const token = this._userService.token;
    const payload = JSON.parse( atob(token.split('.')[1]) );

    const expiration = this.expiration( payload.exp );

    if (expiration) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verifyRenew( payload.exp );
  }

  expiration( expDate: number ): boolean {
    const now = new Date().getTime() / 1000;
    if ( expDate < now ) {
      return true;
    } else {
      return false;
    }
  }

  verifyRenew( expDate: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const token = new Date( expDate * 1000 );
      const now = new Date();

      now.setTime( now.getTime() + ( 1 * 60 * 60 * 1000 ) );

      if ( token.getTime() > now.getTime() ) {
        resolve(true);
      } else {
        this._userService.renewToken().subscribe( () => {
          resolve(true);
        }, () => {
          this.router.navigate(['/login']);
          reject(false);
        });
      }
    });
  }


}
