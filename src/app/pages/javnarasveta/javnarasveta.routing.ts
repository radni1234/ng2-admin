import { Routes, RouterModule }  from '@angular/router';
import {JavnaRasvetaComponent} from "./javnarasveta.component";

import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {TrafoComponent} from "./components/trafo/trafo.component";
import {UnosRacunaComponent} from "./components/unos_racuna/unos_racuna.component";
import {TrafoRedosledComponent} from "./components/trafo_redosled/trafo_redosled.component";
import {GrafikGodComponent} from "./components/grafici/grafik_god.component";
import {IzvRasGodPotComponent} from "./izvestaji/godisnja_potrosnja/godisnja_potrosnja.component";
import {IzvRasMesPotComponent} from "./izvestaji/mesecna_potrosnja/mesecna_potrosnja.component";
import {IzvRasPotTrafoComponent} from "./izvestaji/potrosnja_trafo/potrosnja_trafo.component";

const routes: Routes = [
  {
    path: '',
    component: JavnaRasvetaComponent,
    children: [
      { path: 'trafostanice', component: TrafoComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'unosracuna', component: UnosRacunaComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'traforedosled', component: TrafoRedosledComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'grafikgod', component: GrafikGodComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'izv_ras_god_pot', component: IzvRasGodPotComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'izv_ras_mes_pot', component: IzvRasMesPotComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'izv_ras_trafo_pot', component: IzvRasPotTrafoComponent, canActivate: [CanActivateAuthGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
