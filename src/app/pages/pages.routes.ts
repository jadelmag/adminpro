import { Routes, RouterModule } from '@angular/router';

import { LoginGuardGuard } from '../services/service.index';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../services/service.index';
import { VerifyTokenGuard } from '../services/service.index';


const pagesRoutes: Routes = [

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ VerifyTokenGuard ],
        data: { title: 'Dashboard' }
    },
    {
        path: 'progress',
        component: ProgressComponent,
        canActivate: [ VerifyTokenGuard ],
        data: { title: 'Progress Bars' }
    },
    {
        path: 'graphics',
        component: Graphics1Component,
        canActivate: [ VerifyTokenGuard ],
        data: { title: 'Dona Graphics' }
    },
    {
        path: 'promises',
        component: PromisesComponent,
        canActivate: [ VerifyTokenGuard ],
        data: { title: 'Promises' }
    },
    {
        path: 'rxjs',
        component: RxjsComponent,
        canActivate: [ VerifyTokenGuard ],
        data: { title: 'RxJs' }
    },
    {
        path: 'settings',
        component: AccountSettingsComponent,
        canActivate: [ VerifyTokenGuard ],
        data: { title: 'Settings' }
    },

     // Managment
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [ VerifyTokenGuard ],
        data: { title: 'Profile' }
    },
    {
        path: 'search/:param',
        component: SearchComponent,
        canActivate: [ VerifyTokenGuard ],
        data: { title: 'Search' }
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [ VerifyTokenGuard, AdminGuard ],
        data: { title: 'Users' }
    },
    {
        path: 'hospitals',
        component: HospitalsComponent,
        canActivate: [ VerifyTokenGuard ],
        data: { title: 'Hospitals' }
    },
    {
        path: 'doctors',
        component: DoctorsComponent,
        canActivate: [ VerifyTokenGuard ],
        data: { title: 'Doctors' }
    },
    {
        path: 'doctor/:id',
        component: DoctorComponent,
        canActivate: [ VerifyTokenGuard ],
        data: { title: 'Update Doctor' }
    },
    {   path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
