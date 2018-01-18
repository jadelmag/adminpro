import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { ProgressComponent } from './progress/progress.component';
import { IncrementComponent } from '../components/increment/increment.component';
import { GraphicDonaComponent } from '../components/graphic-dona/graphic-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        Graphics1Component,
        ProgressComponent,
        IncrementComponent,
        GraphicDonaComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        ModalUploadComponent
    ],
    exports: [
        DashboardComponent,
        Graphics1Component,
        ProgressComponent,
        IncrementComponent,
        GraphicDonaComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})
export class PagesModule {}
