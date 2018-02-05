import { Routes, RouterModule }  from '@angular/router';
import {DaljinskoGrejanjeComponent} from "./daljinskogrejanje.component";
import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {KotlarnicaComponent} from "./components/kotlarnica/kotlarnica.component";
import {IzvKotGodPotComponent} from "./izvestaji/godisnja_potrosnja/godisnja_potrosnja.component";
import {IzvKotMesPotComponent} from "./izvestaji/mesecna_potrosnja/mesecna_potrosnja.component";
import {IzvKotPotKotComponent} from "./izvestaji/potrosnja_kotlarnica/potrosnja_kotlarnica.component";





const routes: Routes = [
  {
    path: '',
    component: DaljinskoGrejanjeComponent,
    children: [
      // { path: 'dist_top_energije', component: DistributeriToplotneEnergijeComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'kotlarnice', component: KotlarnicaComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'izv_kot_god_pot', component: IzvKotGodPotComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'izv_kot_mes_pot', component: IzvKotMesPotComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'izv_kot_pot_kot', component: IzvKotPotKotComponent, canActivate: [CanActivateAuthGuard] }
      // { path: 'podstanice', component: PodstaniceComponent, canActivate: [CanActivateAuthGuard] }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
