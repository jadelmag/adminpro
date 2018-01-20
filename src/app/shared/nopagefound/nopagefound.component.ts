import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css']
})
export class NopagefoundComponent implements OnInit {

  year: number;

  constructor( public _userService: UserService, public router: Router) {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
    init_plugins();
  }

  redirectWithToken() {
    if (this._userService.isLoged()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
