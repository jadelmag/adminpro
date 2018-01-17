import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

declare var swal: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor( public _userService: UserService, public router: Router) { }

  ngOnInit() {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl( null, Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      terms: new FormControl( false )
    }, { validators: this.compareFields('password', 'password2') });

    this.form.setValue({
      name: 'Test',
      email: 'test@test.com',
      password: '1234',
      password2: '1234',
      terms: false
    });

  }

  registerUser() {

    if (this.form.invalid) {
      return;
    }

    if (!this.form.value.terms) {
      swal({ title: 'Remember', text: 'You must accept terms!', icon: 'warning'});
      return;
    }

    const user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );


    this._userService.createUser( user ).subscribe( resp => this.router.navigate(['/login']) );

  }

  compareFields( field1: string, field2: string) {

    return ( group: FormGroup) => {

      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;

      if ( pass1 === pass2 ) { return null; }

      return { compareFields: true };
    };

  }

}
