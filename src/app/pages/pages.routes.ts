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


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress Bars' } },
            { path: 'graphics', component: Graphics1Component, data: { title: 'Dona Graphics' } },
            { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
            { path: 'settings', component: AccountSettingsComponent, data: { title: 'Settings' } },

            // Managment
            { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
            { path: 'users', component: UsersComponent, data: { title: 'Users' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
