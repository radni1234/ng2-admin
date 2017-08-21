import { Routes, RouterModule }  from '@angular/router';
import {VozniParkComponent} from "./voznipark.component";

import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {JavnoPreduzeceComponent} from "./components/javno_preduzece.component";
import {VozilaComponent} from "./components/vozila.component";






const routes: Routes = [
  {
    path: '',
    component: VozniParkComponent,
    children: [
      { path: 'javnopreduzece', component: JavnoPreduzeceComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'vozila', component: VozilaComponent, canActivate: [CanActivateAuthGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
