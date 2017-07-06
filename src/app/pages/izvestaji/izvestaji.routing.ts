import { Routes, RouterModule }  from '@angular/router';
import {IzvestajiComponent} from "./izvestaji.component";
import {IzvApsMesPot} from "./components/aps_mes_pot/aps_mes_pot.component";
import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {IzvUkPotEneObj} from "./components/uk_pot_ene_obj/uk_pot_ene_obj.component";
import {IzvApsGodPot} from "./components/aps_god_pot/aps_god_pot.component";
import {IzvSpecGodPot} from "./components/spec_god_pot/spec_god_pot.component";
import {IzvSpecMesPot} from "./components/spec_mes_pot/spec_mes_pot.component";
import {IzvUkPotObj} from "./components/uk_pot_obj/uk_pot_obj.component";
import {IzvSpecPotEneObj} from "./components/spec_pot_ene_obj/spec_pot_ene_obj.component";
import {IzvEfikObj} from "./components/efik_obj/efik_obj.component";
import {IzvPregObj} from "./components/preg_obj/preg_obj.component";




const routes: Routes = [
  {
    path: '',
    component: IzvestajiComponent,
    children: [
      { path: 'aps_mes_pot', component: IzvApsMesPot, canActivate: [CanActivateAuthGuard] },
      { path: 'aps_god_pot', component: IzvApsGodPot, canActivate: [CanActivateAuthGuard] },
      { path: 'spec_god_pot', component: IzvSpecGodPot, canActivate: [CanActivateAuthGuard] },
      { path: 'spec_mes_pot', component: IzvSpecMesPot, canActivate: [CanActivateAuthGuard] },
      { path: 'uk_pot_obj', component: IzvUkPotObj, canActivate: [CanActivateAuthGuard] },
      { path: 'uk_pot_ene_obj', component: IzvUkPotEneObj, canActivate: [CanActivateAuthGuard] },
      { path: 'efik_obj', component: IzvEfikObj, canActivate: [CanActivateAuthGuard] },
      { path: 'preg_obj', component: IzvPregObj, canActivate: [CanActivateAuthGuard] },
      { path: 'spec_pot_ene_obj', component: IzvSpecPotEneObj, canActivate: [CanActivateAuthGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
