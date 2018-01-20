import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  LoginGuardGuard,
  AdminGuard,
  UploadFileService,
  HospitalService,
  DoctorService } from './service.index';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    LoginGuardGuard,
    AdminGuard,
    UploadFileService,
    ModalUploadService,
    HospitalService,
    DoctorService
  ],
  declarations: []
})
export class ServiceModule { }
