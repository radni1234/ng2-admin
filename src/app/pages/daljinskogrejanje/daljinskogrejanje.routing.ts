import { Routes, RouterModule }  from '@angular/router';
import {DaljinskoGrejanjeComponent} from "./daljinskogrejanje.component";
import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {KotlarnicaComponent} from "./components/kotlarnica/kotlarnica.component";





const routes: Routes = [
  {
    path: '',
    component: DaljinskoGrejanjeComponent,
    children: [
      // { path: 'dist_top_energije', component: DistributeriToplotneEnergijeComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'kotlarnice', component: KotlarnicaComponent, canActivate: [CanActivateAuthGuard] },
      // { path: 'podstanice', component: PodstaniceComponent, canActivate: [CanActivateAuthGuard] }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
