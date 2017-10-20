import { Routes, RouterModule }  from '@angular/router';
import {VodosnabdevanjeComponent} from "./vodosnabdevanje.component";

import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {VodozahvatComponent} from "./components/vodozahvat/vodozahvat.component";




const routes: Routes = [
  {
    path: '',
    component: VodosnabdevanjeComponent,
    children: [
      { path: 'vodozahvati', component: VodozahvatComponent, canActivate: [CanActivateAuthGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
