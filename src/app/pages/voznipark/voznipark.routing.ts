import { Routes, RouterModule }  from '@angular/router';
import {VozniParkComponent} from "./voznipark.component";

import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {VozilaComponent} from "./components/vozila.component";






const routes: Routes = [
  {
    path: '',
    component: VozniParkComponent,
    children: [
      { path: 'vozila', component: VozilaComponent, canActivate: [CanActivateAuthGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
