import { Routes, RouterModule }  from '@angular/router';
import { JavniObjektiComponent } from './javniobjekti.component.ts';
import {ObjektiComponent} from "./components/objekti/objekti.component";
import {ObjekatComponent} from "./components/objekti/objekat.component";
import {ObjekatTabComponent} from "./components/objekti/objekat_tabovi.component";
import {RacunComponent} from "./components/racuni/racun";
import {RacunComponent2} from "./components/racuni/racun.component";
import {Main} from "./components/grafici/grafici.component";
import {Cusum} from "./components/grafici/cusum.component";
import {Rasturanje} from "./components/grafici/rasturanje.component";
import {EnergyMix} from "./components/grafici/energymix.component";
import {EnergyMixPie} from "./components/grafici/energymixpie.component";
import {SelectionTool} from "../shared/components/selection_tool/selection_tool.component";


const routes: Routes = [
  {
    path: '',
    component: JavniObjektiComponent,
    children: [
      { path: 'objekti', component: ObjektiComponent },
      { path: 'objekat', component: ObjekatComponent },
      { path: 'objekat_tab', component: ObjekatTabComponent },
      { path: 'racuni', component: RacunComponent },
      { path: 'racuni2', component: RacunComponent2 },
      { path: 'grafici', component: Main },
      { path: 'cusum', component: Cusum },
      { path: 'rasturanje', component: Rasturanje },
      { path: 'energymix', component: EnergyMix },
      { path: 'energymixpie', component: EnergyMixPie },
      { path: 'selectiontool', component: SelectionTool },

    ]
  }
];

export const routing = RouterModule.forChild(routes);
