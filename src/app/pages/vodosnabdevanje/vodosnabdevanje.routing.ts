import { Routes, RouterModule }  from '@angular/router';
import {VodosnabdevanjeComponent} from "./vodosnabdevanje.component";

import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {VodozahvatComponent} from "./components/vodozahvat/vodozahvat.component";
import {IzvVodGodPotComponent} from "./izvestaji/godisnja_potrosnja/godisnja_potrosnja.component";
import {IzvVodMesPotComponent} from "./izvestaji/mesecna_potrosnja/mesecna_potrosnja.component";
import {IzvVodPotVodComponent} from "./izvestaji/potrosnja_vodozahvat/potrosnja_vodozahvat.component";




const routes: Routes = [
  {
    path: '',
    component: VodosnabdevanjeComponent,
    children: [
      { path: 'vodozahvati', component: VodozahvatComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'izv_vod_god_pot', component: IzvVodGodPotComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'izv_vod_mes_pot', component: IzvVodMesPotComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'izv_vod_pot_vod', component: IzvVodPotVodComponent, canActivate: [CanActivateAuthGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
