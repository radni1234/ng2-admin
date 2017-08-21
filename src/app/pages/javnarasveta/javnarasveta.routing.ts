import { Routes, RouterModule }  from '@angular/router';
import {JavnaRasvetaComponent} from "./javnarasveta.component";

import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {TrafostaniceComponent} from "./components/trafostanice.component";






const routes: Routes = [
  {
    path: '',
    component: JavnaRasvetaComponent,
    children: [
      { path: 'trafostanice', component: TrafostaniceComponent, canActivate: [CanActivateAuthGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
