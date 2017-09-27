import { Routes, RouterModule }  from '@angular/router';
import {VozniParkComponent} from "./voznipark.component";

import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {VoziloComponent} from "./components/vozilo/vozilo.component";







const routes: Routes = [
  {
    path: '',
    component: VozniParkComponent,
    children: [
      { path: 'vozila', component: VoziloComponent, canActivate: [CanActivateAuthGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
