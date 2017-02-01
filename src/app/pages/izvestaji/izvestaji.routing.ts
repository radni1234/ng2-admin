import { Routes, RouterModule }  from '@angular/router';
import {IzvestajiComponent} from "./izvestaji.component";
import {IzvApsMesPot} from "./components/aps_mes_pot/aps_mes_pot.component";




const routes: Routes = [
  {
    path: '',
    component: IzvestajiComponent,
    children: [
      { path: 'aps_mes_pot', component: IzvApsMesPot }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
