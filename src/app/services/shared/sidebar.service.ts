import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      title: 'Main',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard'},
        { title: 'Profile', url: '/profile'},
        { title: 'Progress', url: '/progress'},
        { title: 'Promises', url: '/promises'},
        { title: 'Rxjs', url: '/rxjs'},
        { title: 'Graphics', url: '/graphics'}
      ]
    }
  ];

  constructor() { }

}
