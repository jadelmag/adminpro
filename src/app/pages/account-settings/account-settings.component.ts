import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _settings: SettingsService) { }

  ngOnInit() {
    this.loadCheck();
  }

  changeTheme( themeSelected: string, link: any) {
    this.setCheck(link);
    this._settings.loadTheme(themeSelected);
  }

  setCheck( link: any ) {
    const selectors: any = document.getElementsByClassName('selector');
    for ( const ref of selectors) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  loadCheck() {
    const selectors: any = document.getElementsByClassName('selector');

    const theme = this._settings.settings.theme;

    for ( const ref of selectors) {
      if ( ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
