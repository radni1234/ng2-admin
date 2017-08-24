import { Routes, RouterModule }  from '@angular/router';
import {VodosnabdevanjeComponent} from "./vodosnabdevanje.component";

import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {JKPVodovodComponent} from "./components/jkp_vodovod.component";
import {VodozahvatiComponent} from "./components/vodozahvati.component";






const routes: Routes = [
  {
    path: '',
    component: VodosnabdevanjeComponent,
    children: [
      { path: 'jkppreduzece', component: JKPVodovodComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'vodozahvati', component: VodozahvatiComponent, canActivate: [CanActivateAuthGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
