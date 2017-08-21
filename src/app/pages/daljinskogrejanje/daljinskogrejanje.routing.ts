import { Routes, RouterModule }  from '@angular/router';
import {DaljinskoGrejanjeComponent} from "./daljinskogrejanje.component";

import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {DistributeriToplotneEnergijeComponent} from "./components/dist_top_energije.component";
import {KotlarniceComponent} from "./components/kotlarnice.component";
import {PodstaniceComponent} from "./components/podstanice.component";





const routes: Routes = [
  {
    path: '',
    component: DaljinskoGrejanjeComponent,
    children: [
      { path: 'dist_top_energije', component: DistributeriToplotneEnergijeComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'kotlarnice', component: KotlarniceComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'podstanice', component: PodstaniceComponent, canActivate: [CanActivateAuthGuard] }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
