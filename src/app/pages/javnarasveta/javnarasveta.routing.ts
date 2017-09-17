import { Routes, RouterModule }  from '@angular/router';
import {JavnaRasvetaComponent} from "./javnarasveta.component";

import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {TrafoComponent} from "./components/trafo/trafo.component";

const routes: Routes = [
  {
    path: '',
    component: JavnaRasvetaComponent,
    children: [
      { path: 'trafostanice', component: TrafoComponent, canActivate: [CanActivateAuthGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
