import {Component, ViewEncapsulation} from '@angular/core';

import {GlobalState} from '../../../global.state';

@Component({
  selector: 'ba-page-top',
  styles: [require('./baPageTop.scss')],
  template: require('./baPageTop.html'),
  encapsulation: ViewEncapsulation.None
})
export class BaPageTop {

  public currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:GlobalState) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    JSON.parse(localStorage.getItem('currentUser')).username=='zeljko'? console.log('AAAAAAAAAAAAAAAAA'+JSON.parse(localStorage.getItem('currentUser')).username): console.log('BBBBBBBBBBBBBBB'+JSON.parse(localStorage.getItem('currentUser')).username);
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
