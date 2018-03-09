import { Routes, RouterModule }  from '@angular/router';
import {VozniParkComponent} from "./voznipark.component";

import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {VoziloComponent} from "./components/vozilo/vozilo.component";
import {IzvUkPotEneVoz} from "./izvestaji/uk_pot_ene_voz/uk_pot_ene_voz.component";
import {IzvPregledVoz} from "./izvestaji/pregled_voz/pregled_voz.component";



const routes: Routes = [
  {
    path: '',
    component: VozniParkComponent,
    children: [
      { path: 'vozila', component: VoziloComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'izv_voz_pregled', component: IzvPregledVoz, canActivate: [CanActivateAuthGuard] },
      { path: 'izv_voz_uk_pot_ene', component: IzvUkPotEneVoz, canActivate: [CanActivateAuthGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
