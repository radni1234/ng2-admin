import {Component, ViewEncapsulation} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {BaMenuService} from "../../services/baMenu/baMenu.service";
import {MENU} from "../../../app.menu";
import {Router, Routes} from "@angular/router";
import {LangChangeEvent} from "ng2-translate";

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
  noviMenu = _.cloneDeep(MENU);

  constructor(private _state:GlobalState, private translate: TranslateService, private service: BaMenuService, private router: Router) {

    console.log("BaPagesTop component: ");
    console.log(translate.getLangs());
    translate.addLangs(["en", "sr", "de", "it"]);
    translate.setDefaultLang('sr');

    let browserLang = translate.getBrowserLang();
//    translate.use(browserLang.match(/en|sr/) ? browserLang : 'sr');
    translate.use("sr");

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      //
      // this.noviMenu["0"].children["0"].data.menu.title = this.translate.instant('general.menu.administration');
      // this.noviMenu["0"].children["1"].data.menu.title = this.translate.instant('general.menu.publicbuildings');
      // this.noviMenu["0"].children["1"].children["1"].data.menu.title = this.translate.instant('general.menu.eff_app_meas');
      //
      // this.service.updateMenuByRoutes(<Routes>this.noviMenu);

    });


    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    JSON.parse(localStorage.getItem('currentUser')).username=='zeljko'? console.log('AAAAAAAAAAAAAAAAA'+JSON.parse(localStorage.getItem('currentUser')).username): console.log('BBBBBBBBBBBBBBB'+JSON.parse(localStorage.getItem('currentUser')).username);
  }

  onChange(event){
//     console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
//     console.log(this.translate.getLangs());
//     // this.translate.get('general.menu.administration').subscribe((res: string) => {
//     //   this.noviMenu["0"].children["0"].data.menu.title = res;
//     //   console.log(res);
//     // });
//     this.translate.get('general.menu.publicbuildings').subscribe((res: string) => {
//       this.noviMenu["0"].children["1"].data.menu.title = res;
//       console.log(res);
//     });
//
//     this.translate.get('general.menu.eff_app_meas').subscribe((res: string) => {
//       this.noviMenu["0"].children["1"].children["1"].data.menu.title = res;
//       console.log(res);
//     });
//
// //    this.router.navigateByUrl('/pages/dashboard');
// //          this.noviMenu["0"].children["0"].data.menu.title = this.translate.get('general.menu.admistration');
//     //jedinice mere
// //          this.noviMenu["0"].children["0"].children["1"].data.menu.hidden = provera;
//
//     console.log('Updating routes');
//     this.service.updateMenuByRoutes(<Routes>this.noviMenu);

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
