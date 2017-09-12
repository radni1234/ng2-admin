import {Component, ViewEncapsulation} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {TranslateService} from 'ng2-translate/ng2-translate';

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

  constructor(private _state:GlobalState, private translate: TranslateService) {

    console.log("BaPagesTop component: ");
    console.log(translate.getLangs());
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang('en');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');


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
  onLanguageSelected (event){
    console.log("uhvacen Jezik");
    console.log(event);
  }
}
