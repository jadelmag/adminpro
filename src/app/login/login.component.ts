import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  remember: boolean;

  auth2: any;

  constructor( public router: Router, public userService: UserService) {
    this.remember = false;
  }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1) { this.remember = true; }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1044682120283-vcsp2jtbp8ann1ba9p63jks4vbciv5vk.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });
  }

  // tslint:disable-next-line:no-shadowed-variable
  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {
        // const profile = googleUser.getBasicProfile();
        // console.log(profile);
        const token = googleUser.getAuthResponse().id_token;

        this.userService.loginGoogle( token )
            .subscribe( resp => this.router.navigate(['/dashboard']) );
    });
  }

  login( form: NgForm ) {

    if (form.invalid) { return; }

    const user = new User(null, form.value.email, form.value.password);

    this.userService.login( user, form.value.remember )
        .subscribe( (resp) => {
          this.router.navigate(['/dashboard']);
        });
  }

}
