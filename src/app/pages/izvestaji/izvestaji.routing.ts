import { Routes, RouterModule }  from '@angular/router';
import {IzvestajiComponent} from "./izvestaji.component";
import {IzvApsMesPot} from "./components/aps_mes_pot/aps_mes_pot.component";
import {CanActivateAuthGuard} from "../services/can-activate.authguard";




const routes: Routes = [
  {
    path: '',
    component: IzvestajiComponent,
    children: [
      { path: 'aps_mes_pot', component: IzvApsMesPot, canActivate: [CanActivateAuthGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
