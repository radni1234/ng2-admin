import { Routes, RouterModule }  from '@angular/router';
import { JavniObjektiComponent } from './javniobjekti.component.ts';
import {ObjektiComponent} from "./components/objekti/objekti.component";
import {ObjekatComponent} from "./components/objekti/objekat.component";
import {ObjekatTabComponent} from "./components/objekti/objekat_tabovi.component";
import {RacunComponent} from "./components/racuni/racun";
import {RacunComponent2} from "./components/racuni/racun.component";


const routes: Routes = [
  {
    path: '',
    component: JavniObjektiComponent,
    children: [
      { path: 'objekti', component: ObjektiComponent },
      { path: 'objekat', component: ObjekatComponent },
      { path: 'objekat_tab', component: ObjekatTabComponent },
      { path: 'racuni', component: RacunComponent },
      { path: 'racuni2', component: RacunComponent2 }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
