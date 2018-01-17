import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService, SharedService, SidebarService, UserService, LoginGuardGuard, UploadFileService } from './service.index';


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
    UploadFileService
  ],
  declarations: []
})
export class ServiceModule { }
